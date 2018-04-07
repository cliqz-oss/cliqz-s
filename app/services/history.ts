// tslint:disable-next-line
// DB Schema copied from https://github.com/mozilla-mobile/firefox-ios/blob/21bb6e3166c5af9724e53d39a3e5718daa413644/Storage/SQL/BrowserSchema.swift
import { parseURL } from '../cliqz';
import DB from './DB';

let db: DB;

const TABLE_VISITS = 'visits';
const TABLE_HISTORY = 'history';
const TABLE_DOMAINS = 'domains';

const createTableDomains = `
CREATE TABLE IF NOT EXISTS ${TABLE_DOMAINS} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
domain TEXT NOT NULL UNIQUE,
showOnTopSites TINYINT NOT NULL DEFAULT 1
)`;

const createTableHistory = `
CREATE TABLE IF NOT EXISTS ${TABLE_HISTORY} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
guid TEXT NOT NULL UNIQUE,
url TEXT UNIQUE,
title TEXT NOT NULL,
server_modified INTEGER,
local_modified INTEGER,
is_deleted TINYINT NOT NULL,
should_upload TINYINT NOT NULL,
domain_id INTEGER REFERENCES ${TABLE_DOMAINS}(id) ON DELETE CASCADE,
CONSTRAINT urlOrDeleted CHECK (url IS NOT NULL OR is_deleted = 1)
)`;

const createTableVisits = `
CREATE TABLE IF NOT EXISTS ${TABLE_VISITS} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
siteID INTEGER NOT NULL REFERENCES ${TABLE_HISTORY}(id) ON DELETE CASCADE,
date REAL NOT NULL,
type INTEGER NOT NULL,
is_local TINYINT NOT NULL,
UNIQUE (siteID, date, type))
`;

const insertHistory = `
INSERT INTO ${TABLE_HISTORY}
(guid, url, title, local_modified, is_deleted, should_upload, domain_id)
SELECT ?, ?, ?, ?, 0, 1, id FROM ${TABLE_DOMAINS} WHERE domain = ?
`;

const insertVisit = `
INSERT OR IGNORE INTO ${TABLE_VISITS} (siteID, date, type, is_local) VALUES (
(SELECT id FROM ${TABLE_HISTORY} WHERE url = ?), ?, ?, 1)
`;

const insertDomain = `INSERT OR IGNORE INTO ${TABLE_DOMAINS} (domain) VALUES (?)`;

export async function fetchDomains() {
  const history = await db.query(`
    SELECT MAX(${TABLE_VISITS}.date) as date, ${TABLE_HISTORY}.url, ${TABLE_DOMAINS}.domain
    FROM ${TABLE_VISITS}
    INNER JOIN ${TABLE_HISTORY} ON ${TABLE_HISTORY}.id = ${TABLE_VISITS}.siteID
    INNER JOIN ${TABLE_DOMAINS} ON ${TABLE_DOMAINS}.id = ${TABLE_HISTORY}.domain_id
    GROUP BY ${TABLE_DOMAINS}.domain
    ORDER BY date DESC
    LIMIT 100
  `);

  return history.map(visit => ({
    domain: visit.domain,
    baseUrl: visit.url,
    lastVisisted: Number(visit.date),
  }));
}

export async function fetchMessages(domain: string) {
  const history = await db.query(
    `
      SELECT
        ${TABLE_DOMAINS}.domain,
        ${TABLE_HISTORY}.url,
        ${TABLE_HISTORY}.title,
        ${TABLE_VISITS}.date
      FROM ${TABLE_DOMAINS}
      INNER JOIN ${TABLE_HISTORY} ON ${TABLE_DOMAINS}.id = ${TABLE_HISTORY}.domain_id
      INNER JOIN ${TABLE_VISITS} ON ${TABLE_HISTORY}.id = ${TABLE_VISITS}.siteID
      WHERE ${TABLE_DOMAINS}.domain = ?
      ORDER BY ${TABLE_VISITS}.date DESC
      LIMIT 100;
    `,
    [domain],
  );

  return history.map(visit => ({
    domain: visit.domain,
    url: visit.url,
    title: visit.title,
    visitedAt: visit.date,
  }));
}

const updateSite = (url: string, title: string, timestamp: number) => {
  const host = parseURL(url).hostname;
  const update = `
    UPDATE ${TABLE_HISTORY} SET title = ?, local_modified = ?, should_upload = 1, domain_id =
      (SELECT id FROM ${TABLE_DOMAINS} where domain = ?) WHERE url = ?`;
  return db.command(update, [title, timestamp, host, url]);
};

const generateGUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('');
};

const insertSite = async (url: string, title: string, timestamp: number) => {
  const host = parseURL(url).hostname;

  try {
    await db.command(insertDomain, [host]);
  } catch (e) {
    // domain may be created already
  }

  const insertArgs = [generateGUID(), url, title, timestamp, host];
  const historyId = await db.command(insertHistory, insertArgs);
  return historyId;
};

const addLocalVisitForExistingSite = (url: string, timestamp: number) => {
  const insertArgs = [url, timestamp, 0];
  return db.command(insertVisit, insertArgs);
};

export async function recordVisit(url: string, title: string, timestamp: number) {
  // Not sure if that's best place to have such logic
  if (url === 'about:blank') {
    return Promise.resolve();
  }

  try {
    const response = await updateSite(url, title, timestamp);
    if (response.rowsAffected === 0) {
      throw new Error('Not updated');
    }
  } catch (e) {
    await insertSite(url, title, timestamp);
  }

  return addLocalVisitForExistingSite(url, timestamp);
}

export function initialize() {
  db = new DB();
  return db.execTransaction((txn) => {
    // txn.executeSql('DROP TABLE visits; DROP TABLE history; DROP TABLE domains;', []);
    txn.executeSql(createTableDomains, []);
    txn.executeSql(createTableHistory, []);
    txn.executeSql(createTableVisits, []);
  });
}

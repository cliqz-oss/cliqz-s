// DB Schema copied from https://github.com/mozilla-mobile/firefox-ios/blob/21bb6e3166c5af9724e53d39a3e5718daa413644/Storage/SQL/BrowserSchema.swift
import { parseURL } from '../cliqz';
import DB from './db';

let db;

const TableVisits = 'visits';
const TableHistory = 'history';
const TableDomains = 'domains';

const createTableDomains = `
CREATE TABLE IF NOT EXISTS ${TableDomains} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
domain TEXT NOT NULL UNIQUE,
showOnTopSites TINYINT NOT NULL DEFAULT 1
)`;

const createTableHistory = `
CREATE TABLE IF NOT EXISTS ${TableHistory} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
guid TEXT NOT NULL UNIQUE,
url TEXT UNIQUE,
title TEXT NOT NULL,
server_modified INTEGER,
local_modified INTEGER,
is_deleted TINYINT NOT NULL,
should_upload TINYINT NOT NULL,
domain_id INTEGER REFERENCES ${TableDomains}(id) ON DELETE CASCADE,
CONSTRAINT urlOrDeleted CHECK (url IS NOT NULL OR is_deleted = 1)
)`;

const createTableVisits = `
CREATE TABLE IF NOT EXISTS ${TableVisits} (
id INTEGER PRIMARY KEY AUTOINCREMENT,
siteID INTEGER NOT NULL REFERENCES ${TableHistory}(id) ON DELETE CASCADE,
date REAL NOT NULL,
type INTEGER NOT NULL,
is_local TINYINT NOT NULL,
UNIQUE (siteID, date, type))
`;

const insertHistory = `
INSERT INTO ${TableHistory}
(guid, url, title, local_modified, is_deleted, should_upload, domain_id)
SELECT ?, ?, ?, ?, 0, 1, id FROM ${TableDomains} WHERE domain = ?
`;

const insertVisit = `
INSERT OR IGNORE INTO ${TableVisits} (siteID, date, type, is_local) VALUES (
(SELECT id FROM ${TableHistory} WHERE url = ?), ?, ?, 1)
`;

const insertDomain = `INSERT OR IGNORE INTO ${TableDomains} (domain) VALUES (?)`;

export async function fetchDomains() {
  const history = await db.query(`
    SELECT MAX(${TableVisits}.date) as date, ${TableHistory}.url, ${TableDomains}.domain
    FROM ${TableVisits}
    INNER JOIN ${TableHistory} ON ${TableHistory}.id = ${TableVisits}.siteID
    INNER JOIN ${TableDomains} ON ${TableDomains}.id = ${TableHistory}.domain_id
    GROUP BY ${TableDomains}.domain
    ORDER BY date DESC
    LIMIT 100
  `);

  return history.map(visit => ({
    domain: visit.domain,
    baseUrl: visit.url,
    lastVisisted: visit.date,
  }));
}

const updateSite = (url, title) => {
  const host = parseURL(url).hostname;
  const update = `
    UPDATE ${TableHistory} SET title = ?, local_modified = ?, should_upload = 1, domain_id =
      (SELECT id FROM ${TableDomains} where domain = ?) WHERE url = ?`;
  return db.command(update, [title, Date.now() * 1000, host, url]);
};

const generateGUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('');
};

const insertSite = async (url, title) => {
  const host = parseURL(url).hostname;

  try {
    await db.command(insertDomain, [host]);
  } catch (e) {
    // domain may be created already
  }

  const insertArgs = [generateGUID(), url, title, Date.now() * 1000, host];
  const historyId = await db.command(insertHistory, insertArgs);
  return historyId;
};

const addLocalVisitForExistingSite = (url) => {
  const realDate = Date.now() * 1000;
  const insertArgs = [url, realDate, 0];
  return db.command(insertVisit, insertArgs);
};

export async function recordVisit(url, title) {
  if (url === 'about:blank') {
    return Promise.resolve();
  }

  try {
    const response = await updateSite(url, title);
    if (response.rowsAffected === 0) {
      throw new Error('Not updated');
    }
  } catch (e) {
    await insertSite(url, title);
  }

  return addLocalVisitForExistingSite(url);
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

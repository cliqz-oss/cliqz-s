const detox = require('detox');
const config = require('../package.json').detox;

// Set the default test timeout of 240s
jest.setTimeout(120000 * 2);

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});

const nock = require('nock');
// Requiring our app implementation
const regex_checker = require('../lib');
const { Probot } = require('probot');
// Requiring our fixtures
const checkSuitePayload = require('./fixtures/check_suite.requested');
const checkRunSuccess = require('./fixtures/check_run.created');
const checkRunSuccess = require('./fixtures/check_run.created');

nock.disableNetConnect();

describe('My Probot app', () => {
  let probot;

  beforeEach(() => {
    probot = new Probot({});
    // Load our app into probot
    const app = probot.load(regex_checker);

    // just return a test token
    app.app = () => 'test';
  });

  test('creates a passing check', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' });

    nock('https://api.github.com')
      .post('/repos/hiimbex/testing-things/check-runs', (body) => {
        body.completed_at = '2018-10-05T17:35:53.683Z';
        expect(body).toMatchObject(checkRunSuccess);
        return true;
      })
      .reply(200);

    // Receive a webhook event
    await probot.receive({ name: 'check_suite', payload: checkSuitePayload });
  });
});

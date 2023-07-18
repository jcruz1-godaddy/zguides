const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const addJwtTokenHandler = require('./handlers/addJwtTokenHandler');
const appSettingsHandler = require('./handlers/appSettingsHandler');
const {
    postPromptHandler,
} = require('./handlers/proxyHandlers');

router.post('/api/prompts', addJwtTokenHandler, postPromptHandler);

router.get('/api/getEntitlementsOnly', addJwtTokenHandler, getEntitlementsOnlyHandler);
router.get('/api/customers/:customerId/entitlements/:entitlementId', addJwtTokenHandler, getEntitlementHandler);
router.get('/api/getCustomerIdByEntitlementId', addJwtTokenHandler, getCustomerHandler);
router.get('/api/getEntitlementJournalEntries', getSortedJournalEntriesHandler);

module.exports = router;
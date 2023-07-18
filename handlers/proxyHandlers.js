const { v4: uuidv4 } = require('uuid');
const NodeCache = require('node-cache');

// const commonHeaders = {
//     'Content-Type': 'application/json',
//     'X-Request-Id': uuidv4(),
//     'X-App-Key': 'fulfillment-ui'
// };

const postPromptHandler = async (req, res) => {
    const caasHost = "https://caas.api.test-godaddy.com";
    const response = await fetch(
        `${caasHost}/v1/prompts`,
        {
            method: 'POST',
            headers: {
                ...commonHeaders,
                Authorization: 'sso-jwt ' + res.locals.jwtToken
            }
            body: req.body.
        });
    debugger;
    return res.status(response.status).json(await response.json());
};

const getEntitlementHandler = async (req, res) => {
    const entitlementsHost = appConfig.hostsConfig.ENTITLEMENTS.albUrl;
    const response = await fetch(
        `${entitlementsHost}/v2/customers/${req.params.customerId}/entitlements/${req.params.entitlementId}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'sso-jwt ' + res.locals.jwtToken
            }
        });

    return res.status(response.status).json(await response.json());
};

const getCustomerCache = new NodeCache({ stdTTL: 60 });
const getCustomerHandler = async (req, res) => {
    const entitlementId = req.query.entitlementId;
    if (getCustomerCache.has(entitlementId)) {
        return res.status(200).json(getCustomerCache.get(entitlementId));
    }

    const queriesHost = appConfig.hostsConfig.QUERIES.albUrl;
    const response = await fetch(
        `${queriesHost}/v2/queries-execution/getCustomerIdByEntitlementId?entitlementId=${req.query.entitlementId}`,
        {
            method: 'GET',
            headers: {
                ...commonHeaders,
                Authorization: 'sso-jwt ' + res.locals.jwtToken
            }
        });
    const responseJson = await response.json();
    if (response.ok) {
        getCustomerCache.set(entitlementId, responseJson);
    }
    return res.status(response.status).json(responseJson);
};

module.exports = {
    postPromptHandler,
};

const packageJSON = require('./package.json');
const uxcore = packageJSON.dependencies['@ux/uxcore2'].split('.')[0].replace(/[~^]/, '');
if (!uxcore) throw new Error('Missing @ux/uxcore2 version for gasket params');

const defaultHTTPPort = 3000;
const defaultHTTPSPort = 3000;

module.exports = {
    http: defaultHTTPPort,
    https: defaultHTTPSPort,
    appName: 'App',
    presentationCentral: {
      params: {
        app: 'App',
        header: 'internal-header',
        uxcore,
        tealium: false
      }
    },
    nextConfig: {
        reactStrictMode: true
    },
    intl: {
        localesDir: './locales',
        serveStatic: true
      }
    };
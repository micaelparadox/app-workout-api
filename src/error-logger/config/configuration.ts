export default {
  dsn: process.env.SENTRY_DSN,
  debug: process.env.SENTRY_ENV !== 'production' ? true : false,
  environment: process.env.SENTRY_ENV,
  release: process.env.SENTRY_RELEASE,
};

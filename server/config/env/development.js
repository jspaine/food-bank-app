module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/fb-dev',
  // to seed settings collection for dev
  sessionSecret: 'foodbank-app',
}

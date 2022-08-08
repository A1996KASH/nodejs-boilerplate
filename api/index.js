// Import route files
const user = require('./users/')

exports.routes = async (app, express) => {
  // All other routes should redirect to the index.html
  app.use('/user', express.json(), user)
}

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
  // module.exports = require('./dev');
} else {
  module.exports = require('./dev');
}

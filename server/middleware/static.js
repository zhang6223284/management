const static = require('koa-static');
const path = require('path');

const staticPath = '../../build';

module.exports = static(
  path.join( __dirname, staticPath)
)
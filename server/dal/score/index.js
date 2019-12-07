const modifyStu = require('./modify');
const queryStu = require('./query');
const addStu = require('./add');
const deleteStu = require('./delete');

module.exports = {
  query: queryStu,
  add: addStu,
  modify: modifyStu,
  delete: deleteStu,
};

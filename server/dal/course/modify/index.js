const connection = require('../../index');

const modifyStu = async (info) => {
  const { c_id, c_name } = info;
  const data = await new Promise((resolve, reject) => {
    connection.query('UPDATE jwb.curriculum SET c_name = ? where c_id = ?', [c_name, c_id], (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = modifyStu;
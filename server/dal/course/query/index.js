const connection = require('../../index');

const queryStu = async (id) => {
  const data = await new Promise((resolve, reject) => {
      connection.query('SELECT * from jwb.curriculum', (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = queryStu;
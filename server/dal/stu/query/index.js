const connection = require('../../index');

const queryStu = async (id) => {
  const queryVal = !id ? '' :  `where id = ${id}`;
  const data = await new Promise((resolve, reject) => {
      connection.query(`SELECT * from jwb.student ${queryVal}`, (err, results) => {
        if(err) reject(new Error());
        resolve(results);
      });

    });
    return data;
};

module.exports = queryStu;
const connection = require('../../index');

const deleteStu = async (id) => {
  const queryVal = !id ? '' :  `where c_id = ${id}`;
  const data = await new Promise((resolve, reject) => {
      connection.query(`DELETE from jwb.curriculum ${queryVal}`, (err, results) => {
        if(err) reject(new Error());
        resolve(results);
      });

    });
    return data;
};

module.exports = deleteStu;
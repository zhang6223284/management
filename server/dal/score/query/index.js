const connection = require('../../index');

const queryStu = async (id) => {
  const data = await new Promise((resolve, reject) => {
      connection.query(`select * from study s, curriculum c where s.c_id = c.c_id AND stu_no = ${id}`, (err, results) => {
        if(err) reject(new Error());
        resolve(results);
      });

    });
    return data;
};

module.exports = queryStu;
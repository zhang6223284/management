const connection = require('../../index');

const addStu = async (info) => {
  const { c_id, c_name } = info;
  const data = await new Promise((resolve, reject) => {
      connection.query(`INSERT INTO curriculum(c_id,c_name) VALUES(${c_id},'${c_name}')`, (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = addStu;
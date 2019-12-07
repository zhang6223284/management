const connection = require('../../index');

const addStu = async (info) => {
  const { stu_no, c_id, fraction } = info;
  const data = await new Promise((resolve, reject) => {
      connection.query(`INSERT INTO study(stu_no,c_id,fraction) VALUES(${stu_no},${c_id},'${fraction}')`, (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = addStu;
const connection = require('../../index');

const modifyStu = async (info) => {
  const { stu_no, c_id, fraction } = info;
  const data = await new Promise((resolve, reject) => {
    connection.query('UPDATE jwb.study SET fraction = ? where stu_no = ? AND c_id = ?', [fraction, stu_no, c_id], (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = modifyStu;

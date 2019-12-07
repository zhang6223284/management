const connection = require('../../index');

const modifyStu = async (info) => {
  const { stu_class, stu_no, stu_name, stu_gender } = info;
  const data = await new Promise((resolve, reject) => {
    connection.query('UPDATE jwb.student SET stu_class = ?,stu_name = ?,stu_gender = ? where stu_no = ?', [stu_class, stu_name, stu_gender, stu_no], (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = modifyStu;
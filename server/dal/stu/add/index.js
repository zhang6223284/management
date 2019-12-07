const connection = require('../../index');

const addStu = async (info) => {
  const { stu_class, stu_no, stu_name, stu_gender } = info;
  const data = await new Promise((resolve, reject) => {
      connection.query(`INSERT INTO student(stu_class,stu_no,stu_name,stu_gender) VALUES('${stu_class}',${stu_no},'${stu_name}','${stu_gender}')`, (err, results) => {
        if(err) console.log(err);
        resolve(results);
      });

    });
    return data;
};

module.exports = addStu;
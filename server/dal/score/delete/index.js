const connection = require('../../index');

const deleteStu = async (stu_no, c_id) => {
  const data = await new Promise((resolve, reject) => {
      connection.query('DELETE from jwb.study where stu_no = ? AND c_id = ?',[stu_no, c_id], (err, results) => {
        if(err) reject(new Error());
        resolve(results);
      });

    });
    return data;
};

module.exports = deleteStu;
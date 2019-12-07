const stuDAL = require('../../dal/score/index'); 

const query = async (ctx) => {
  const { stu_no } = ctx.query;
  const results = await stuDAL.query(stu_no);
  ctx.status = 200;
  ctx.set('content-type', 'application/json');
  ctx.body = results;
};

module.exports = query;
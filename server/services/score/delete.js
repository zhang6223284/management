const stuDAL = require('../../dal/score/index'); 

const query = async (ctx) => {
  const { stu_no, c_id } = ctx.request.body;
  console.log(ctx.request.body);
  const results = await stuDAL.delete(stu_no, c_id);
  ctx.status = 200;
  ctx.set('content-type', 'application/json');
  ctx.body = results;
};

module.exports = query;
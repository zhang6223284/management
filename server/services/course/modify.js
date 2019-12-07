const stuDAL = require('../../dal/course/index'); 

const modify = async (ctx) => {
  const stuInfo = ctx.request.body;
  console.log(ctx.request.body);
  const results = await stuDAL.modify(stuInfo);
  ctx.status = 200;
  ctx.set('content-type', 'application/json');
  ctx.body = results;
};

module.exports = modify;
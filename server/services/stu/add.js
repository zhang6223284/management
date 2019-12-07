const stuDAL = require('../../dal/stu/index'); 

const add = async (ctx) => {
  const stuInfo = ctx.request.body;
  console.log(ctx.request.body);
  const results = await stuDAL.add(stuInfo);
  ctx.status = 200;
  ctx.set('content-type', 'application/json');
  ctx.body = results;
};

module.exports = add;
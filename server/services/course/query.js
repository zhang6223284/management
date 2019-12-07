const stuDAL = require('../../dal/course/index'); 

const query = async (ctx) => {
  const { id } = ctx.query;
  const results = await stuDAL.query(id);
  ctx.status = 200;
  ctx.set('content-type', 'application/json');
  ctx.body = results;
};

module.exports = query;
const Router = require('koa-router');
const handler = require('../services');

const router = new Router();

router.post('/login', async (ctx, next) => {
  console.log('login');
});

router.get('/search/stu', async (ctx, next) => {
  console.log('search/stu');
  await handler.stu.query(ctx, next);
  await next();
});


router.get('/search/score', async (ctx, next) => {
  console.log('search/score');
  await handler.score.query(ctx, next);
  await next();
});

router.get('/search/course', async (ctx, next) => {
  console.log('search/course');
  await handler.course.query(ctx, next);
  await next();
});

router.post('/add/stu', async (ctx, next) => {
  console.log('/add/stu');
  await handler.stu.add(ctx, next);
  await next();
});

router.post('/add/score', async(ctx, next) => {
  console.log('/add/score');
  await handler.score.add(ctx, next);
  await next();
});

router.post('/add/course', async(ctx, next) => {
  console.log('/add/course');
  await handler.course.add(ctx, next);
  await next();
});

router.post('/modify/stu', async(ctx, next) => {
  console.log('/modify/stu');
  await handler.stu.modify(ctx, next);
  await next();
});

router.post('/modify/score', async(ctx, next) => {
  console.log('/modify/score');
  await handler.score.modify(ctx, next);
  await next();
});

router.post('/modify/course', async(ctx, next) => {
  console.log('/modify/course');
  await handler.course.modify(ctx, next);
  await next();
});

router.post('/delete/stu', async(ctx, next) => {
  console.log('/delete/stu');
  await handler.stu.deleteStu(ctx, next);
  await next();
});

router.post('/delete/score', async(ctx, next) => {
  console.log('/modify/score');
  await handler.score.deleteStu(ctx, next);
  await next();
});

router.post('/delete/course', async(ctx, next) => {
  console.log('/modify/course');
  await handler.course.deleteStu(ctx, next);
  await next();
});

router.all(/.*/, (ctx, next) => {
  ctx.status = 200;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
});

module.exports = router;

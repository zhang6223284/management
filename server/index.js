const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const staticMiddleware = require('./middleware/static');
const router = require('./middleware/router');
const connection = require('./dal/index');

const app = new Koa();

app.use(bodyParser());

app.use(async(ctx, next)=> {
  await next();
});

app.use(staticMiddleware);

app.use(router.routes());

// app.use(router.allowedMethods());

app.use(async(ctx, next)=> {
  await next();
});

console.log('node 服务重启了');
app.listen(3000);
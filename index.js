const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

app.use((ctx) => {
    ctx.status = 200;
    ctx.set('content-type', 'text/html');
    ctx.type = 'text/html';
    console.log(ctx.path);
    if(/js/.test(ctx.path)) {
      ctx.type = 'text/javascript';
      ctx.body = fs.readFileSync(`${__dirname  }/build${  ctx.path}`);
      return;
    } else if(/css/.test(ctx.path)){
      ctx.type = 'text/css';
      ctx.body = fs.readFileSync(`${__dirname  }/build${  ctx.path}`);
      return;
    }
    ctx.body = fs.readFileSync('./build/index.html');
});

app.listen(3000);
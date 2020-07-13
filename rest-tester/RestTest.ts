import koa from 'koa';
import yargs from 'yargs';
import bodyParser from 'koa-bodyparser';

export class RestServer {
  private instance: koa<koa.DefaultState, koa.DefaultContext>;
  constructor() {
    this.instance = new koa();
    this.instance.use(bodyParser());
    this.instance.use(this.logger);
    this.instance.use(this.success);
  }

  private async logger(context: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext>, next: koa.Next) {
    console.log("Received:");
    console.info(`Content: ${JSON.stringify(context.request.body)}`);
    console.info(`Headers: ${JSON.stringify(context.req.headers)}`);
    next();
  }

  private async success(context: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext>, next: koa.Next) {
    context.res.statusCode = 200;
    next();
  }

  start(port?: number) {
    const thePort = port || 3000;
    this.instance.listen(thePort);
    console.log(`🚀 Server listening on ${thePort}`);
  }
}

const argv = yargs.command("start", "POSTs to the desired URL", {
  port: {
    description: "The port to listen to",
    alias: "p",
    type: "string"
  }
}).help().alias('help', 'h').argv;

if (argv._.includes("start")) {
  const server = new RestServer();
  const port = Number(argv.port as string);
  server.start(port);
}

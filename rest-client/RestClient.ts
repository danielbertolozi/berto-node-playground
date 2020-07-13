import axios, { AxiosInstance } from "axios";
import yargs from "yargs";

export class RestClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000',
      responseType: 'json',
      headers: {
        "bertoHeader": "Berto"
      }
    });
  }
  public post(target: string, payload: string) {
    this.instance.post(target || '/', payload, {
      headers: {
        "willItStack": "hopeSo"
      }
    });
  }
}


const argv = yargs.command("post", "POSTs to the desired URL", {
  target: {
    description: "The URL",
    alias: "t",
    type: "string"
  },
  payload: {
    description: "JSON-encoded payload",
    alias: "p",
    type: "string",
  }
}).help().alias('help', 'h').argv;

if (argv._.includes("post")) {
  if (argv.payload) {
    console.log(`Posting ${argv.payload} to ${argv.target || 'localhost:3000'}`);
    const client = new RestClient();
    client.post(argv.target as string, argv.payload as string);
  } else {
    console.error("You should provide arguments. See -h for more info");
  }
}

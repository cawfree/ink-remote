import express from "express";
import expressWs from "express-ws";
import * as handlebars from "handlebars";
import fs from "fs";
import ip from "ip";

export const serve = ({port}: {
  readonly port: number;
}) => {
  const {app} = expressWs(
    express()
      .get(
        '/',
        (e, res) => res
          .status(200)
          .send(
            handlebars.compile(fs.readFileSync('public/index.html', 'utf-8'))({
              address: ip.address(),
              port,
            }),
          ),
      )
      .use(express.static('public'))
  );

  app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
      console.log('got a messsage', msg);
    });
  });

  return app.listen(port);
};

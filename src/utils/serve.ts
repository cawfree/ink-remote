import express from "express";
import expressWs from "express-ws";
import ip from "ip";
import {html} from "../pages";

export const serve = ({port}: {
  readonly port: number;
}) => {
  const {app} = expressWs(
    express()
      .get('/', (...args) => {
        const [, res] = args;
        return res
          .status(200)
          .send(html({
            address: ip.address(),
            port,
          }));
      }),
  );

  app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
      console.log('got a messsage', msg);
    });
  });

  return app.listen(port);
};

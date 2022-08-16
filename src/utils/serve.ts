import express from "express";
import expressWs from "express-ws";
import * as handlebars from "handlebars";
import fs from "fs";
import ip from "ip";
import appRootPath from "app-root-path";

export const serve = ({port}: {
  readonly port: number;
}) => {
  const {app, getWss} = expressWs(
    express()
      .use(express.static(appRootPath.resolve('public')))
      .get('/index.css', (req, res) =>
        res.sendFile(appRootPath.resolve('node_modules/ink-remote/public/index.css'))
      )
      .get('/node_modules/xterm/lib/xterm.js', (req, res) =>
        res.sendFile(appRootPath.resolve('node_modules/xterm/lib/xterm.js'))
      )
      .get( '/', (e, res) => res
        .status(200)
        .send(
          handlebars.compile(
            fs.readFileSync(
              appRootPath.resolve(
                'node_modules/ink-remote/public/index.html'),
                'utf-8',
            )
            )({
                address: ip.address(),
                port,
              }),
         ),
      ),
  );

  // Receive messages from the client.
  app.ws(
    '/',
    (ws, req) => ws.on('message', (msg) => undefined),
  );

  app.listen(port);

  return getWss();
};

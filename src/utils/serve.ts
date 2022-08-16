import express from "express";
import expressWs from "express-ws";
import * as handlebars from "handlebars";
import fs from "fs";
import ip from "ip";
import path from "path";

export const serve = ({port}: {
  readonly port: number;
}) => {
  const {app, getWss} = expressWs(
    express()
      .use(express.static(__dirname + '/public'))
      .get('/index.css', (req, res) =>
        res.sendFile(path.resolve('public/index.css'))
      )
      .get('/node_modules/xterm/lib/xterm.js', (req, res) =>
        res.sendFile(path.resolve('node_modules/xterm/lib/xterm.js'))
      )
      .get( '/', (e, res) => res
        .status(200)
        .send(
          handlebars.compile(fs.readFileSync('public/index.html', 'utf-8'))({
            address: ip.address(),
            port,
          }),
        ),
      )
  );

  // Receive messages from the client.
  app.ws(
    '/',
    (ws, req) => ws.on('message', (msg) => undefined),
  );

  app.listen(port);

  return getWss();
};

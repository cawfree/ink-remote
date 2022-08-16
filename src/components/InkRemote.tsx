import * as React from "react";
import express from "express";
import expressWs from "express-ws";
import {Server} from "net";

export const InkRemote = React.memo(function InkRemote({
  children,
  port = 3000,
}: React.PropsWithChildren<{
  readonly port?: number;
}>): JSX.Element {

  const server = React.useMemo<Server>(() => {
    const app = express();
    expressWs(app);

    app.get('*', (_, res) => res.status(200).send(
      `
  <!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.5.0/lib/xterm-addon-fit.min.js"></script>
    </head>
    <body>
      <div id="terminal"></div>
      <script>
        var terminal = new Terminal();
        const fitAddon = new FitAddon.FitAddon();
        
        terminal.loadAddon(fitAddon);
        
        terminal.open(document.getElementById('terminal'));

        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        
        
        fitAddon.fit(terminal);
        console.log('done');
        
      </script>
    </body>
  </html>
      `.trim(),
    ));

    app.use((err) => {
      console.error(err);
    });

    return app.listen(port);
  }, [port]);

  return <React.Fragment children={children} />;
});

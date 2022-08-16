export const html = ({address, port}: {
  readonly address: string;
  readonly port: number;
}) => `
<!DOCTYPE HTML>
<html>
 <head>
  <script type = "text/javascript">
    var ws = new WebSocket("ws://${address}:${String(port)}");
    
    ws.onopen = function () {
      ws.send("Hello, world.");
    };
    
    ws.onmessage = console.log;
    ws.onclose = console.log;
    
  </script>
 </head>
 <body>
 </body>
</html>
`.trim();

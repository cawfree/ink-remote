export const html = ({address, port}: {
  readonly address: string;
  readonly port: number;
}) => `
<!DOCTYPE HTML>
<html>
 <head>
  <script type = "text/javascript">
   function WebSocketTest() {
    if ("WebSocket" in window) {
     // Let us open a web socket
     var ws = new WebSocket("ws://${address}:${String(port)}");
     
     ws.onopen = function () {
       console.log("Sent.")
       ws.send("Hello, world.");
     };
     
     ws.onmessage = console.log;
     ws.onclose = console.log;
    } else {
      console.error("WebSockets are not supported by your browser.");
    }
   }
  </script>
 </head>
 <body>
  <div id = "sse">
     <a href = "javascript:WebSocketTest()">Run WebSocket</a>
  </div>
 </body>
</html>
`.trim();

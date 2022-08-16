import * as React from "react";
import {Text, Box} from "ink";
import Spinner from "ink-spinner";

import {render} from "../src";

function App() {
  const [count, increment] = React.useReducer((i) => i + 1, 0);

  React.useEffect(() => {
    const i = setInterval(increment, 1000);
    return () => clearInterval(i);
  }, [increment]);

  return (
    <Box flexDirection="row">
      <Spinner />
      <Text children=" " />
      <Text children="Hello, world!" color="red" />
      <Text children=" " />
      <Text children={String(count)} color="green" />
    </Box>
  );
}

render(<App />, {port: 3000});

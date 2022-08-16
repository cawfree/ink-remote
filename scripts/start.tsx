import * as React from "react";
import {Text, Box} from "ink";
import Spinner from "ink-spinner";

import {render} from "../src";

render(
  <Box flexDirection="row">
    <Spinner />
    <Text children="Hello, world!" color="red" />
  </Box>,
  {port: 3000},
);

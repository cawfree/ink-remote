import * as React from "react";
import {render, Text, Box} from "ink";
import Spinner from "ink-spinner";

import {InkRemote} from "../src";

render(
  <InkRemote>
    <Box flexDirection="row">
      <Spinner />
      <Text children="Hello, world!" color="red" />
    </Box>
  </InkRemote>
);

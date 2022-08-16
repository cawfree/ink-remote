import * as React from "react";
import {render, Text} from "ink";

import {InkRemote} from "../src";

render(
  <InkRemote>
    <Text children="Hello, world!" color="red" />
  </InkRemote>
);

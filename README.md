# ink-remote
Serve an [__Ink__](https://github.com/vadimdemedes/ink) application via [__Express__](https://github.com/expressjs/express), so you can check on your application remotely when you don't feel like getting up from off your couch since you run the risk of waking your baby 👶

[__Check it out!__ 👀](https://twitter.com/cawfree/status/1559674440430063616)

### 🚀 getting started

Install using [__Yarn__](https://yarnpkg.com/):

```shell
yarn add ink-remote xterm xterm-addon-fit
```

Then just swap out `ink`'s included `render` function for the alternative `render` method exported by `ink-remote`:

```diff
import * as React from "react";

- import {Text, render} from "ink";
+ import {Text} from "ink";
+ import {render} from "ink-remote";

- render(<Text children="Hello, world!" />);
+ render(<Text children="Hello, world!" />, {port: 3000});
```

In this instance, not only will your application will be rendered in the CLI like usual, but it will also be accessible via [`http://localhost:3000`](http://localhost:3000`). The content is rendered using [__XTerm__](https://github.com/xtermjs/xterm.js/), whose fully-featured renderer is capable of rendering your application faithfully.

### ✌️ license
[__MIT__](./LICENSE)

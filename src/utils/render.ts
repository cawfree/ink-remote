import {render as defaultRender} from "ink";
import {ReactElement} from "react";
import {
  Instance,
  RenderOptions as DefaultRenderOptions,
} from "ink/build/render";

import {serve} from "./serve";

export type InkRemoteOptions = {
  readonly port?: number;
};

export type RenderOptions =
  & Omit<DefaultRenderOptions, 'stdout' | 'stderr' | 'stdin'>
  & InkRemoteOptions;

export const DEFAULT_PORT = 3000;

export function render<
  Props,
  K extends RenderOptions
>(
  tree: ReactElement<Props>,
  options?: K
): Instance {

  const port = options?.port || DEFAULT_PORT;
  const wss = serve({port});

  const defaultWrite = process.stdout.write.bind(process.stdout);

  process.stdout.write = (e) => {
    wss.clients.forEach(client => {
      client.send(e);
    })
    return defaultWrite(e);
  };

  return defaultRender<Props, DefaultRenderOptions>(tree, {
    ...options,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
  });
}
import express from "express";

export const serve = ({port}: {
  readonly port: number;
}) => express()
  .get('*', (...args) => {
    const [, res] = args;
    return res
      .status(200)
      .send('hello world');
  })
  .listen(port);

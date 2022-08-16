import * as React from "react";

export const InkRemote = React.memo(function InkRemote({
  children,
}: React.PropsWithChildren<{}>): JSX.Element {
  return <React.Fragment children={children} />;
});

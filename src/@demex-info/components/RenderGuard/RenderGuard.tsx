import React, { Fragment } from "react";

interface Props {
  children: React.ReactNode;
  renderIf: boolean;
}

const RenderGuard: React.FC<Props> = (props: Props) => {
  const { children, renderIf } = props;

  return (
    <Fragment>
      {renderIf && children}
      {!renderIf && null}
    </Fragment>
  );
};

export default RenderGuard;


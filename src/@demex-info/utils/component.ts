export interface PartialBoxProps {
  margin?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  marginTop?: string | number
  marginX?: string | number
  marginY?: string | number
  mt?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  my?: string | number
  mx?: string | number

  padding?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingTop?: string | number
  paddingX?: string | number
  paddingY?: string | number

  flex?: string | number
  flexBasis?: string
  flexDirection?: "row" | "column"
  flexGrow?: string | number
  flexShrink?: string | number
  flexWrap?: string

  position?: "relative" | "absolute" | "fixed" | "initial" | "unset"
}

export const extractBoxProps = (props: any) => {
  const {
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    mt,
    mb,
    ml,
    mr,
    my,
    mx,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    position,
    ...restProps
  } = props;

  const boxProps: {
    [index: string]: any,
  } = {
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    mt,
    mb,
    ml,
    mr,
    my,
    mx,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    position,
  };

  for (const key of Object.keys(boxProps)) {
    if (boxProps[key] === undefined) {
      delete boxProps[key];
    }
  }

  return {
    boxProps: boxProps as PartialBoxProps,
    restProps,
  };
};

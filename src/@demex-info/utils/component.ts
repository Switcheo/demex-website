// Box Utils
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
  px?: string | number
  py?: string | number

  flex?: string | number
  flexBasis?: string
  flexDirection?: "row" | "column"
  flexGrow?: string | number
  flexShrink?: string | number
  flexWrap?: string

  position?: "relative" | "absolute" | "fixed" | "initial" | "unset"

  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
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
    px,
    py,
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    position,
    height,
    width,
    maxHeight,
    maxWidth,
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
    px,
    py,
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    position,
    height,
    width,
    maxHeight,
    maxWidth,
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

// Table Utils
export interface HeaderCell {
  childClass?: string
  className?: string
  key?: string
  title: string
  sortFunc?: () => void  // required for sorting
  sortProps?: SortProps  // required for sorting
  sortKey?: string  // required for sorting
  tooltip?: string
  showCol?: boolean;
}

export type SortDirection = "desc" | "asc"

export interface SortProps {
  prop: string
  direction: SortDirection
}

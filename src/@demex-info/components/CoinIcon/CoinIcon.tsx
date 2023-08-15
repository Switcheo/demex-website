/* eslint-disable no-unused-vars */
import { Placeholder } from "@demex-info/assets/icons";
import { TOKEN_ICON_REPO_URL } from "@demex-info/constants";
import { SvgIconProps, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { SvgIcon } from "../SvgIcon";

export interface CoinIconProps extends SvgIconProps {
  denom?: string
}

const getTokenIconURL = (symbol: string, fileType: string) => {
  return TOKEN_ICON_REPO_URL.replace(":token_name", symbol).replace(":file_type", fileType);
};

const tokenNameMap: {
  [index: string]: string
} = {
  "LKT.BEP20": "LKT",
  BTCB: "BTC",
  USD: "cUSD",
  SWTHB: "SWTH",
  USTC: "UST",
  CUSDC: "USDC",
};

const CoinIcon: React.FunctionComponent<CoinIconProps> = ({
  denom,
  className,
  ...rest
}: CoinIconProps) => {
  const classes = useStyles();
  const [imageSrcIndex, setImageSrcIndex] = React.useState(0);
  const [imageSrcError, setImageSrcError] = React.useState(false);

  let symbolToFetch = denom ?? "";
  symbolToFetch = tokenNameMap[symbolToFetch] ?? symbolToFetch;

  const imageSrcArray = symbolToFetch ? ["svg", "png"].map((fileType) => getTokenIconURL(symbolToFetch, fileType)) : [];

  const handleImgSrcError = () => {
    if (imageSrcIndex < imageSrcArray.length - 1) {
      setImageSrcIndex(imageSrcIndex + 1);
    } else {
      console.error(symbolToFetch);
      setImageSrcError(true);
    }
  };

  return !imageSrcError && symbolToFetch ? (
    <img className={clsx(classes.svg, className)} src={imageSrcArray[imageSrcIndex]} onError={handleImgSrcError} alt={symbolToFetch} />
  ) : (
    <SvgIcon
      component={Placeholder}
      {...rest}
      className={clsx(classes.svg, className)}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  svg: {
    fontSize: "inherit",
    borderRadius: "100%",
  },
}));

export default CoinIcon;

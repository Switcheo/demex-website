import { BannerBlueLeft, BannerBlueMiddle, BannerBlueRight, BannerOrange, ExternalLink } from "@demex-info/assets";
import { goToLink } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import {
  Box, BoxProps, Button, makeStyles, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { SvgIcon } from "../SvgIcon";

interface Props extends BoxProps {
  bannerIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  headerText: string
  subHeader: string
  bannerIconClass?: string
  ctaText?: string
  ctaUrl?: string
  buttonText?: string
  buttonUrl?: string
}

const Banner: React.FC<Props> = (props: Props) => {
  const { bannerIcon, headerText, subHeader, ctaText, ctaUrl, buttonText, buttonUrl, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Box {...rest} className={clsx(className, classes.root)}>
      <Box className={classes.banner}>
        <Box className={classes.leftBanner}>
          <SvgIcon className={classes.bannerIcon} component={bannerIcon} />
          <Box className={classes.content}>
            <Box className={classes.header}>
              {headerText}
            </Box>
            <Box className={classes.subHeader}>
              <Box>{subHeader} &nbsp;</Box>
              {ctaText && ctaUrl && (
                <Button
                  onClick={() => goToLink(ctaUrl)}
                  className={classes.linkButton}
                  variant="text"
                  color="secondary"
                  endIcon={<SvgIcon className={classes.linkIcon} component={ExternalLink} />}
                >
                  {ctaText}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {buttonText && buttonUrl && (
          <Button
            variant="contained"
            onClick={() => goToLink(buttonUrl)}
            className={classes.actionButton}
          >
            {buttonText}
          </Button>
        )}
        {/* background vectors */}
        <SvgIcon className={classes.bannerBlueLeft} component={BannerBlueLeft} />
        <SvgIcon className={classes.bannerBlueMiddle} component={BannerBlueMiddle} />
        <SvgIcon className={classes.bannerBlueRight} component={BannerBlueRight} />
        <SvgIcon className={classes.bannerOrange} component={BannerOrange} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: "transparent",
    padding: "5.5rem 3rem 1.5rem",
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    },
  },
  banner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.snow,
    background: StyleUtils.bannerGradient,
    borderRadius: "4px",
    boxShadow: StyleUtils.boxShadow(theme),
    position: "relative",
    minHeight: "4.75rem",
    overflow: "hidden",
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      minHeight: "unset",
    },
  },
  leftBanner: {
    display: "flex",
    alignItems: "center",
  },
  bannerIcon: {
    zIndex: 3,
    padding: "0.75rem 1.5rem",
    minWidth: "2.5rem",
    minHeight: "2.5rem",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0.875rem 1.5rem 0.875rem 0",
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 0.5rem 0.5rem 0",
    },
  },
  header: {
    ...theme.typography.title2,
    color: theme.palette.text.primary,
    marginBottom: "0.25rem",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title4,
    },
  },
  subHeader: {
    ...theme.typography.body3,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body4,
    },
  },
  linkButton: {
    ...theme.typography.title3,
    padding: 0,
    height: "1rem",
    "& .MuiButton-endIcon": {
      marginLeft: 0,
    },
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title4,
    },
  },
  linkIcon: {
    "& path": {
      fill: "url(#demexLinearGradient)",
    },
  },
  actionButton: {
    padding: "0.75rem 1.125rem",
    minWidth: "6rem",
    marginRight: "1.5rem",
    "& .MuiButton-label": {
      ...theme.typography.body3,
      fontWeight: 700,
      [theme.breakpoints.down("md")]: {
        ...theme.typography.body4,
        fontWeight: 700,
      },
    },
    "&:hover": {
      cursor: "pointer",
    },
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      padding: "0.625rem 0.375rem",
      marginRight: "0.5rem",
      minWidth: "4rem",
    },
  },
  bannerOrange: {
    position: "absolute",
    opacity: "60%",
    zIndex: 0,
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      opacity: 1,
    },
  },
  bannerBlueLeft: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
  },
  bannerBlueMiddle: {
    position: "absolute",
    right: "20%",
    zIndex: 1,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  bannerBlueRight: {
    position: "absolute",
    right: 0,
    zIndex: 2,
    height: "100%",
  },
}));

export default Banner;

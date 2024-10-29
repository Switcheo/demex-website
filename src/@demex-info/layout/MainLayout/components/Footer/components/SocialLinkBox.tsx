import { ExtSocialLnk, SocialLnks } from "@demex-info/constants";
import { Box, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const SocialLinkBox: React.FC = () => {
  const classes = useStyles();

  const socialLnksTop: ExtSocialLnk[] = [
    SocialLnks.Twitter,
    SocialLnks.Telegram,
    SocialLnks.Discord,
    SocialLnks.Tips,
  ];

  return (
    <Box className={classes.componentsSvg}>
      {socialLnksTop.map((socialLnk: ExtSocialLnk) => {
        const { component: SvgComponent } = socialLnk;
        return (
          <IconButton
            href={socialLnk.href}
            target="_blank"
            className={classes.iconBtn}
            key={socialLnk.label}
            color="secondary"
          >
            <SvgComponent className={classes.iconSvg} />
          </IconButton>
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  componentsSvg: {
    [theme.breakpoints.only("xs")]: {
      display: "block",
      width: "fit-content",
    },
  },
  iconBtn: {
    margin: theme.spacing(0, 1, 0, 0),
    "&:last-child": {
      marginRight: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      borderRadius: "50%",
    },
  },
  iconSvg: {
    maxWidth: "1.5rem",
    maxHeight: "1.5rem",
    padding: theme.spacing(0.5),
    "& path": {
      fill: theme.palette.text.secondary,
    },
    "&:hover": {
      "& path": {
        fill: "url(#demexLinearGradient)",
      },
    },
  },
  navTitle: {
    ...theme.typography.body2,
    fontWeight: 700,
  },
}));

export default SocialLinkBox;

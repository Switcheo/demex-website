import { TypographyLabel } from "@demex-info/components";
import { ExtSocialLnk, SocialLnks } from "@demex-info/constants";
import { Box, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const SocialLinkBox: React.FC = () => {
  const classes = useStyles();

  const socialLnks: ExtSocialLnk[] = [
    SocialLnks.Twitter,
    // SocialLnks.Telegram,
    SocialLnks.Discord,
    // SocialLnks.Medium,
    // SocialLnks.Reddit,
    SocialLnks.GitHub,
    // SocialLnks.LinkedIn,
  ];

  return (
    <Box className={classes.navDiv}>
      <TypographyLabel mb={2} className={classes.navTitle}>
        Follow Us
      </TypographyLabel>
      <Box className={classes.componentsSvg}>
        {socialLnks.map((socialLnk: ExtSocialLnk) => {
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
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  componentsSvg: {
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  iconBtn: {
    marginRight: theme.spacing(1.5),
    marginTop: 0,
    "&:last-child": {
      marginRight: 0,
    },
  },
  iconSvg: {
    height: "1.125rem",
    padding: theme.spacing(1),
    width: "1.125rem",
    "& path": {
      fill: theme.palette.text.secondary,
    },
    "&:hover": {
      "& path": {
        fill: theme.palette.secondary.main,
      },
    },
  },
  navDiv: {
    marginRight: theme.spacing(7),
    minWidth: "10rem",
    [theme.breakpoints.only("md")]: {
      marginTop: theme.spacing(9),
      marginRight: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4.5),
      marginRight: 0,
    },
  },
  navTitle: {
    color: theme.palette.text.secondary,
    fontSize: "0.8375rem",
    fontWeight: 500,
  },
}));

export default SocialLinkBox;

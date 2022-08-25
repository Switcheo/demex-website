import { TypographyLabel } from "@demex-info/components";
import { ExtSocialLnk, SocialLnks } from "@demex-info/constants";
import { Box, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const SocialLinkBox: React.FC = () => {
  const classes = useStyles();

  const socialLnksTop: ExtSocialLnk[] = [
    SocialLnks.Twitter,
    // SocialLnks.Telegram,
    SocialLnks.Discord,
    SocialLnks.GitHub,
    // SocialLnks.Reddit,
    // SocialLnks.Medium,
    // SocialLnks.LinkedIn,
  ];

  return (
    <Box className={classes.navDiv}>
      <TypographyLabel className={classes.navTitle}>
        Follow Us
      </TypographyLabel>
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
    margin: theme.spacing(0, 2.5, 0, 0),
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
  navDiv: {
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      paddingLeft: theme.spacing(4.5),
    },
    "@media (max-width: 360px)": {
      paddingLeft: theme.spacing(2.5),
    },
  },
  navTitle: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    marginBottom: "0.625rem",
  },
}));

export default SocialLinkBox;

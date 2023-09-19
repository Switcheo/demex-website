import { ExtSocialLnk, SocialLnks } from "@demex-info/constants";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import React from "react";



const SocialsBar: React.FC = () => {
  const classes = useStyles();

  const socialLnksTop: ExtSocialLnk[] = [
    SocialLnks.Twitter,
    SocialLnks.Telegram,
    SocialLnks.Discord,
    SocialLnks.Blog,
    SocialLnks.GitHub,
    SocialLnks.GitBook,
  ];

  return (
    <Box className={classes.root}>
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
            <SvgComponent className={classes.svgIcon} />
          </IconButton>
        );
      })}
    </Box>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 999,
    border: "1px solid",
    borderColor: theme.palette.background.divider,
    borderRadius: "12px",
    bottom: "2rem",
    right: "2rem",
    backgroundColor: theme.palette.background.tertiary,
    boxShadow: `0px 0px 16px ${theme.palette.shadow}`,
    backdropFilter: "blur(2px)",
    padding: "1rem 1rem",
    [theme.breakpoints.down("sm")]: {
      left: "50%",
      right: 0,
      transform: "translate(-50%, 0)",
    },
  },
  iconBtn: {
    "&:not(:last-child)": {
      paddingRight: "1rem",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      borderRadius: "50%",
    },
  },
  svgIcon: {
    color: theme.palette.text.primary,
    "& path": {
      fill: theme.palette.text.primary,
    },
    "&:hover": {
      "& path": {
        fill: "url(#demexLinearGradient)",
      },
    },
  },
}));

export default SocialsBar;

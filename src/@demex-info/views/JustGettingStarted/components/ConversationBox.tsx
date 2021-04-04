import { Box, Divider, IconButton, Theme, fade, makeStyles } from "@material-ui/core";
import { ExtSocialLnk, SocialLnks } from "@demex-info/constants/links";
import { PaperBox, TypographyLabel } from "@demex-info/components";

import { Dialogue } from "@demex-info/assets";
import React from "react";
import clsx from "clsx";

const ConversationBox: React.FC = () => {
  const classes = useStyles();

  const buttonList: ExtSocialLnk[] = [
    SocialLnks.Twitter,
    SocialLnks.Telegram,
    SocialLnks.Reddit,
    SocialLnks.Discord,
  ];

  return (
    <PaperBox className={classes.gridBox}>
      <Dialogue className={classes.cardSvg} />
      <TypographyLabel className={classes.cardTitle} mt={2} variant="h4">
        Join the Conversation
      </TypographyLabel>
      <TypographyLabel boxClass={classes.cardSubtitle} variant="subtitle1">
        Be a part of our growing community and never miss an update.
      </TypographyLabel>
      <Divider className={classes.divider} />
      <Box>
        {buttonList.map((btnSocial: ExtSocialLnk) => {
          const { component: SvgComponent } = btnSocial;
          return (
            <IconButton
              className={clsx(classes.iconBtn, btnSocial.label)}
              key={btnSocial.label}
            >
              <SvgComponent className={classes.iconSvg} />
            </IconButton>
          );
        })}
      </Box>
    </PaperBox>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  cardSubtitle: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(1.5),
    },
  },
  cardSvg: {
    width: "2.5rem",
    height: "2.5rem",
  },
  cardTitle: {
    fontSize: "1.75rem",
    fontWeight: 500,
    [theme.breakpoints.only("xs")]: {
      lineHeight: 1.15,
    },
  },
  divider: {
    margin: theme.spacing(4, 0),
    width: "4rem",
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(4, 0),
    },
  },
  gridBox: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.25),
    boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
    height: "calc(100% - 4rem)",
    padding: theme.spacing(4),
    marginLeft: theme.spacing(1.25),
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.only("xs")]: {
      height: "calc(100% - 3.5rem)",
      padding: theme.spacing(3.5, 2.5),
    },
  },
  iconBtn: {
    marginLeft: theme.spacing(2),
    "&:first-child": {
      marginLeft: 0,
    },
    "&.discord": {
      backgroundColor: "#7389d8",
      "&:hover": {
        backgroundColor: "#677bc2",
      },
    },
    "&.telegram": {
      backgroundColor: "#0387cb",
      "&:hover": {
        backgroundColor: "#0279b6",
      },
    },
    "&.reddit": {
      backgroundColor: "#FF4301",
      "&:hover": {
        backgroundColor: "#e53c00",
      },
    },
    "&.twitter": {
      backgroundColor: "#6db8e1",
      "&:hover": {
        backgroundColor: "#62a5ca",
      },
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginTop: theme.spacing(0.75),
    },
  },
  iconSvg: {
    height: "1.25rem",
    padding: theme.spacing(1.75),
    width: "1.25rem",
    "& path": {
      fill: theme.palette.background.default,
    },
    "&:hover": {
      "& path": {
        fill: theme.palette.background.default,
      },
    },
    [theme.breakpoints.only("xs")]: {
      height: "1rem",
      padding: theme.spacing(1.5),
      width: "1rem",
    },
  },
}));

export default ConversationBox;

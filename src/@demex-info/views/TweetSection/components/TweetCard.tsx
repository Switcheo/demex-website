import { ExternalLink, X } from "@demex-info/assets";
import { RenderGuard } from "@demex-info/components";
import { goToExternalLink } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";

interface Props {
  mainContent: string,
  tweetDate: string,
  replyingTo: string,
  twitterName: string,
  twitterUsername: string
  className?: string,
}

const TweetCard: React.FC<Props> = (props: Props) => {
  const { mainContent, tweetDate, replyingTo, twitterName, twitterUsername, className } = props;
  const classes = useStyles();

  const contentArr = mainContent.split("/link/");
  const tweetContent = contentArr[0];
  const detailsArr = contentArr[1]?.split("/image/") ?? [];
  const tweetUrl = detailsArr[0];
  const tweetPic = detailsArr[1];
  const tweetPicUrl = "https://" + tweetPic;
  const date = dayjs(tweetDate).format("MMM D");
  const isReplyingTweet = replyingTo !== "";

  return (
    <Box className={clsx(className, classes.root)} onClick={() => goToExternalLink(tweetUrl)}>
      <Box className={classes.topSection}>
        <Box>
          <Box className={classes.accountName}>
            <X className={classes.twitterIcon} />
            {twitterName}
          </Box>
          <Box className={clsx(classes.text, classes.username)}>
            {twitterUsername}
            <Box className={classes.secondaryText}>{date}</Box>
          </Box>
        </Box>
        <ExternalLink className={classes.linkIcon} />
      </Box>
      <RenderGuard renderIf={isReplyingTweet}>
        <Box display="flex" whiteSpace="nowrap" mb={1} className={classes.text}>
          Replying to
          <Box className={classes.linkText}>{replyingTo}</Box>
        </Box>
      </RenderGuard>
      <Box display="flex" alignItems="center">
        <Box className={clsx(classes.text, classes.tweetContent, { isReplyingTweet })}>
          {tweetContent}
        </Box>
      </Box>
      <RenderGuard renderIf={tweetPic !== undefined}>
        <Box display="flex" justifyContent="center">
          <img src={tweetPicUrl} className={classes.img} />
        </Box>
      </RenderGuard>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.primary,
    width: "430px",
    minHeight: "264px",
    height: "min-content",
    boxShadow: StyleUtils.boxShadow(theme),
    borderRadius: "4px",
    padding: "2rem 2.5rem",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.only("md")]: {
      width: "calc(33% - 1.25rem)",
      height: "unset",
      padding: "1rem 0.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "186px",
      padding: "1rem 0.75rem",
    },
  },
  img: {
    maxWidth: "100%",
    maxHeight: "185px",
    marginTop: theme.spacing(1),
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.75rem",
    },
  },
  twitterIcon: {
    marginRight: "0.5rem",
  },
  accountName: {
    ...theme.typography.title1,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("md")]: {
      ...theme.typography.title2,
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
  },
  text: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    [theme.breakpoints.only("md")]: {
      ...theme.typography.body2,
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
    },
  },
  username: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    marginLeft: "0.5rem",
    whiteSpace: "nowrap",
  },
  linkIcon: {
    height: "2.5rem",
    width: "2.5rem",
    marginRight: "-1rem",
    position: "relative",
    marginTop: "-1.25rem",
    [theme.breakpoints.only("md")]: {
      marginRight: 0,
      marginTop: "-0.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "2rem",
      width: "2rem",
      marginRight: 0,
    },
  },
  linkText: {
    background: StyleUtils.primaryGradientHover(theme),
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    marginLeft: "0.5rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tweetContent: {
    color: theme.palette.text.secondary,
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    "&.isReplyingTweet": {
      WebkitLineClamp: 4,
    },
  },
}));

export default TweetCard;

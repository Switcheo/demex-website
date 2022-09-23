import YellowVectorTop from "@demex-info/assets/background/YellowVectorTop.svg";
import { BackgroundAnimation, TypographyLabel } from "@demex-info/components";
import { RootState } from "@demex-info/store/types";
import { Box, Container, Hidden, makeStyles, Theme } from "@material-ui/core";
import { List } from "immutable";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TweetCard from "./components/TweetCard";

interface TweetData {
  index: number
  mainContent: string
  tweetDate: string
  replyingTo: string
  twitterName: string
  twitterUsername: string
}

const TweetSection: React.FC = () => {
  const classes = useStyles();
  const contentfulClient = useSelector((state: RootState) => state.app.contentfulClient);
  const [tweetList, setTweetList] = useState(List<TweetData>());
  const [selectedTweets, setSelectedTweets] = useState(List<TweetData>());
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    let newTweetList = List<TweetData>();
    contentfulClient.getEntries({ content_type: "communityTweets" })
      .then((response) => {
        response.items.forEach((item: any, index) => {
          const { mainContent, replyingTo, tweetDate, twitterName, twitterUsername } = item.fields;
          newTweetList = newTweetList.push({
            index,
            mainContent,
            replyingTo,
            tweetDate,
            twitterName: twitterName.content[0].content[0].value,
            twitterUsername,
          });
        });
        setTweetList(newTweetList);
        setSelectedTweets(newTweetList.slice(0, 3));
      });
  }, [contentfulClient]);

  useEffect(() => {
    // update 3 cards every 20s
    const interval = setInterval(() => {
      if (currIndex === 0) {
        setCurrIndex(3);
      } else if (currIndex % 3 === 0 && currIndex + 3 < tweetList.size) {
        setCurrIndex(currIndex + 3);
      } else {
        setCurrIndex(0);
      }
    }, 20000);
    setSelectedTweets(tweetList.slice(currIndex, currIndex + 3));
    return () => clearInterval(interval);
  }, [currIndex]);

  return (
    <Box className={classes.innerDiv}>
      <Hidden smDown><BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} /></Hidden>
      <Container maxWidth={false} className={classes.contentContainer}>
        <Box className={classes.mainHeader}>
          <TypographyLabel boxClass={classes.typoContainer} className={classes.typography}>Don’t Just Trust Us</TypographyLabel>
        </Box>
        <TypographyLabel boxClass={classes.subtextBox} className={classes.subtext}>
          Check out what others are saying.
        </TypographyLabel>
        <Box className={classes.tweets}>
          {
            selectedTweets.map((tweet, index) => {
              const { mainContent, replyingTo, tweetDate, twitterName, twitterUsername } = tweet;
              return (
                <TweetCard
                  key={`${index}-${twitterName}`}
                  mainContent={mainContent}
                  replyingTo={replyingTo}
                  tweetDate={tweetDate}
                  twitterName={twitterName}
                  twitterUsername={twitterUsername}
                />
              );
            })
          }
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.base,
    marginTop: "0.5rem",
    alignItems: "center",
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
		},
  },
  mainHeader: {
    [theme.breakpoints.down("md")]: {
      height: "310px",
      background: `url(${YellowVectorTop}) no-repeat top right`,
    },
  },
  typography: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    textAlign: "center",
    marginTop: "10rem",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "-9rem",
    },
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
      padding: "4.5rem 1rem 0",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
      maxWidth: "calc(100% - 2rem)",
			margin: "-9rem auto 0",
		},
  },
  typoContainer: {
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  subtextBox: {
    maxWidth: "67rem",
    marginBottom: "5rem",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      marginTop: "-10rem",
      marginBottom: "3.125rem",
    },
  },
  subtext: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
      padding: "0 1rem",
			marginTop: "0.75rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
  },
  position: {
		position: "absolute",
		left: 0,
		width: "100%",
		[theme.breakpoints.up("lg")]: {
			top: "-400px",
			height: "calc(100vh + 40rem)",
		},
		[theme.breakpoints.down("md")]: {
			overflowX: "hidden",
			top: "-125px",
			minHeight: "60rem",
		},
		[theme.breakpoints.down("xs")]: {
			top: "-200px",
		},
	},
	container: {
		position: "relative",
		margin: "0 auto",
		maxWidth: "1590px",
		[theme.breakpoints.only("md")]: {
			maxWidth: "unset",
			margin: "-70% ​-100%",
		},
		[theme.breakpoints.down("sm")]: {
			margin: "-1rem -3rem",
		},
		[theme.breakpoints.only("xs")]: {
			margin: "-1rem -15rem",
		},
		"@media (max-width: 319px)": {
			margin: "-20% -106%",
		},
	},
	padding: {
		height: "56.25%",
		[theme.breakpoints.down("md")]: {
			height: "25%",
		},
	},
  contentContainer: {
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  tweets: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "1346px",
    "& > div:not(:last-child)": {
      marginRight: "1.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      maxWidth: "unset",
      padding: "0 0.625rem",
      "& > div:not(:last-child)": {
        marginRight: 0,
        marginBottom: "1.75rem",
      },
    },
  },
}));

export default TweetSection;

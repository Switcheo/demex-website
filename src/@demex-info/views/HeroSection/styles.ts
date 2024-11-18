import { makeStyles } from "@material-ui/core";

export const useHeroSectionStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    display: "flex",
    minHeight: "245px",
    width: "360px",
    background: "#FFFFFF0A",
    backdropFilter: "blur(64px)",
    boxShadow: "0px 1px 0px 0px #FFFFFF14 inset",
    borderRadius: theme.spacing(1),
    opacity: 1,
    transition: "opacity .5s ease-in-out",
    "&.inactive": {
      opacity: 0.7,
    },
    [theme.breakpoints.down("sm")]: {
      opacity: 1,
      "&.inactive": {
        display: "none",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
    gap: theme.spacing(4),
    width: "100%",
		padding: theme.spacing(5, 4),
    ["@media (max-width: 1180px)"]: {
      gap: theme.spacing(3),
      padding: theme.spacing(4, 3),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3.5, 3),
      justifyContent: "flex-start",
    },
	},
  cardTitleWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
	cardTitle: {
		...theme.typography.h3,
		color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h4,
    },
	},
	button: {
		color: theme.palette.text.primary,
    opacity: 1,
    transition: "opacity .5s ease-in-out",
    height: "3rem",
    "&.inactive": {
      opacity: 0.2,
    },
    "&.isMobile": {
      width: "fit-content",
      height: "1.5rem",
    },
    "&.active": {
      filter: "drop-shadow(0 0 25px rgb(0,122,255, .4))",
    },
	},
  glow: {
    textShadow: "0 0 25px rgb(240,248,255, .5)",
  },
}));

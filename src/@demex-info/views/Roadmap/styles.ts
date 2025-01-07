import { makeStyles } from "@material-ui/core";

import BottomGradient from "./assets/BottomGradient.svg";

export const useRoadmapStyles = makeStyles((theme) => ({
  chip: {
    ...theme.typography.title2,
    width: "100px",
    height: "40px",
    backgroundColor: theme.palette.background.tertiary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
    color: theme.palette.text.secondary,
    "&.active": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("xs")]: {
      height: "32px",
    },
  },
  quarterItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    "& > svg": {
      width: "16px",
      height: "16px",
    },
    "@media (max-width: 940px)": {
      "& > p": {
        ...theme.typography.body3,
      },
    },
    [theme.breakpoints.down("xs")]: {
      "& > svg": {
        minWidth: "12px",
        width: "12px",
        height: "12px",
      },
    },
  },
  timelineDot: {
    width: "16px",
    height: "16px",
    border: "4px solid #6C6E71",
    borderRadius: "50%",
    marginBottom: theme.spacing(1),
    backgroundColor: "#4A5568",
    boxShadow: "0px 0px 4px 0px #00000080 inset",
    [theme.breakpoints.down("xs")]: {
      width: "12px",
      height: "12px",
      position: "absolute",
      left: "47.5%",
      zIndex: 1,
    },
  },
  highlightDot: {
    border: "4px solid #007AFF",
    background: "linear-gradient(270deg, #007AFF 0%, #482BFF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
    boxShadow: "0px 0px 4px 0px #00000080 inset",
    "&.active": {
      boxShadow: "0px 0px 32px 0px #4268FF",
    },
  },
  activeCard: {
    color: `${theme.palette.text.primary} !important`,
    backgroundImage: `url(${BottomGradient})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
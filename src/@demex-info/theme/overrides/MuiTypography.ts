import { Theme } from "@material-ui/core";

const MuiTypography = (theme: Theme) => ({ // eslint-disable-line no-unused-vars
	h3: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
	},
  subtitle1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
      lineHeight: "1.5rem",
    },
  },
});

export default MuiTypography;

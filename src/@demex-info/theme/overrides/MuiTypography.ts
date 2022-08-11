import { Theme } from "@material-ui/core";

const MuiTypography = (theme: Theme) => ({ // eslint-disable-line no-unused-vars
	h3: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
	},
});

export default MuiTypography;

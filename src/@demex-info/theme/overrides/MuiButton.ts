import { Theme } from "@material-ui/core";

const MuiButton = (theme: Theme) => ({
	root: {
		...theme.typography.button,
		borderRadius: "2px",
		minWidth: "unset",
		textTransform: "none",
	},
	text: {
		color: theme.palette.text.primary,
		fill: theme.palette.text.primary,
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
		},
	},
	contained: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
		},
		"&:active:hover": {
			backgroundColor: theme.palette.secondary.light,
		},
	},
});

export default MuiButton;

import { Theme } from "@material-ui/core";

const MuiButton = (theme: Theme) => ({
	root: {
		...theme.typography.title1,
		borderRadius: "4px",
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
	containedSecondary: {
		color: theme.palette.snow,
		background: "linear-gradient(270deg, #482BFF 0%, #007AFF 100%)",
		"&:hover": {
			background: "linear-gradient(270deg, #007AFF 0%, #482BFF 100%)",
		},
		"&:active:hover": {
			background: "linear-gradient(270deg, #007AFF 0%, #482BFF 100%)",
		},
	},
	contained: {
		color: theme.palette.snow,
		background: "linear-gradient(270deg, #482BFF 0%, #007AFF 100%)",
		"&:hover": {
			background: "linear-gradient(270deg, #007AFF 0%, #482BFF 100%)",
		},
		"&:active:hover": {
			background: "linear-gradient(270deg, #007AFF 0%, #482BFF 100%)",
		},
	},
});

export default MuiButton;

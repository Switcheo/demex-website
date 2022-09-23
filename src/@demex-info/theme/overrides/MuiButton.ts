import { StyleUtils } from "@demex-info/utils";
import { Theme } from "@material-ui/core";

const MuiButton = (theme: Theme) => ({
	root: {
		...theme.typography.title1,
		borderRadius: "4px",
		minWidth: "unset",
		textTransform: "none",
	},
	textSecondary: {
		color: theme.palette.primary.main,
		background: StyleUtils.primaryGradientHover(theme),
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
		"& > span": {
			borderBottom: "1px solid transparent",
		},
		"&:hover > span": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
		"&:disabled": {
			color: theme.palette.text.disabled,
			background: theme.palette.text.disabled,
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
			WebkitBackgroundClip: "text",
			"& > span": {
				borderBottom: "1px solid transparent",
			},
		},
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
		background: StyleUtils.primaryGradient(theme),
		"&:hover, &:active:hover": {
			background: StyleUtils.primaryGradientInversed(theme),
		},
	},
	contained: {
		color: theme.palette.snow,
		background: StyleUtils.primaryGradient(theme),
		"&:hover, &:active:hover": {
			background: StyleUtils.primaryGradientInversed(theme),
		},
	},
	outlined: {
		border: `1px solid ${theme.palette.primary.main}`,
		background: "transparent",
		"&:hover, &:active:hover": {
			background: theme.palette.action.hover,
		},
	},
});

export default MuiButton;

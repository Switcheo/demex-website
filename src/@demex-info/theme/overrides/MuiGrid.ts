import { Theme } from "@material-ui/core";

const MuiGrid = (theme: Theme) => ({
  "spacing-xs-4": {
    "& > $item": {
      padding: theme.spacing(1.5),
    },
  },
});

export default MuiGrid;

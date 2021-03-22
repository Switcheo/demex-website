import { Theme } from "@material-ui/core"

const MuiIconButton = (theme: Theme) => ({
  root: {
    padding: "unset",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
});

export default MuiIconButton

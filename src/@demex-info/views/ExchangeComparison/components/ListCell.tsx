import { makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {
  newKey: string;
  valueItem: any;
}

const ListCell: React.FC<Props> = (props: Props) => {
  const { newKey, valueItem } = props;
  const classes = useStyles();

  if (Array.isArray(valueItem) && typeof valueItem[0] === "string") {
    return (
      <ul className={classes.list}>
        {valueItem.map((item: string) => (
          <li className={classes.listItem} key={`${item}-${newKey}`}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
};

// theme: Theme
const useStyles = makeStyles((theme: Theme) => ({
  list: {
    lineHeight: "1.25rem",
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "9rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      minWidth: "6rem",
      paddingLeft: theme.spacing(1),
    },
  },
  listItem: {
    color: theme.palette.text.secondary,
  },
}));

export default ListCell;

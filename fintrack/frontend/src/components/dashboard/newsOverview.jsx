import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import "../../style/dashboard.css";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  newsList: {
    width: "100%",
    maxWidth: 1200,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listItem: {
    cursor: "pointer",
    marginTop: "10px",
  },
}));

export default function NewsDash(props) {
  const classes = useStyles();

  return (
    <div id="newsSection" className={classes.main}>
      <List className={classes.newsList}>
        <ul>
          <ListItem divider className={classes.listItem}>
            News 1
          </ListItem>
        </ul>
        <ul>
          <ListItem divider className={classes.listItem}>
            News 2
          </ListItem>
        </ul>
      </List>
    </div>
  );
}

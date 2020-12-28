/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/prices" className={classes.block}>
                Prices
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/levels" className={classes.block}>
                Levels
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/histories" className={classes.block}>
                History
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.google.com/"
              target="_blank"
              className={classes.a}
            >
              Maxiland
            </a>
            , made with love for Chloe
          </span>
        </p>
      </div>
    </footer>
  );
}

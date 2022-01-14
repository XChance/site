import React from 'react';
import {createUseStyles} from 'react-jss'
import Background from './components/Background'
import HomePage from './pages/HomePage';

const useStyles = createUseStyles({
  root: {
    height: "100vh",
    backgroundColor: "black",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <Background />
       <HomePage/>
    </div>
  );
}


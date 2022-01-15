import React from 'react';
import {createUseStyles} from 'react-jss'
import { useMediaQuery } from 'react-responsive';
import Background from './components/Background'
import Title from './components/Title';
import Links from './components/Links';

const useStyles = createUseStyles({
  root: {
    height: "100vh",
    backgroundColor: "black",
    position: "relative",
    overflowX: "hidden",
    overflow: "hidden",
  },
  page: {
    minHeight: "100vh",
    width: "100vw",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
});

export default function App() {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Background isMobile={isMobile}/>
      <div className={classes.page}>
        <Title isPortrait={isPortrait} isMobile={isMobile}/>
        <Links isPortrait={isPortrait} isMobile={isMobile}/>
      </div>
    </div>
  );
}


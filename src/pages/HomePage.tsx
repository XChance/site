import React from 'react';
import {createUseStyles} from 'react-jss'
import { useMediaQuery } from 'react-responsive';
import Links from '../components/Links';
import Title from '../components/Title';

const useStyles = createUseStyles({
    root: {
      minHeight: "100vh",
      width: "100vw",
      overflow: "hidden",
      userSelect: "none",
      transition: "all 0.3s ease",
    },
  });

export default function HomePage() {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Title isPortrait={isPortrait} isMobile={isMobile}/>
      <Links isPortrait={isPortrait} isMobile={isMobile}/>
    </div>
  );
}


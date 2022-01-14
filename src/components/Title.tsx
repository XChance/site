import React from 'react';
import { useState, useEffect } from 'react';
import {createUseStyles} from 'react-jss'
import TextTransition, { presets } from "react-text-transition";

const useStyles = createUseStyles({
    ptitle: {
      color: "white",
      fontSize: "8vw",
      position: "relative",
      letterSpacing: "0.3rem",
      top: "6vh",
      left: "8vw",
    },
    pdesc: {
      color: "white",
      fontSize: "2.2vw",
      lineHeight: "2",
      position: "relative",
      top: "5vh",
      left: "11vw",
    },

    ltitle: {
      color: "white",
      fontSize: "8vw",
      position: "relative",
      letterSpacing: "0.3rem",
      top: "6vh",
      left: "8vw",
    },
    ldesc: {
      color: "white",
      fontSize: "2.2vw",
      lineHeight: "2",
      position: "relative",
      top: "8vh",
      left: "16vw",
    },

    mtitle: {
        color: "white",
        fontSize: "12vw",
        position: "relative",
        letterSpacing: "0.3rem",
        top: "6vh",
        left: "14vw",
      },
    mdesc: {
        textAlign: "center",
        color: "white",
        fontSize: "5vw",
        lineHeight: "2",
        position: "relative",
        top: "8vh",
      },
    mlines: {
        marginBottom: "0.5vh",
    },
  });

  type Props = {
      isPortrait: boolean,
      isMobile: boolean,
  };

export default function Title( {isPortrait, isMobile}: Props ) {
  const classes = useStyles();
  let dob = new Date('August 12, 2000 02:43:00').getTime();
  const age = ((Date.now() - dob) / (60*60*24*1000) /365).toFixed(0);
  const [index, setIndex] = useState(0);
  const likes = [
    "making (and playing) games",
    "charcoal drawing",
    "listening to music",
    "messing around in processing",
    "a good banh mi",
    "making bad pixel art",
  ]

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3777
    );
    return () => clearTimeout(intervalId);
  });

    const pc = <React.Fragment>
    <text className={isPortrait ? classes.ptitle : classes.ltitle}>xian chance</text>
    <p className={isPortrait ? classes.pdesc : classes.ldesc}>
    {age} year old jamaican software developer based in atlanta<br/>
    &ensp;fan of web serials, vscode, and anything emergent<br/>
    &emsp;i like <TextTransition text={ likes[index % likes.length]} springConfig={ presets.stiff } inline={true}/>, too
    </p>
    </React.Fragment>

    const mobile = <React.Fragment>
        <text className={classes.mtitle}>xian chance</text>
        <div className={classes.mdesc}>
            <p className={classes.mlines}>{age} year old jamaican software developer based in atlanta</p>
            <p className={classes.mlines}>fan of web serials, vscode, and anything emergent</p>
            <p className={classes.mlines}>i like <TextTransition text={ likes[index % likes.length]} springConfig={ presets.stiff } inline={true}/>, too</p>
        </div>
    </React.Fragment>;

  return (
    <>{isMobile ? mobile : pc}</>
  );
}


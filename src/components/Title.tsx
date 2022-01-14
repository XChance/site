import React from 'react';
import { useState, useEffect } from 'react';
import {createUseStyles} from 'react-jss'
import TextTransition, { presets } from "react-text-transition";

const useStyles = createUseStyles({
    ptitle: {
      color: "white",
      fontSize: "10vw",
      position: "relative",
      letterSpacing: "0.3rem",
      textAlign: "center",
      top: "30vh",
      left: "22vw",
    },
    pdesc: {
      color: "white",
      fontSize: "2.2vw",
      lineHeight: "2",
      position: "relative",
      textAlign: "center",
      top: "29vh",
    },

    ltitle: {
      color: "white",
      fontSize: "8vw",
      position: "relative",
      letterSpacing: "0.3rem",
      textAlign: "center",
      top: "26vh",
      left: "28vw",
    },
    ldesc: {
      color: "white",
      fontSize: "1.8vw",
      lineHeight: "2",
      position: "relative",
      textAlign: "center",
      top: "24vh",
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
        top: "10vh",
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
      3500
    );
    return () => clearTimeout(intervalId);
  });

    const pc = <React.Fragment>
    <text className={isPortrait ? classes.ptitle : classes.ltitle}>xian chance</text>
    <p className={isPortrait ? classes.pdesc : classes.ldesc}>
    {age} year old jamaican software developer based in atlanta<br/>
    fan of web serials, vscode, and anything emergent<br/>
    i like <TextTransition text={ likes[index % likes.length]} springConfig={ presets.stiff } inline={true}/>, too
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


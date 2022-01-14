import React from "react";
import { createUseStyles } from "react-jss";
import { AiFillGithub, AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai';

const useStyles = createUseStyles({
    proot: {
        color: "black",
        fontSize: "8vw",
        position: "relative",
        letterSpacing: "0.3rem",
        top: "60vh",
        left: "10vw",
    },
    lroot: {
        color: "black",
        fontSize: "8vw",
        position: "relative",
        letterSpacing: "0.3 rem",
        top: "20vh",
        left: "30vw",
    },
    mroot: {
        color: "black",
        fontSize: "20vw",
        position: "relative",
        letterSpacing: "0.3 rem",
        top: "16vh",
        left: "16vw",
    },
    link: {
        padding: "1vw",
        textDecoration: "none",
        backgroundColor: "transparent",
        color: "white",
        transition: "all 0.3s ease",
        '&:hover': {
            color: "lightblue",
          },
    }
  });

type Props = {
    isPortrait: boolean,
    isMobile: boolean,
};

export default function Links( {isPortrait, isMobile}: Props ){
    const classes = useStyles();

    const pc = <div className={isPortrait ? classes.proot : classes.lroot}>
        <a href="https://github.com/XChance" className={classes.link}><AiFillGithub/></a>
        <a href="https://twitter.com/yancebert" className={classes.link}><AiFillTwitterCircle/></a>
        <a href="mailto: chance.saulter@gmail.com" className={classes.link}><AiOutlineMail/></a>
    </div>;

    const mobile = <div className={classes.mroot}>
        <a href="https://github.com/XChance" className={classes.link}><AiFillGithub/></a>
        <a href="https://twitter.com/yancebert" className={classes.link}><AiFillTwitterCircle/></a>
        <a href="mailto: chance.saulter@gmail.com" className={classes.link}><AiOutlineMail/></a>
    </div>;

    return(
        <>{isMobile ? mobile : pc}</>
    );
}
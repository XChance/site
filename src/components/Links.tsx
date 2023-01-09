import { createUseStyles } from "react-jss";
import { AiFillGithub, AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai';

const useStyles = createUseStyles({
    proot: {
        color: "black",
        fontSize: "4vw",
        position: "relative",
        letterSpacing: "0.3rem",
        textAlign: "center",
        top: "30vh",
    },
    lroot: {
        color: "black",
        fontSize: "3vw",
        position: "relative",
        letterSpacing: "0.3 rem",
        top: "20vh",
        textAlign: "center",
    },
    mroot: {
        padding: "5vw",
        color: "black",
        fontSize: "12vw",
        position: "relative",
        letterSpacing: "0.3 rem",
        top: "30vh",
        left: "22vw",
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
        <a href="mailto: chance@xchance.dev" className={classes.link}><AiOutlineMail/></a>
    </div>;

    const mobile = <div className={classes.mroot}>
        <a href="https://github.com/XChance" className={classes.link}><AiFillGithub/></a>
        <a href="https://twitter.com/yancebert" className={classes.link}><AiFillTwitterCircle/></a>
        <a href="mailto: chance@xchance.dev" className={classes.link}><AiOutlineMail/></a>
    </div>;

    return(
        <>{isMobile ? mobile : pc}</>
    );
}
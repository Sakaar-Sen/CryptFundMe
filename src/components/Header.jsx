import React, { useEffect } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from '../styles/header.module.css';

const Header = (props) => {

    useEffect(() => {
        if (props.activeNav === "create") {
            document.getElementById('create').style.color = "transparent";
            document.getElementById('create').style.webkitTextStroke = "1px white";
            document.getElementById('create').style.textShadow = "0px 0px 25px white";
            document.getElementById('create').style.fontWeight = "700";
            document.getElementById('create').style.scale = "115%";
            }
        
        else if (props.activeNav === "docs") {
            document.getElementById('docs').style.color = "transparent";
            document.getElementById('docs').style.webkitTextStroke = "1px white";
            document.getElementById('docs').style.textShadow = "0px 0px 25px white";
            document.getElementById('docs').style.fontWeight = "700";
            document.getElementById('docs').style.scale = "115%";        }
        else if(props.activeNav === "index"){
            document.getElementById('index').style.color = "transparent";
            document.getElementById('index').style.webkitTextStroke = "1px white";
            document.getElementById('index').style.textShadow = "0px 0px 25px white";
            document.getElementById('index').style.fontWeight = "700";
            document.getElementById('index').style.scale = "115%";        }
    }, []);

    return (
        <div>
            <div className={styles.leftSide}>
                <h1>CryptFund Me</h1>
            </div>

            <div className={styles.rightSide}>
                <a href='/' id='index'>Explore</a>
                <a href='create' id='create'>Create</a>
                <a href='docs' id='docs'>Docs</a>
                <ConnectWallet className={styles.connectBtn} accentColor="#f213a4" colorMode="dark" />
            </div>
            <h1 className={styles.hidden}>e</h1>
            {/* <div className={styles.nameOuter}>
                <h1 className={styles.name}>{props.name}</h1>
            </div> */}
        </div>
    );
}   

export default Header;

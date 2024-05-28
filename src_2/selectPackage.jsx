import React from "react";

function SelectPakage(p){

    let img;

    if(p.includes('瓶裝')){
        img = 'bottle'
    }else if(p.includes('盒裝')){
        img = 'pillbox'
    }else if(p.includes('罐裝')){
        img = 'jar'
    }else if(p.includes('袋裝')){
        img = 'bag'
    }else if(p.includes('片裝')){
       img = 'pill'
    }else if(p.includes('管裝')){
        img = 'tube'
    }else if(p.includes('安瓿')){
        img = 'ampoule'
    }else if(p.includes('玻璃容器裝')){
        img = 'glass'
    }else if(p.includes('鋼瓶')){
        img = 'cylinder'
    }else{
        img = 'other'
    }

    let src = `./img/p/${img}.png`

    return(
        <>
            <img src={src}></img>
        </>
    );
}

export default SelectPakage;


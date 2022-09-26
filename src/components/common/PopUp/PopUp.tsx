import React from "react";
import classes from './PopUp.module.css'
import classNames from "classnames";

type PropsTypes = {
    active: boolean,
    setActive: (set: boolean) => void,
    children: React.FC | React.DetailedHTMLProps<any, any>
}

const PopUp: React.FC<PropsTypes> = ({active, setActive, children}) => {

    return <div className={active ?
        classNames(classes.popUp, classes.active) :
        classes.popUp} onClick={() => setActive(false)}>

        <div className={active ?
            classNames(classes.popUpContent, classes.active) :
            classes.popUpContent}
             onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
}


export default PopUp
import React from "react";
import classes from './PopUp.module.css'
import classNames from "classnames";
import {Button} from "../FormsControls/FormsControls";

type PropsTypes = {
    active: boolean,
    setActive: (set: boolean) => void,
    text: string,
    setAnswer: (b: boolean) => void
}

const PopUpYesNo: React.FC<PropsTypes> = ({active, setActive, text, setAnswer}) => {

    const onClick = (answer: boolean) => {
        setAnswer(answer)
        setActive(false)
    }

    return <div className={active ?
        classNames(classes.popUp, classes.active) :
        classes.popUp}>
        <div className={active ?
            classNames(classes.popUpContent, classes.active) :
            classes.popUpContent}
             onClick={e => e.stopPropagation()}>
            <div className={classes.textWrap}>
                {text}
            </div>
            <div className={classes.flexSpace}>
                <div className={classes.buttonWrap}>
                    <Button type={"button"} text="YES" redColor={false} onClick={onClick} onClickValue={true}/>
                </div>
                <div className={classes.buttonWrap}>
                    <Button type={"button"} text="NO" redColor={true} onClick={onClick} onClickValue={false}/>
                </div>
            </div>
        </div>
    </div>
}


export default PopUpYesNo
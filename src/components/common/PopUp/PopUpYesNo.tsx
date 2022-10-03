import React from "react";
import classes from './PopUp.module.css'
import classNames from "classnames";
import {createPortal} from "react-dom";
import Button from "../Styled/Button/Button";

type PropsTypes = {
    active: boolean,
    setActive: (set: boolean) => void,
    text: string,
    setAnswer: (b: boolean) => void,
}

const PopUpYesNo: React.FC<PropsTypes> = ({active, setActive, text, setAnswer}) => {


    const onClickHandler = (answer: boolean) => {
        setAnswer(answer)
        setActive(false)
    }

    return createPortal(<div className={active ?
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
                            <Button type={'button'} bgColor={'green'} onClick={() => onClickHandler(true)}>
                                YES
                            </Button>

                        </div>

                        <div className={classes.buttonWrap}>

                            <Button type={'button'} bgColor={'red'} onClick={ () => onClickHandler(false)}>
                                NO
                            </Button>

                        </div>
                    </div>
            </div>
        </div>,
        document.body
    )
}


export default PopUpYesNo
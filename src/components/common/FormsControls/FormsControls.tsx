import React from "react";
import {Field, Form, Formik} from "formik";
import {InputNumberSchema} from "../../utils/Validators/Validators";
import classes from './FormsControls.module.css'

type PropsTypeInputNumber = {
    name: string,
    setValue: (value: any) => void,
    value: any,
    increment: () => void,
    decrement: () => void,
    placeholder: string
}

type PropsTypeButton = {
    type: "button" | "reset" | "submit" | undefined,
    text: string
}

export const InputNumber:React.FC<PropsTypeInputNumber> = ({name,setValue, value, increment, decrement, placeholder}) => {

    return <div className={classes.containerInputNumber}>
        <div className={classes.minus} onClick={decrement}><p>-</p></div>
        <input className={classes.inputNumber}
               name={name}
               value={value}
               onChange={setValue}
               type="text"
               pattern="^[0-9]+(.[0-9]+)?$"
               placeholder={placeholder}
               required/>
        <div className={classes.plus} onClick={increment}><p>+</p></div>
    </div>
}

export const Button: React.FC<PropsTypeButton> = ({type,text}) => {
    return <div>
        <button type={type}
                className={classes.btn}
        >{text}</button>
    </div>
}

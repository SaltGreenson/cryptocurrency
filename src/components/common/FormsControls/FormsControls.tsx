import React from "react";
import {Field, Form, Formik} from "formik";
import {InputNumberSchema} from "../../utils/Validators/Validators";
import classes from './FormsControls.module.css'

export const InputNumber:React.FC<any> = (props) => {
    return <Formik initialValues={{
    quantity: Math.pow(1, -8)}}
                   onSubmit={props.onSubmit}
                   validationSchema={InputNumberSchema}
                   render={({errors, touched}) =>  (
                       <Form className={classes.inputNumberContainer}>
                            <label  htmlFor="number"></label>
                           {/*TYT NUMBER POTOM PROVER'*/}
                           <Field name="quantity" type="number"/>
                           {errors.quantity &&
                           touched.quantity &&
                           <div className={classes.fieldError}>{errors.quantity}</div>
                           }
                       </Form>
                   )}
    />
}

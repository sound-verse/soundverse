import { ErrorMessage, Field } from 'formik'
import React from 'react'
import ValidationError from './ValidationError'
function Input(props) {
  const { label, name, ...rest } = props
  return (
    <div className="text-black inline-block">
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <br></br>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={ValidationError} />
    </div>
  )
}

export default Input

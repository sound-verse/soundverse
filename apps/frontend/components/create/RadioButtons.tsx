import { ErrorMessage, Field } from 'formik'
import React, { Fragment } from 'react'
import ValidationError from './ValidationError'

function RadioButtons(props) {
  const { label, name, options, ...rest } = props

  return (
    <div className="form-control">
      <label>{label}</label>
      <br></br>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            )
          })
        }}
      </Field>
    </div>
  )
}

export default RadioButtons

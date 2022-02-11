import React from 'react'
import styles from './Button.module.css'
import cn from 'classnames'

type ButtonProps = {
  type?: 'ghost' | 'normal' | 'purple' | 'disabled'
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

const Button = ({
  type = 'normal',
  text,
  onClick,
  className = '',
}: ButtonProps) => {
  const rootClassName = cn(
    styles.root,
    {
      [styles.normal]: type === 'normal',
      [styles.ghost]: type === 'ghost',
      [styles.purple]: type === 'purple',
      [styles.disabled]: type === 'disabled',
    },
    className
  )

  return (
    <button
      className={rootClassName}
      onClick={onClick && onClick}
      disabled={type === 'disabled' ? true : false}
    >
      {text}
    </button>
  )
}

export default Button

import cn from 'classnames'
import React, { FC } from 'react'

interface HeadingProps {
  className?: string
}

export const Heading: FC<HeadingProps> = ({ className, children }) => {
  const classNames = cn('text-white font-bold text-base', className)
  return <div className={classNames}>{children}</div>
}

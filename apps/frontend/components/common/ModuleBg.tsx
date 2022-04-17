import cn from 'classnames'
import React, { FC } from 'react'

interface ModuleBgProps {
  className?: string
}

export const ModuleBg: FC<ModuleBgProps> = ({ className, children }) => {
  const classNames = cn(
    'rounded-3xl bg-grey-dark w-full p-20 mx-auto mt-12 mb-36',
    className
  )
  return <div className={classNames}>{children}</div>
}

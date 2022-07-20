import cn from 'classnames'
import React, { FC } from 'react'
import styles from './ModuleBg.module.css'

interface ModuleBgProps {
  className?: string
}

export const ModuleBg: FC<ModuleBgProps> = ({ className, children }) => {
  const classNames = cn(styles.boxShadow, styles.moduleBg, className)
  return <div className={classNames}>{children}</div>
}

import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const Label: React.FC<Props> = ({ className, children }) => {
  return (
    <span className={clsx('text-gray-700 text-sm font-semibold', className)}>
      {children}
    </span>
  )
}

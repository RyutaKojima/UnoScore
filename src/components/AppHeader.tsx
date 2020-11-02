import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const AppHeader: React.FC<Props> = ({ className }) => {
  return (
    <header className={clsx('p-4 border-b', className)}>
      <h1 className="text-center">UNO Score</h1>
    </header>
  )
}

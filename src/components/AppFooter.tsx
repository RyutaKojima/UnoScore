import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const AppFooter: React.FC<Props> = ({ className }) => {
  return (
    <footer className={clsx('p-4 border-t', className)}>
      <p className="text-center">Powered by Ryuta Kojima</p>
    </footer>
  )
}

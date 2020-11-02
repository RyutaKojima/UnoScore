import React from 'react'
import clsx from 'clsx'

type Props = {
  title?: string
  className?: string
}

export const Section: React.FC<Props> = ({ title, className, children }) => {
  return (
    <section className={clsx('bg-white p-4 rounded-lg shadow-xl', className)}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </section>
  )
}

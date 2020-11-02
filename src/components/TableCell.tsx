import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const TableCell: React.FC<Props> = ({ className, children }) => {
  return <td className={clsx('px-2 py-1', className)}>{children}</td>
}

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  className?: string
}

export const AppHeader: React.FC<Props> = ({ className }) => {
  return (
    <header className={clsx('p-4', className)}>
      <div className="flex justify-center items-center space-x-4">
        <Image src="/img/draw4.png" width={25} height={40} className="shadow" />
        <h1 className="text-2xl font-bold italic text-gray-800">
          UNO Score!!!
        </h1>
      </div>
    </header>
  )
}

import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const AppFooter: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={clsx(
        'p-4 border-t flex justify-center items-center space-x-4',
        className
      )}
    >
      <p className="text-center">Powered by Ryuta Kojima</p>
      <a
        href={'https://github.com/RyutaKojima/UnoScore'}
        className="bg-black text-white text-sm font-semibold py-1 px-4 rounded-full"
      >
        GitHub
      </a>
    </footer>
  )
}

import React from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'

type Props = {
  isShow: boolean
  className?: string
}

export const BaseModal: React.FC<Props> = ({ isShow, className, children }) => {
  const container = process.browser ? document.querySelector('#__next') : null

  return container && isShow
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div
            className={clsx(
              'bg-white p-4 max-h-90vh w-full max-w-lg rounded-lg relative overflow-y-scroll',
              className
            )}
          >
            {children}
          </div>
          <style jsx>{`
            .max-h-90vh {
              max-height: 90vh;
            }
          `}</style>
        </div>,
        container
      )
    : null
}

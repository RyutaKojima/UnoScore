import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

type Props = {
  isShow: boolean
  className?: string
}

export const BaseModal: React.FC<Props> = ({ isShow, className, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalRef.current) return

    if (isShow) {
      disableBodyScroll(modalRef.current)
    } else {
      enableBodyScroll(modalRef.current)
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [isShow])

  const container = process.browser ? document.querySelector('#__next') : null

  return container && isShow
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div
            ref={modalRef}
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

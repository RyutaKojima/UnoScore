import React from 'react'
import clsx from 'clsx'

type Props = {
  label?: string
  className?: string
  onReset: () => void
}

export const ResetGameButton: React.FC<Props> = ({
  label = 'リセット',
  className,
  onReset,
}) => {
  const handleOnClick = async () => {
    const result = confirm('ゲームをリセットしますか？')
    if (result) {
      onReset()
    }
  }

  return (
    <button
      className={clsx('btn bg-gray-800 text-white', className)}
      onClick={handleOnClick}
    >
      {label}
    </button>
  )
}

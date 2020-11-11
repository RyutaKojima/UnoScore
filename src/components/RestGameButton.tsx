import React, { useState } from 'react'
import clsx from 'clsx'
import { initializeDatabase } from '../plugins/firebase'

type Props = {
  label?: string
  className?: string
}

export const ResetGameButton: React.FC<Props> = ({
  label = 'リセット',
  className,
}) => {
  const [loading, setLoading] = useState(false)

  const handleOnClick = async () => {
    const result = confirm('ゲームをリセットしますか？')
    if (result) {
      setLoading(true)
      await initializeDatabase()
      setLoading(false)
    }
  }

  return (
    <button
      className={clsx('btn bg-gray-800 text-white', className)}
      disabled={loading}
      onClick={handleOnClick}
    >
      {label}
    </button>
  )
}

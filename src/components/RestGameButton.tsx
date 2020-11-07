import React from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { gameSlice } from '../store/game'

type Props = {
  label?: string
  className?: string
}

export const ResetGameButton: React.FC<Props> = ({
  label = 'リセット',
  className,
}) => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    const result = confirm('ゲームをリセットしますか？')
    if (result) {
      dispatch(gameSlice.actions.initialize())
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

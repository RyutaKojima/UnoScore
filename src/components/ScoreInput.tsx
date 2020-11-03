import React, { ChangeEvent, useState } from 'react'
import clsx from 'clsx'
import { SelectCardModal } from './SelectCardModal'

type Props = {
  id: string
  isSelectCardMode: boolean
  value: number
  onChange: (score: number) => void
  className?: string
}

export const ScoreInput: React.FC<Props> = ({
  id,
  isSelectCardMode,
  value,
  onChange,
  className,
}) => {
  const [displayModal, setDisplayModal] = useState(false)

  const openScoreModal = () => {
    setDisplayModal(true)
  }

  const closeScoreModal = () => {
    setDisplayModal(false)
  }

  const handleOnFocus = () => {
    if (isSelectCardMode) {
      openScoreModal()
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputScore = parseInt(event.target.value, 10)
    onChange(inputScore)
  }

  const handleOnDone = (score: number) => {
    onChange(score)
    closeScoreModal()
  }

  return (
    <>
      <input
        id={id}
        type="number"
        value={value}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        className={clsx(className)}
      />
      <SelectCardModal
        id={id}
        isShow={displayModal}
        onDone={handleOnDone}
        onClose={closeScoreModal}
      />
    </>
  )
}

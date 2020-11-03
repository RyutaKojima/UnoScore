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
  const [displayScoreModal, setDisplayScoreModal] = useState(false)

  const openDisplayScoreModal = () => {
    setDisplayScoreModal(true)
  }

  const closeDisplayScoreModal = () => {
    setDisplayScoreModal(false)
  }

  const handleOnFocus = () => {
    if (isSelectCardMode) {
      openDisplayScoreModal()
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputScore = parseInt(event.target.value, 10)
    onChange(inputScore)
  }

  const handleOnDone = (score: number) => {
    onChange(score)
    closeDisplayScoreModal()
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
        isShow={displayScoreModal}
        onDone={handleOnDone}
        onClose={closeDisplayScoreModal}
      />
    </>
  )
}

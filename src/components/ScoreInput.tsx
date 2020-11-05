import React, { ChangeEvent, useRef, useState } from 'react'
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
  const [isFocus, setIsFocus] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const openScoreModal = () => {
    setDisplayModal(true)
  }

  const closeScoreModal = () => {
    setDisplayModal(false)
  }

  const handleOnFocus = () => {
    setIsFocus(true)
    if (isSelectCardMode) {
      inputRef.current.blur()
      openScoreModal()
    }
  }

  const handleOnBlur = () => {
    setIsFocus(false)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputScore = parseInt(event.target.value, 10)
    onChange(inputScore)
  }

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        type="number"
        value={isFocus && !value ? '' : value}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        className={clsx(className)}
      />
      <SelectCardModal
        id={id}
        isShow={displayModal}
        onChange={onChange}
        onClose={closeScoreModal}
      />
    </>
  )
}

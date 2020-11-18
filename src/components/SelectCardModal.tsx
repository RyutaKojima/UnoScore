import React, { useEffect, useRef, useState } from 'react'
import { CARDS } from '../constants/cards'
import Image from 'next/image'
import { ICard } from '../interfaces/card'
import { CloseCircleIcon } from './icons/CloseCircleIcon'
import { SelectedCardList } from './SelectedCardList'
import { BaseModal } from './BaseModal'

type Props = {
  id: string
  isShow?: boolean
  onChange: (score: number) => void
  onClose: () => void
}

export const SelectCardModal: React.FC<Props> = ({
  id,
  isShow,
  onChange,
  onClose,
}) => {
  const [selectedCards, setSelectedCards] = useState<ICard[]>([])

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      const score = selectedCards
        .map((card) => card.score)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        )

      onChange(score)
    }
  }, [selectedCards])

  const handleOnClickCard = (selectedCard: ICard) => {
    setSelectedCards([selectedCard, ...selectedCards])
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <BaseModal isShow={isShow}>
      <div className="absolute top-0 right-0 p-4">
        <button onClick={handleClose}>
          <CloseCircleIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <SelectedCardList
        id={id}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        className="p-2 border-b"
      />

      <div className="flex flex-wrap justify-center items-center">
        {CARDS.map((card) => (
          <div
            key={`card-${card.imgSrc}-${id}`}
            className="p-2 w-1/4 md:w-auto cursor-pointer"
            onClick={() => handleOnClickCard(card)}
          >
            <Image src={card.imgSrc} width={86} height={133} />
          </div>
        ))}
      </div>
    </BaseModal>
  )
}

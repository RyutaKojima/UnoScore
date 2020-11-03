import React, { useState } from 'react'
import { CARDS } from '../constants/cards'
import Image from 'next/image'
import { ICard } from '../interfaces/card'
import { CloseCircleIcon } from './icons/CloseCircleIcon'
import { SelectedCardList } from './SelectedCardList'

type Props = {
  id: string
  isShow?: boolean
  onDone: (score: number) => void
  onClose: () => void
}

export const SelectCardModal: React.FC<Props> = ({
  id,
  isShow,
  onDone,
  onClose,
}) => {
  const [selectedCards, setSelectedCards] = useState<ICard[]>([])

  const handleOnClickCard = (selectedCard: ICard) => {
    setSelectedCards([...selectedCards, selectedCard])
  }

  const handleClose = () => {
    setSelectedCards([])
    onClose()
  }

  const handleOnDone = () => {
    const score = selectedCards
      .map((card) => card.score)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    onDone(score)
  }

  return isShow ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 max-h-90vh w-full max-w-lg rounded-lg relative overflow-y-scroll">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={handleClose}>
            <CloseCircleIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <SelectedCardList
          id={id}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          onDone={handleOnDone}
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
      </div>
      <style jsx>{`
        .max-h-90vh {
          max-height: 90vh;
        }
      `}</style>
    </div>
  ) : null
}

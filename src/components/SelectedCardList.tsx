import React from 'react'
import { Label } from './Label'
import Image from 'next/image'
import { ICard } from '../interfaces/card'
import clsx from 'clsx'
import { UndoIcon } from './icons/UndoIcon'

type Props = {
  id: string
  selectedCards: ICard[]
  setSelectedCards: (cards: ICard[]) => void
  className?: string
}

export const SelectedCardList: React.FC<Props> = ({
  id,
  selectedCards,
  setSelectedCards,
  className,
}) => {
  const handleRemoveCard = (targetIndex) => {
    const filteredCards = selectedCards.filter(
      (_, index) => index !== targetIndex
    )
    setSelectedCards(filteredCards)
  }

  const handleUndo = () => {
    const slicedCards = selectedCards.slice(1, selectedCards.length)
    setSelectedCards(slicedCards)
  }

  return (
    <div className={clsx(className)}>
      <Label>選択済みのカード</Label>
      <div className="flex items-center mt-1">
        <div className="flex-1 flex items-center overflow-x-scroll space-x-2 h-20">
          {selectedCards.map((card, index) => (
            <div
              key={`selected-card-${card.imgSrc}-${index}-${id}`}
              className="cursor-pointer"
              onClick={() => handleRemoveCard(index)}
            >
              <Image src={card.imgSrc} width={43} height={66.5} />
            </div>
          ))}
        </div>
        {!!selectedCards.length && (
          <div className="ml-3">
            <button
              onClick={handleUndo}
              className="p-2 rounded-full bg-gray-300 fill-current text-gray-600 focus:outline-none"
            >
              <UndoIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

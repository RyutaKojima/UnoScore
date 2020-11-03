import React from 'react'
import { Label } from './Label'
import Image from 'next/image'
import { ICard } from '../interfaces/card'
import clsx from 'clsx'

type Props = {
  id: string
  selectedCards: ICard[]
  setSelectedCards: (cards: ICard[]) => void
  onDone: () => void
  className?: string
}

export const SelectedCardList: React.FC<Props> = ({
  id,
  selectedCards,
  setSelectedCards,
  onDone,
  className,
}) => {
  const handleRemoveCard = (targetIndex) => {
    const filteredCards = selectedCards.filter(
      (_, index) => index !== targetIndex
    )
    setSelectedCards(filteredCards)
  }

  const handleUndo = () => {
    const filteredCards = selectedCards.filter(
      (_, index) => index !== selectedCards.length - 1
    )
    setSelectedCards(filteredCards)
  }

  return (
    <div className={clsx(className)}>
      <Label>選択済みのカード</Label>
      <div className="flex items-center mt-1">
        <div className="flex-1 flex items-center overflow-x-scroll space-x-2">
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
        <div className="space-y-2 ml-2">
          <button
            onClick={onDone}
            className="py-1 text-xs rounded font-bold w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white"
          >
            確定
          </button>
          <button
            onClick={handleUndo}
            className="py-1 text-xs rounded font-bold w-full bg-gray-600 text-white"
          >
            戻す
          </button>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { CARDS } from '../constants/cards'
import Image from 'next/image'
import { ICard } from '../interfaces/card'
import { CloseCircleIcon } from './icons/CloseCircleIcon'
import { SelectedCardList } from './SelectedCardList'
import { BaseModal } from './BaseModal'

declare const webkitSpeechRecognition: typeof SpeechRecognition
declare const webkitSpeechGrammarList: typeof SpeechGrammarList

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
  const [recognition] = useState(new webkitSpeechRecognition())
  const [selectedCards, setSelectedCards] = useState<ICard[]>([])

  const [isRecording, setIsRecording] = useState(false)
  const isFirstRender = useRef(false)

  // 音声入力
  useEffect(() => {
    const grammar = '#JSGF V1.0; grammar cards; public = ドローフォー | ドローツー'
    const speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1)
    recognition.lang = 'ja'
    recognition.grammars = speechRecognitionList
    recognition.onresult = (event) => {
      setIsRecording(false)
      const voiceInput: string = event.results[0][0].transcript

      console.log(voiceInput)

      const nowSelecedCards: ICard[] = []

      let inputBuffer = voiceInput
      while(inputBuffer) {
        const beforeLength = inputBuffer.length
        CARDS.forEach((card) => {
          const candidateNames = [card.name, ...(card.fallbackList ?? [])]

          candidateNames.forEach((name) => {
            const index = inputBuffer.indexOf(name)
            if (index === 0) {
              nowSelecedCards.push(card)
              inputBuffer = inputBuffer.substr(name.length)
            }
          })
        })

        if (beforeLength === inputBuffer.length) {
          inputBuffer = inputBuffer.substr(1)
        }
      }

      // 今入力したカードを読み上げ
      const speechText = nowSelecedCards.map((card) => card.name).join(', ')
      const utterance = new SpeechSynthesisUtterance(speechText)
      utterance.lang = 'ja'
      speechSynthesis.speak(utterance)

      setSelectedCards([...nowSelecedCards, ...selectedCards])
    }
  }, [selectedCards])

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

  const handleRecordStart = () => {
    recognition.start();
    setIsRecording(true)
  }

  const handleSpeech = () => {
    const speechText = selectedCards.map((card) => card.name).join(', ')
    const utterance = new SpeechSynthesisUtterance(speechText)
    utterance.lang = 'ja'
    speechSynthesis.speak(utterance)
  }

  const handleOnClickCard = (selectedCard: ICard) => {
    setSelectedCards([selectedCard, ...selectedCards])
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <BaseModal isShow={!!isShow}>
      <div>
        <button type="button" disabled={isRecording} onClick={handleRecordStart}>音声入力</button>
        <button type="button" onClick={handleSpeech}>読み上げ</button>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={handleClose}>
            <CloseCircleIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
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

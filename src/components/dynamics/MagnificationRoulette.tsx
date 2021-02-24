import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types'
import { IOption } from '../../interfaces/option'
import { MAGNIFICATIONS } from '../../constants/magnifications'
import { sum } from '../../utils/utils'

type DataItem = WheelData & {
  weight: number
}

const data: DataItem[] = [
  {
    option: MAGNIFICATIONS.single.label,
    weight: 3,
    style: { backgroundColor: '#4FD1C5', textColor: 'white' },
  },
  {
    option: MAGNIFICATIONS.double.label,
    weight: 7,
    style: { backgroundColor: '#00BCD6', textColor: 'white' },
  },
  {
    option: MAGNIFICATIONS.triple.label,
    weight: 10,
    style: { backgroundColor: '#00A2DF', textColor: 'white' },
  },
  {
    option: MAGNIFICATIONS.quadruple.label,
    weight: 5,
    style: { backgroundColor: '#4F83D4', textColor: 'white' },
  },
  {
    option: MAGNIFICATIONS.quintuple.label,
    weight: 1,
    style: { backgroundColor: '#855FB2', textColor: 'white' },
  },
]

type Props = {
  option: IOption
  setOption: (option: IOption) => void
}

export const MagnificationRoulette: React.VFC<Props> = ({
  option,
  setOption,
}) => {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const onStartSpin = () => {
    const weightedValues = data.flatMap((item) =>
      Array(item.weight).fill(item.option)
    )
    const pickedIndex = Math.floor(Math.random() * weightedValues.length)
    const pickedValue = weightedValues[pickedIndex]
    const newPrizeNumber = data.findIndex((v) => v.option === pickedValue)

    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const onStopSpin = () => {
    const pickedLabel = data[prizeNumber].option
    const magnification =
      Object.values(MAGNIFICATIONS).find((mag) => mag.label === pickedLabel)
        ?.value ?? 0

    setMustSpin(false)
    alert(`今回の倍率は「${pickedLabel}」です！`)
    setOption({ ...option, magnification })
  }

  const getProbability = (item: DataItem) => {
    const totalWeight = sum(data.map((v) => v.weight))
    return Math.round((item.weight / totalWeight) * 100)
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="border-2 ml-auto py-2 px-4 rounded">
        {data.map((item, index) => (
          <p key={`display-probability-${index}`} className="text-sm font-bold">
            <span className="text-gray-700">{item.option}:</span>
            <span className="text-gray-900 ml-2">{getProbability(item)}%</span>
          </p>
        ))}
      </div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpin}
        outerBorderColor="#edf2f7"
        innerBorderColor="#edf2f7"
        radiusLineColor="#edf2f7"
        fontSize={40}
      />
      <button
        disabled={mustSpin}
        className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white disabled:opacity-50 mt-4"
        onClick={onStartSpin}
      >
        SPIN
      </button>
    </div>
  )
}

export default MagnificationRoulette

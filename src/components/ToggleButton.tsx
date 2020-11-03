import React from 'react'
import { Label } from './Label'
import clsx from 'clsx'

type Props = {
  value: boolean
  setValue: (value: boolean) => void
  label?: string
}

export const ToggleButton: React.FC<Props> = ({ value, setValue, label }) => {
  const toggle = () => {
    setValue(!value)
  }

  return (
    <div>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={toggle}
            className={clsx(
              'absolute block w-6 h-6 rounded-full bg-white border-4 transition duration-200 ease-in appearance-none cursor-pointer focus:outline-none',
              {
                'right-0 border-teal-400': value,
                'left-0': !value,
              }
            )}
          />
          <span
            className={clsx(
              'block overflow-hidden h-6 rounded-full cursor-pointer transition duration-200 ease-in',
              {
                'bg-teal-400': value,
                'bg-gray-300': !value,
              }
            )}
          />
        </label>
      </div>
      {label && <Label className="text-xs text-gray-700">{label}</Label>}
    </div>
  )
}

import React, { FormEvent, useState } from 'react'
import { Label } from './Label'

type Props = {
  onAppended: (name: string) => void
}

export const UserAppendForm = (props: Props): JSX.Element => {
  const [name, setName] = useState('')

  const textInputRef = React.createRef<HTMLInputElement>()

  const focusText = (): void => {
    textInputRef.current.focus()
  }

  const clearName = (): void => {
    setName('')
  }

  const handleOnSubmit: (event: FormEvent) => void = (event): void => {
    event.preventDefault()

    props.onAppended(name)
    clearName()
    focusText()
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label className="block">
        <Label>ユーザー追加</Label>
        <div className="flex mt-1">
          <input
            type="text"
            value={name}
            ref={textInputRef}
            className="form-input block w-full"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white ml-4"
          >
            add
          </button>
        </div>
      </label>
    </form>
  )
}

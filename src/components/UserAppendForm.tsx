import React, { useState } from 'react'
import { Label } from './Label'

type Props = {
  onAppended: (name: string) => void
}

export const UserAppendForm = (props: Props): JSX.Element => {
  const [name, setName] = useState('')

  const clearName = (): void => {
    setName('')
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.onAppended(name)
        clearName()
      }}
    >
      <label className="block">
        <Label>ユーザー追加</Label>
        <div className="flex mt-1">
          <input
            type="text"
            value={name}
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

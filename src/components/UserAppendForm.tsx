import React, { useState } from 'react'

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
      <label>ユーザー追加</label>
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
        }}
      />
      <button type="submit">add</button>
    </form>
  )
}

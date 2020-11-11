import { IOption } from '../interfaces/option'
import { useEffect, useState } from 'react'
import { optionRef } from '../plugins/firebase'

export const initialState: IOption = {
  rescueSecond: true,
  rescueThird: false,
  magnification: 1,
}

export const useOption = (): [IOption, (option: IOption) => void] => {
  const [option, setOption] = useState<IOption>(initialState)

  useEffect(() => {
    optionRef.on('value', (snapshot) => {
      setOption(snapshot.val() ?? initialState)
    })

    return () => {
      optionRef.off()
    }
  }, [])

  const updateDatabase = async (newOption: IOption) => {
    await optionRef.set(newOption)
  }

  return [option, updateDatabase]
}

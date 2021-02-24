import React from 'react'
import { Spinner } from './Spinner'

type Props = {
  loading: boolean
}

export const AppLoader: React.VFC<Props> = ({ loading }) => {
  return loading ? (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
      <Spinner />
    </div>
  ) : null
}

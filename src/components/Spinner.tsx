import React from 'react'

export const Spinner: React.VFC = () => {
  return (
    <>
      <div className="loader animate-spin ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20" />
      <style jsx>{`
        .loader {
          border-top-color: #4fd1c5;
        }
      `}</style>
    </>
  )
}

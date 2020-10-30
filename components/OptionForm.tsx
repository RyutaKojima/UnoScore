import React from 'react'
import { Options } from '../pages'

type Props = {
  options: Options
  onChange: (newOptions: Options) => void
}

export const OptionForm = (props: Props): JSX.Element => (
  <div>
    <label>
      ２位免除
      <input
        type="checkbox"
        checked={props.options.rescueSecond}
        onChange={() => {
          props.onChange({
            ...props.options,
            rescueSecond: !props.options.rescueSecond,
          })
        }}
      />
    </label>

    <label>
      ３位免除
      <input
        type="checkbox"
        checked={props.options.rescueThird}
        onChange={() => {
          props.onChange({
            ...props.options,
            rescueThird: !props.options.rescueThird,
          })
        }}
      />
    </label>
  </div>
)

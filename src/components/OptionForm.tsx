import React from 'react'
import { Options } from '../pages'
import { Label } from './Label'

type Props = {
  options: Options
  onChange: (newOptions: Options) => void
}

export const OptionForm = (props: Props): JSX.Element => (
  <div className="space-x-3">
    <label className="inline-flex items-center">
      <Label className="mr-2">２位免除</Label>
      <input
        type="checkbox"
        checked={props.options.rescueSecond}
        onChange={() => {
          props.onChange({
            ...props.options,
            rescueSecond: !props.options.rescueSecond,
          })
        }}
        className="form-checkbox"
      />
    </label>

    <label className="inline-flex items-center">
      <Label className="mr-2">３位免除</Label>
      <input
        type="checkbox"
        checked={props.options.rescueThird}
        onChange={() => {
          props.onChange({
            ...props.options,
            rescueThird: !props.options.rescueThird,
          })
        }}
        className="form-checkbox"
      />
    </label>
  </div>
)

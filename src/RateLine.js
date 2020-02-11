import React from 'react'

import { formatValue, getRateLabel } from './core'
import { isLineStored } from './storage'
import ValueField from './ValueField'

const RateLine = ({ dispatch, onPersist, rate: line }) => {
  return (
    <tr>
      <td>
        <button
          className="cta persistor"
          onClick={() => onPersist(line)}
          {...(isLineStored(line) ? { disabled: true } : {})}
        >
          <span role="img" aria-label="Se souvenir de cette ligne">
            +
          </span>
        </button>
      </td>
      {['net', 'vat', 'gross'].map((kind) => (
        <td>
          <ValueField
            onChange={(value) =>
              dispatch({
                type: `SET_${kind.toUpperCase()}`,
                payload: { rate: line.rate, value },
              })
            }
            value={line[kind]}
          />
           €
        </td>
      ))}
      <td className="rateInfo">
        à <strong>{formatValue(line.rate)} %</strong> ({getRateLabel(line.rate)}
        )
      </td>
    </tr>
  )
}

export default RateLine

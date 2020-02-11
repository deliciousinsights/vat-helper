import React from 'react'

import { formatValue } from './core'
import RateHeader from './RateHeader'

const UsualSuspects = ({ lines, onForget }) => {
  if (lines.length === 0) return null

  return (
    <div>
      <h2>Les grands classiques…</h2>
      <table className="persistedRates">
        <RateHeader />
        <tbody>
          {lines.map(({ rate, net, vat, gross }, index) => (
            <tr key={`${rate}-${net}`}>
              <td>
                <button
                  className="cta forgetter"
                  onClick={() => onForget(index)}
                >
                  <span role="img" aria-label="Oublier cette ligne">
                    &times;
                  </span>
                </button>
              </td>
              <td>{formatValue(net)} € +</td>
              <td>{formatValue(vat)} € =</td>
              <td>{formatValue(gross)} €</td>
              <td className="rateInfo">
                à <strong>{formatValue(rate)} %</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsualSuspects

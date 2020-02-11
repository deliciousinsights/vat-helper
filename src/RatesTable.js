import React from 'react'

import { formatValue } from './core'
import RateHeader from './RateHeader'
import RateLine from './RateLine'

function RatesTable({ rates, dispatch, persistRate }) {
  const totals = rates[rates.length - 1]
  return (
    <div>
      <h2>Saisissez vos valeurs…</h2>
      <table className="rates">
        <RateHeader />
        <tbody>
          {rates.map((line) =>
            line.rate ? (
              <RateLine
                dispatch={dispatch}
                key={line.rate}
                onPersist={persistRate}
                rate={line}
              />
            ) : null
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>{formatValue(totals.net)} €</th>
            <th>{formatValue(totals.vat)} €</th>
            <th>{formatValue(totals.gross)} €</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default RatesTable

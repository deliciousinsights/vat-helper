import React, { useReducer, useState } from 'react'

import { formatValue, RATE_GROUPS } from './core'
import RateHeader from './RateHeader'
import RateLine from './RateLine'
import { VAT_RATES } from './core'

function RatesTable({ persistRate }) {
  const [allRates, dispatch] = useReducer(reduceRates, DEFAULT_RATES)
  const [rateGroup, setRateGroup] = useState(RATE_GROUPS.default)
  const rates = filterRates(rateGroup)
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

      <p>
        <label>
          Taux à afficher :
          <select
            onChange={(e) => setRateGroup(e.target.value)}
            value={rateGroup}
          >
            {RATE_GROUPS.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </p>
    </div>
  )

  function filterRates(rateGroup) {
    const { rates } = RATE_GROUPS.find(({ name }) => name === rateGroup)
    return allRates.filter(({ rate }) => rates.includes(rate) || rate == null)
  }
}

const DEFAULT_RATES = VAT_RATES.map(({ rate }) => ({
  rate,
  net: 0,
  vat: 0,
  gross: 0,
})).concat([{ net: 0, vat: 0, gross: 0 }])

function recomputeTotals(rates) {
  const totals = rates[rates.length - 1]
  totals.net = totals.vat = totals.gross = 0
  for (const { net, vat, gross } of rates.slice(0, -1)) {
    totals.net += net
    totals.vat += vat
    totals.gross += gross
  }
  // We're only called when some update happened, so by returning a new array we
  // ensure `useReducer` will trigger a new render.
  return [...rates]
}

function reduceRates(rates, { type, payload: { rate, value } }) {
  const line = rates.find(({ rate: r }) => r === rate)
  if (!line) {
    console.warn(`Unknown rate: ${rate}`)
    return rates
  }
  switch (type) {
    case 'SET_NET':
      line.net = value
      line.vat = Math.round((line.net * line.rate) / 100_00.0)
      line.gross = line.net + line.vat
      return recomputeTotals(rates)
    case 'SET_VAT':
      line.vat = value
      line.net = Math.round((value / line.rate) * 100_00.0)
      line.gross = line.net + line.vat
      return recomputeTotals(rates)
    case 'SET_GROSS':
      line.gross = value
      line.net = Math.round(value / (1 + line.rate / 100_00.0))
      line.vat = line.gross - line.net
      return recomputeTotals(rates)
    default:
      return rates
  }
}

export default RatesTable

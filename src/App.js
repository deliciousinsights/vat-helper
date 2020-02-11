import React, { useReducer, useState } from 'react'

import { forgetLine, getLines, persistLine } from './storage'
import RatesTable from './RatesTable'
import UsualSuspects from './UsualSuspects'
import { VAT_RATES } from './core'

import './App.css'

const App = () => {
  const [rates, dispatch] = useReducer(reduceRates, DEFAULT_RATES)
  const [lines, setLines] = useState(getLines)
  return (
    <div className="app">
      <h1>Assistant TVA</h1>

      <div className="container">
        <RatesTable
          rates={rates}
          dispatch={dispatch}
          persistRate={persistRate}
        />
        <UsualSuspects lines={lines} onForget={forgetRate} />
      </div>
    </div>
  )

  function forgetRate(index) {
    forgetLine(index)
    setLines(getLines())
  }

  function persistRate(line) {
    persistLine({ ...line })
    setLines(getLines())
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

export default App

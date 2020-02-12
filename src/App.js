import React, { useState } from 'react'

import { forgetLine, getLines, persistLine } from './storage'
import RatesTable from './RatesTable'
import UsualSuspects from './UsualSuspects'

import './App.css'

const App = () => {
  const [lines, setLines] = useState(getLines)
  return (
    <div className="app">
      <h1>Assistant TVA</h1>

      <div className="container">
        <RatesTable persistRate={persistRate} />
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

export default App

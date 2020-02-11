import React, { useState } from 'react'

import { formatValue } from './core'

const ValueField = ({ onChange, value }) => {
  const [isActive, setActive] = useState(false)
  return (
    <input
      className="valueField"
      onChange={(e) => onChange(cleanupValue(e.target.value))}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      type="number"
      min="0"
      step="0.01"
      value={
        isActive ? String(value / 100) : formatValue(value).replace(',', '.')
      }
    />
  )
}

function cleanupValue(text) {
  return Math.round(
    Number(
      String(text)
        .replace(',', '.')
        .replace(/[^\d.]/g, '') * 100
    )
  )
}

export default ValueField

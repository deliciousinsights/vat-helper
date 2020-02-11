import React from 'react'

const RateHeader = () => (
  <thead>
    <tr>
      <th></th>
      <th>
        <abbr title="Hors Taxes">HT</abbr>
      </th>
      <th>
        <abbr title="Taxe sur la Valeur Ajoutée">TVA</abbr>
      </th>
      <th>
        <abbr title="Toutes Taxes Comprises">TTC</abbr>
      </th>
      <th className="rateInfo">Taux appliqué</th>
    </tr>
  </thead>
)

export default RateHeader

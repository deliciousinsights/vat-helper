export const VAT_RATES = [
  { rate: 20_00, name: 'Taux normal métropolitain' },
  { rate: 10_00, name: 'Taux intermédiaire métropolitain' },
  { rate: 5_50, name: 'Taux réduit métropolitain' },
  { rate: 13_00, name: 'Taux intermédiaire Corse (produits pétroliers)' },
  { rate: 8_50, name: 'Taux normal outre-mer' },
  { rate: 2_10, name: 'Taux particulier métropolitain / réduit outre-mer' },
  { rate: 1_75, name: 'Taux particulier outre-mer' },
  { rate: 1_05, name: 'Taux particulier outre-mer' },
  { rate: 90, name: 'Taux particulier Corse' },
  { rate: 0, name: 'Franchise en base' },
]

export const RATE_GROUPS = [
  { name: 'Taux usuels français', rates: [20_00, 10_00, 5_50] },
  { name: 'Tous les taux', rates: VAT_RATES.map(({ rate }) => rate) },
]
RATE_GROUPS.default = RATE_GROUPS[0].name

export function formatValue(centiles) {
  const cents = centiles % 100
  return cents > 0
    ? (centiles / 100).toFixed(2).replace('.', ',')
    : String(centiles / 100)
}

export function getRateLabel(rate) {
  return VAT_RATES.find(({ rate: r }) => r === rate).name
}

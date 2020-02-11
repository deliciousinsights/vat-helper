const STORE_KEY = '@@vat-helper/usual-suspects'
let store = []

function compareProperties(a, b) {
  const keys = Object.keys(a)
  return keys.length === Object.keys(b).length
    ? keys.every((key) => a[key] === b[key])
    : false
}

export function forgetLine(index) {
  store.splice(index, 1)
  persist()
}

export function getLines() {
  return [...store]
}

export function isLineStored(line) {
  return store.find((l) => compareProperties(line, l))
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify(store))
}

export function persistLine(line) {
  store.push(line)
  store.sort(({ gross: g1 }, { gross: g2 }) => g2 - g1)
  persist()
}

try {
  store = JSON.parse(localStorage.getItem(STORE_KEY) || [])
} catch (err) {
  console.error(err.message)
  store = []
}

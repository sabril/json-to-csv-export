const csvDownload = (data, name, delimiter, stringify) => {
  const items = data
  const filename = name || `export.csv`
  const d = delimiter || `,`
  const json_stringify = stringify

  const header = Array.from(
    new Set(items.reduce((r, e) => [...r, ...Object.keys(e)], []))
  )
  let csv = items.map(row => header.map(fieldName => json_stringify ? JSON.stringify(row[fieldName] || '') : (row[fieldName] || '')).join(d))
  csv.unshift(header.join(d))
  csv = csv.join('\r\n')

  const blob = new Blob([csv], {
    type: 'text/plain;charset=utf-8',
  })

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename)
    return
  }
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default csvDownload

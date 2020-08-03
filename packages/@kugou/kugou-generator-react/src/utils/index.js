const formatTime = duration => {
  const units = [60, 1]

  const values = []

  for (let unit of units) {
    const value = parseInt(duration / unit)
    const str = String(value).length === 1 ? `0${value}` : String(value)

    values.push(str)
    duration = duration - value * unit
  }

  return values.join(':')
}

export {
  formatTime,
}

export const dateFormat = unformatDate => {
  const date = new Date(unformatDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDay()

  const dateArr = [year, month, day]

  const notDate = dateArr.some(v => isNaN(v))

  if (notDate) {
    return unformatDate
  } else {
    return dateArr.join('-')
  }
}

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

export const timeDiff = unformatDate => {
  // 以前的时间
  const dateBefore = new Date(unformatDate)
  const yearBefore = dateBefore.getFullYear()
  const monthBefore = dateBefore.getMonth() + 1
  const dayBefore = dateBefore.getDate()
  const hoursBefore = dateBefore.getHours()
  const minuteBefore = dateBefore.getMinutes()
  // 现在的时间
  const dateNow = new Date(Date.now())
  const yearNow = dateNow.getFullYear()
  const monthNow = dateNow.getMonth() + 1
  const dayNow = dateNow.getDate()
  const hoursNow = dateNow.getHours()
  const minuteNow = dateNow.getMinutes()

  // 时间差
  const yearDiff = yearNow - yearBefore
  const monthDiff = monthNow - monthBefore
  const dayDiff = dayNow - dayBefore
  const hoursDiff = hoursNow - hoursBefore
  const minuteDiff = minuteNow - minuteBefore

  const cYear = yearDiff > 0 ? yearDiff + '年' : ''
  const cMonth = monthDiff > 0 ? monthDiff + '月' : ''
  const cDay = dayDiff > 0 ? dayDiff + '天' : ''
  const cHours = hoursDiff > 0 ? hoursDiff + '小时' : ''
  const cMinute = minuteDiff > 0 ? minuteDiff + '分钟' : ''

  const dateTxt = [cYear, cMonth, cDay, cHours, cMinute].find(txt => txt !== '')

  return dateTxt === undefined ? '刚刚' : dateTxt + '前'
}

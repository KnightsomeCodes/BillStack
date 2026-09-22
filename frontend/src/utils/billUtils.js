export function getToday() {
  const today = new Date()

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
}

export function parseBillDate(dateString) {
  if (!dateString) return null

  const [year, month, day] = dateString
    .split('-')
    .map(Number)

  return new Date(year, month - 1, day)
}

export function getWarrantyExpiry(bill) {
  if (!bill?.date || !bill?.warrantyMonths) {
    return null
  }

  const purchaseDate = parseBillDate(bill.date)

  if (!purchaseDate) return null

  const expiry = new Date(purchaseDate)

  expiry.setMonth(
    expiry.getMonth() + Number(bill.warrantyMonths)
  )

  return expiry
}

export function getReturnExpiry(bill) {
  if (!bill?.date || !bill?.returnDays) {
    return null
  }

  const purchaseDate = parseBillDate(bill.date)

  if (!purchaseDate) return null

  const expiry = new Date(purchaseDate)

  expiry.setDate(
    expiry.getDate() + Number(bill.returnDays)
  )

  return expiry
}

export function getDaysRemaining(date) {
  if (!date) return null

  const today = getToday()

  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )

  return Math.ceil(
    (target - today) / (1000 * 60 * 60 * 24)
  )
}

export function getWarrantyStatus(bill) {
  if (!bill?.warrantyMonths || bill.warrantyMonths <= 0) {
    return 'none'
  }

  const expiry = getWarrantyExpiry(bill)
  const daysRemaining = getDaysRemaining(expiry)

  if (daysRemaining < 0) {
    return 'expired'
  }

  if (daysRemaining <= 30) {
    return 'expiring'
  }

  return 'active'
}

export function getReturnStatus(bill) {
  if (!bill?.returnDays || bill.returnDays <= 0) {
    return 'none'
  }

  const expiry = getReturnExpiry(bill)
  const daysRemaining = getDaysRemaining(expiry)

  if (daysRemaining < 0) {
    return 'expired'
  }

  if (daysRemaining <= 3) {
    return 'expiring'
  }

  return 'active'
}

export function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

export function formatDate(dateString) {
  if (!dateString) return ''

  const date = parseBillDate(dateString)

  if (!date || Number.isNaN(date.getTime())) {
    return dateString
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getMonthKey(dateString) {
  const date = parseBillDate(dateString)

  if (!date) return null

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}`
}

export function getMonthLabel(monthKey) {
  if (!monthKey) return ''

  const [year, month] = monthKey
    .split('-')
    .map(Number)

  return new Date(
    year,
    month - 1,
    1
  ).toLocaleDateString('en-IN', {
    month: 'short',
  })
}
import {
  formatCurrency,
  formatDate,
  getWarrantyStatus,
  getWarrantyExpiry,
  getDaysRemaining,
} from '../utils/billUtils'

function BillCard({
  vendor,
  product,
  category,
  amount,
  date,
  onClick,
  statusBadge,
  warrantyMonths = null,
}) {
  let warrantyStatus = null
  let warrantyDays = null

  if (warrantyMonths !== null) {
    warrantyStatus = getWarrantyStatus({
      date,
      warrantyMonths,
    })

    const warrantyExpiry = getWarrantyExpiry({
      date,
      warrantyMonths,
    })

    warrantyDays = getDaysRemaining(warrantyExpiry)
  }

  return (
    <div
      className="bill"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="bill-info">
        <h3>{vendor}</h3>

        {product && (
          <p className="bill-product">{product}</p>
        )}

        <div className="bill-category">
          <span></span>
          <p>{category}</p>
        </div>

        <p className="bill-date">
          {formatDate(date)}
        </p>
      </div>

      <div className="bill-amount">
        <strong>
          {formatCurrency(amount)}
        </strong>

        {warrantyStatus === 'active' && (
          <span className="bill-status active">
            Warranty active
          </span>
        )}

        {warrantyStatus === 'expiring' && (
          <span className="bill-status warning">
            {warrantyDays} days left
          </span>
        )}

        {warrantyStatus === 'expired' && (
          <span className="bill-status expired">
            Warranty expired
          </span>
        )}

        {warrantyStatus === 'none' && (
          <span className="bill-status neutral">
            No warranty
          </span>
        )}

        {statusBadge && (
          <div className="bill-badge-container">
            {statusBadge}
          </div>
        )}
      </div>
    </div>
  )
}

export default BillCard
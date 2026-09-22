import {
  formatCurrency,
  formatDate,
  getWarrantyStatus,
  getWarrantyExpiry,
  getDaysRemaining,
} from '../utils/billUtils'

function BillCard({
  vendor,
  category,
  amount,
  date,
  warrantyMonths = 0,
}) {
  const warrantyStatus = getWarrantyStatus({
    date,
    warrantyMonths,
  })

  const warrantyExpiry = getWarrantyExpiry({
    date,
    warrantyMonths,
  })

  const warrantyDays = getDaysRemaining(warrantyExpiry)

  return (
    <div className="bill-card">

      <div className="bill-card-left">

        <div className="bill-vendor-icon">
          {vendor?.charAt(0)?.toUpperCase() || '?'}
        </div>

        <div className="bill-info">
          <h3>{vendor}</h3>

          <div className="bill-category">
            <span></span>
            <p>{category}</p>
          </div>

          <p className="bill-date">
            {formatDate(date)}
          </p>
        </div>

      </div>

      <div className="bill-card-right">

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

      </div>

    </div>
  )
}

export default BillCard
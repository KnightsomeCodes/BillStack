import {
  getReturnExpiry,
  getWarrantyExpiry,
  getDaysRemaining,
  formatDate,
} from '../utils/billUtils'

function Notifications({ bills = [] }) {
  const notifications = []

  bills.forEach((bill) => {

    // RETURN NOTIFICATIONS

    if (bill.returnDays > 0) {
      const returnExpiry = getReturnExpiry(bill)
      const daysRemaining = getDaysRemaining(returnExpiry)

      if (daysRemaining < 0) {
        notifications.push({
          id: `${bill.id}-return-expired`,
          type: 'expired',
          priority: 1,
          title: `${bill.vendor} - Return period expired`,
          message: `The ${bill.returnDays}-day return period ended on ${formatDate(
            bill.date
          )}.`,
        })
      } else if (daysRemaining <= 3) {
        notifications.push({
          id: `${bill.id}-return-warning`,
          type: 'warning',
          priority: 2,
          title: `${bill.vendor} - Return ending soon`,
          message:
            daysRemaining === 0
              ? 'Today is the last day to return this item.'
              : `${daysRemaining} day(s) remaining to return this item.`,
        })
      }
    }

    // WARRANTY NOTIFICATIONS

    if (bill.warrantyMonths > 0) {
      const warrantyExpiry = getWarrantyExpiry(bill)
      const daysRemaining = getDaysRemaining(warrantyExpiry)

      if (daysRemaining < 0) {
        notifications.push({
          id: `${bill.id}-warranty-expired`,
          type: 'expired',
          priority: 1,
          title: `${bill.vendor} - Warranty expired`,
          message: `The ${bill.warrantyMonths}-month warranty ended on ${formatDate(
            warrantyExpiry
              ? `${warrantyExpiry.getFullYear()}-${String(
                  warrantyExpiry.getMonth() + 1
                ).padStart(2, '0')}-${String(
                  warrantyExpiry.getDate()
                ).padStart(2, '0')}`
              : bill.date
          )}.`,
        })
      } else if (daysRemaining <= 30) {
        notifications.push({
          id: `${bill.id}-warranty-warning`,
          type: 'warning',
          priority: 2,
          title: `${bill.vendor} - Warranty ending soon`,
          message:
            daysRemaining === 0
              ? 'Warranty expires today.'
              : `${daysRemaining} day(s) remaining on the warranty.`,
        })
      }
    }
  })

  notifications.sort(
    (a, b) => a.priority - b.priority
  )

  return (
    <section className="notifications-section">

      <div className="notifications-header">

        <div>
          <p className="section-eyebrow">
            SMART REMINDERS
          </p>

          <h2>Notifications</h2>

          <p className="section-subtitle">
            Important return and warranty updates.
          </p>
        </div>

        <div className="notification-count">
          {notifications.length}
        </div>

      </div>

      <div className="notifications-list">

        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <div className="empty-notification-icon">
              ✓
            </div>

            <div>
              <h3>You're all caught up</h3>
              <p>
                No urgent warranty or return reminders right now.
              </p>
            </div>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              className={`notification-card ${notification.type}`}
              key={notification.id}
            >

              <div className="notification-icon">
                {notification.type === 'expired'
                  ? '!'
                  : '⚠'}
              </div>

              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>

              <span className="notification-arrow">
                →
              </span>

            </div>
          ))
        )}

      </div>

    </section>
  )
}

export default Notifications
import Notifications from './components/Notifications'
import ExpenseAnalytics from './components/ExpenseAnalytics'
import BillCard from './components/BillCard'
import {
  formatCurrency,
  formatDate,
  getWarrantyStatus,
  getWarrantyExpiry,
  getDaysRemaining,
} from './utils/billUtils'

function Dashboard({
  bills = [],
  onAddBillClick,
  onViewAllBills,
}) {

  const totalSpent = bills.reduce(
    (total, bill) =>
      total + Number(bill.amount || 0),
    0
  )

  const activeWarranties = bills.filter(
    (bill) =>
      getWarrantyStatus(bill) === 'active' ||
      getWarrantyStatus(bill) === 'expiring'
  ).length

  const warrantyAlerts = bills.filter(
    (bill) => {
      if (!bill.warrantyMonths) return false

      const expiry = getWarrantyExpiry(bill)
      const days = getDaysRemaining(expiry)

      return days !== null && days <= 30
    }
  )

  const recentBills = [...bills]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5)

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <p className="section-eyebrow">
            BILLSTACK
          </p>

          <h1>
            Your financial dashboard
          </h1>

          <p>
            Manage bills, warranties, returns and spending
            in one place.
          </p>
        </div>

        <button
          className="primary-add-button"
          onClick={onAddBillClick}
        >
          <span>+</span>
          Add Bill
        </button>

      </div>


      {/* STATS */}

      <div className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            #
          </div>

          <div>
            <p>Total Bills</p>
            <h2>{bills.length}</h2>
            <span>All saved purchases</span>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ₹
          </div>

          <div>
            <p>Total Spent</p>

            <h2>
              {formatCurrency(totalSpent)}
            </h2>

            <span>
              Across all purchases
            </span>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>
            <p>Active Warranties</p>

            <h2>
              {activeWarranties}
            </h2>

            <span>
              Currently protected
            </span>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            !
          </div>

          <div>
            <p>Warranty Alerts</p>

            <h2>
              {warrantyAlerts.length}
            </h2>

            <span>
              Need your attention
            </span>
          </div>

        </div>

      </div>


      {/* RECENT BILLS */}

      <section className="dashboard-section">

        <div className="section-heading-row">

          <div>
            <p className="section-eyebrow">
              PURCHASE HISTORY
            </p>

            <h2>Recent Bills</h2>

            <p>
              Your latest purchases.
            </p>
          </div>

          <button
            className="text-button"
            onClick={onViewAllBills}
          >
            View all →
          </button>

        </div>


        <div className="recent-bills-list">

          {recentBills.length === 0 ? (

            <div className="empty-state">
              <h3>No bills yet</h3>
              <p>
                Add your first bill to start tracking
                your spending.
              </p>
            </div>

          ) : (

            recentBills.map((bill) => (

              <BillCard
                key={bill.id}
                vendor={bill.vendor}
                category={bill.category}
                amount={bill.amount}
                date={bill.date}
                warrantyMonths={
                  bill.warrantyMonths
                }
              />

            ))

          )}

        </div>

      </section>


      {/* ANALYTICS */}

      <ExpenseAnalytics bills={bills} />


      {/* WARRANTY ALERTS */}

      <section className="dashboard-section">

        <div className="section-heading-row">

          <div>
            <p className="section-eyebrow">
              PROTECTION
            </p>

            <h2>
              Warranty & Return Alerts
            </h2>

            <p>
              Keep track of important purchase deadlines.
            </p>
          </div>

        </div>


        <div className="alerts-list">

          {bills
            .filter(
              (bill) =>
                bill.warrantyMonths > 0 ||
                bill.returnDays > 0
            )
            .slice(0, 6)
            .map((bill) => {

              const warrantyExpiry =
                getWarrantyExpiry(bill)

              const warrantyDays =
                getDaysRemaining(
                  warrantyExpiry
                )

              return (
                <div
                  className="alert-card"
                  key={bill.id}
                >

                  <div className="alert-left">

                    <div className="alert-vendor-icon">
                      {bill.vendor
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>

                      <h3>
                        {bill.vendor}
                      </h3>

                      <p>
                        {bill.category} •{' '}
                        {formatDate(bill.date)}
                      </p>

                    </div>

                  </div>


                  <div className="alert-details">

                    {bill.warrantyMonths > 0 && (
                      <span
                        className={
                          warrantyDays <= 30
                            ? 'alert-badge warning'
                            : 'alert-badge active'
                        }
                      >
                        {warrantyDays < 0
                          ? 'Warranty expired'
                          : warrantyDays <= 30
                          ? `${warrantyDays} days left`
                          : `${bill.warrantyMonths}-month warranty`}
                      </span>
                    )}

                    {bill.returnDays > 0 && (
                      <span className="alert-badge neutral">
                        {bill.returnDays}-day return
                      </span>
                    )}

                  </div>

                  <span className="alert-arrow">
                    →
                  </span>

                </div>
              )
            })}

        </div>

      </section>


      {/* SMART NOTIFICATIONS */}

      <Notifications bills={bills} />

    </div>
  )
}

export default Dashboard
import {
  formatCurrency,
  getMonthKey,
  getMonthLabel,
} from '../utils/billUtils'

function ExpenseAnalytics({ bills = [] }) {

  const totalSpent = bills.reduce(
    (sum, bill) => sum + Number(bill.amount || 0),
    0
  )

  const averageSpend =
    bills.length > 0
      ? totalSpent / bills.length
      : 0

  // MONTHLY DATA

  const monthlyMap = {}

  bills.forEach((bill) => {
    const key = getMonthKey(bill.date)

    if (!key) return

    monthlyMap[key] =
      (monthlyMap[key] || 0) +
      Number(bill.amount || 0)
  })

  const monthKeys = Object.keys(monthlyMap)
    .sort()
    .slice(-6)

  const monthlyData = monthKeys.map((key) => ({
    key,
    label: getMonthLabel(key),
    amount: monthlyMap[key],
  }))

  const maxMonthlyAmount = Math.max(
    ...monthlyData.map((item) => item.amount),
    1
  )

  // CATEGORY DATA

  const categoryMap = {}

  bills.forEach((bill) => {
    const category = bill.category || 'Other'

    categoryMap[category] =
      (categoryMap[category] || 0) +
      Number(bill.amount || 0)
  })

  const categoryData = Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)

  const maxCategoryAmount = Math.max(
    ...categoryData.map((item) => item.amount),
    1
  )

  const highestCategory =
    categoryData.length > 0
      ? categoryData[0]
      : null

  return (
    <section className="analytics-section">

      <div className="analytics-header">

        <div>
          <p className="section-eyebrow">
            SPENDING INSIGHTS
          </p>

          <h2>Monthly Expense Analytics</h2>

          <p className="section-subtitle">
            Understand where your money is going.
          </p>
        </div>

      </div>

      <div className="analytics-summary">

        <div className="analytics-mini-card">
          <span>Total spent</span>
          <strong>{formatCurrency(totalSpent)}</strong>
        </div>

        <div className="analytics-mini-card">
          <span>Average bill</span>
          <strong>{formatCurrency(averageSpend)}</strong>
        </div>

        <div className="analytics-mini-card">
          <span>Top category</span>
          <strong>
            {highestCategory
              ? highestCategory.category
              : '—'}
          </strong>
        </div>

      </div>

      <div className="charts-grid">

        {/* MONTHLY CHART */}

        <div className="chart-card">

          <div className="chart-card-header">
            <div>
              <h3>Monthly spending</h3>
              <p>
                Your spending over the last 6 active months.
              </p>
            </div>
          </div>

          {monthlyData.length === 0 ? (
            <div className="chart-empty">
              No spending data available.
            </div>
          ) : (
            <div className="monthly-chart">

              {monthlyData.map((item) => {

                const height =
                  (item.amount / maxMonthlyAmount) * 100

                return (
                  <div
                    className="bar-column"
                    key={item.key}
                  >

                    <span className="bar-value">
                      {formatCurrency(item.amount)}
                    </span>

                    <div className="bar-track">

                      <div
                        className="bar-fill"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <span className="bar-label">
                      {item.label}
                    </span>

                  </div>
                )
              })}

            </div>
          )}

        </div>

        {/* CATEGORY CHART */}

        <div className="chart-card">

          <div className="chart-card-header">
            <div>
              <h3>Spending by category</h3>
              <p>
                Categories where you spend the most.
              </p>
            </div>
          </div>

          <div className="category-chart">

            {categoryData.length === 0 ? (
              <div className="chart-empty">
                No category data available.
              </div>
            ) : (
              categoryData.map((item) => {

                const width =
                  (item.amount /
                    maxCategoryAmount) *
                  100

                return (
                  <div
                    className="category-row"
                    key={item.category}
                  >

                    <div className="category-row-top">
                      <span>
                        {item.category}
                      </span>

                      <strong>
                        {formatCurrency(item.amount)}
                      </strong>
                    </div>

                    <div className="category-track">

                      <div
                        className="category-fill"
                        style={{
                          width: `${width}%`,
                        }}
                      />

                    </div>

                  </div>
                )
              })
            )}

          </div>

        </div>

      </div>

    </section>
  )
}

export default ExpenseAnalytics
import { useState, useMemo } from 'react'

import MobileNav from './components/MobileNav'
import Header from './components/Header'
import BillCard from './components/BillCard'
import FilterBar from './components/FilterBar'
import BillDetailModal from './components/BillDetailModal'

import { mockBills } from './data/bills'
import { applyCategorization } from './utils/categorization'
import { enrichWarrantyInfo } from './utils/warranty'
import { enrichReturnInfo } from './utils/returns'

function App() {
  const [activePage, setActivePage] = useState('home')

  const [savedBills, setSavedBills] = useState(
    JSON.parse(localStorage.getItem('billstack-bills')) || []
  )

  const [search, setSearch] = useState('')

  const [filters, setFilters] = useState({
    category: 'All',
    amount: 'All',
    sort: 'Latest'
  })

  const [selectedBill, setSelectedBill] = useState(null)

  const processedBills = useMemo(() => {
    let bills = applyCategorization(mockBills)
    bills = bills.map(b => enrichWarrantyInfo(b))
    bills = bills.map(b => enrichReturnInfo(b))
    return bills
  }, [])

  const filteredBills = useMemo(() => {
    return processedBills
      .filter(bill => {
        const term = search.toLowerCase()

        if (
          term &&
          !bill.vendor.toLowerCase().includes(term) &&
          !bill.product.toLowerCase().includes(term) &&
          !bill.category.toLowerCase().includes(term)
        ) {
          return false
        }

        if (
          filters.category !== 'All' &&
          bill.category !== filters.category
        ) {
          return false
        }

        if (filters.amount === 'Below 1000' && bill.amount >= 1000) {
          return false
        }

        if (
          filters.amount === '1000-5000' &&
          (bill.amount < 1000 || bill.amount > 5000)
        ) {
          return false
        }

        if (filters.amount === 'Above 5000' && bill.amount <= 5000) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        const dateA = new Date(a.purchaseDate).getTime()
        const dateB = new Date(b.purchaseDate).getTime()

        return filters.sort === 'Latest'
          ? dateB - dateA
          : dateA - dateB
      })
  }, [processedBills, search, filters])

  let displayBills = filteredBills

  if (activePage === 'warranty') {
    displayBills = displayBills.filter(
      b => b.warranty && b.warranty.durationMonths
    )
  } else if (activePage === 'returns') {
    displayBills = displayBills.filter(
      b => b.returnInfo && b.returnInfo.eligible
    )
  }

  const renderBillList = (bills) => {
    if (bills.length === 0) {
      return (
        <div className="empty-state">
          <p>No bills found.</p>
          <p>Try changing your search or filters.</p>
        </div>
      )
    }

    return (
      <div className="bill-list">
        {bills.map(bill => {
          let badge = null

          if (activePage === 'warranty' && bill.warranty) {
            const wStatus = bill.warranty.status

            badge = (
              <span
                className={`badge badge-warranty-${wStatus
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`}
              >
                {wStatus}
              </span>
            )
          } else if (activePage === 'returns' && bill.returnInfo) {
            const rStatus = bill.returnInfo.status

            badge = (
              <span
                className={`badge badge-return-${rStatus
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`}
              >
                {rStatus}
              </span>
            )
          }

          return (
            <BillCard
              key={bill.id}
              vendor={bill.vendor}
              product={bill.product}
              category={bill.category}
              amount={bill.amount}
              date={bill.purchaseDate}
              statusBadge={badge}
              onClick={() => setSelectedBill(bill)}
            />
          )
        })}
      </div>
    )
  }

  const handleClearFilters = () => {
    setSearch('')

    setFilters({
      category: 'All',
      amount: 'All',
      sort: 'Latest'
    })
  }

  return (
    <div className="app">
      <main className="main-content">

        {(activePage === 'home' ||
          activePage === 'bills' ||
          activePage === 'history' ||
          activePage === 'warranty' ||
          activePage === 'returns') && (
          <>
            <Header
              search={search}
              setSearch={setSearch}
            />

            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onClear={handleClearFilters}
            />
          </>
        )}

        {/* HOME / DASHBOARD */}
{activePage === 'home' && (
  <section className="bills-section">
    <div className="section-header">
      <h2>Recent Bills</h2>
    </div>

    {(() => {
      const term = search.toLowerCase()

      const homeBills = savedBills
        .filter(bill => {
          if (
            term &&
            !bill.vendor?.toLowerCase().includes(term) &&
            !bill.category?.toLowerCase().includes(term) &&
            !bill.invoiceNumber?.toLowerCase().includes(term)
          ) {
            return false
          }

          if (
            filters.category !== 'All' &&
            bill.category !== filters.category
          ) {
            return false
          }

          const amount = Number(bill.totalAmount) || 0

          if (
            filters.amount === 'Below 1000' &&
            amount >= 1000
          ) {
            return false
          }

          if (
            filters.amount === '1000-5000' &&
            (amount < 1000 || amount > 5000)
          ) {
            return false
          }

          if (
            filters.amount === 'Above 5000' &&
            amount <= 5000
          ) {
            return false
          }

          return true
        })
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()

          return filters.sort === 'Latest'
            ? dateB - dateA
            : dateA - dateB
        })

      const recentBills = homeBills.slice(0, 3)

      return recentBills.length === 0 ? (
        <div className="empty-bills">
          <strong>No bills found</strong>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="bill-list">
          {recentBills.map((bill) => (
            <BillCard
              key={bill.id}
              vendor={bill.vendor}
              category={bill.category}
              amount={bill.totalAmount}
              date={bill.date}
            />
          ))}
        </div>
      )
    })()}

    <button
      className="view-all"
      onClick={() => setActivePage('bills')}
    >
      View All Bills →
    </button>
  </section>
)}

        {/* ALL BILLS */}
        {activePage === 'bills' && (
          <section className="page-section">
            <div className="page-header">
              <div>
                <p className="section-eyebrow">
                  PURCHASE HISTORY
                </p>

                <h1>All Bills</h1>

                <p>
                  Every purchase saved in BillStack.
                </p>
              </div>
            </div>

            {renderBillList(displayBills)}
          </section>
        )}

        {/* PURCHASE HISTORY */}
        {activePage === 'history' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Purchase History</h2>
            </div>

            {renderBillList(displayBills)}
          </section>
        )}

        {/* WARRANTY */}
        {activePage === 'warranty' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Warranty Tracking</h2>
            </div>

            {renderBillList(displayBills)}
          </section>
        )}

        {/* RETURNS */}
        {activePage === 'returns' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Return Tracking</h2>
            </div>

            {renderBillList(displayBills)}
          </section>
        )}

        {/* MORE */}
        {activePage === 'more' && (
          <section className="page-section">
            <div className="page-header">
              <div>
                <p className="section-eyebrow">
                  BILLSTACK
                </p>

                <h1>More</h1>

                <p>
                  Manage your BillStack experience.
                </p>
              </div>
            </div>

            <div className="bill-list">
              <button
                className="more-item"
                onClick={() => setActivePage('history')}
              >
                Purchase History
              </button>

              <button
                className="more-item"
                onClick={() => setActivePage('returns')}
              >
                Returns
              </button>

              <button className="more-item">
                Profile
              </button>

              <button className="more-item">
                Settings
              </button>

              <button className="more-item">
                About BillStack
              </button>

              <button
                className="more-item"
                onClick={() => {
                  localStorage.removeItem('billstack-bills')
                  setSavedBills([])
                }}
              >
                Clear All Bills
              </button>
            </div>
          </section>
        )}

      </main>

      <MobileNav
        activePage={activePage}
        setActivePage={setActivePage}
        savedBills={savedBills}
        setSavedBills={setSavedBills}
      />

      <BillDetailModal
        bill={selectedBill}
        onClose={() => setSelectedBill(null)}
      />
    </div>
  )
}

export default App
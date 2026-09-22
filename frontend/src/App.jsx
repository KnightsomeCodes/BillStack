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
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ category: 'All', amount: 'All', sort: 'Latest' })
  const [selectedBill, setSelectedBill] = useState(null)

  // 1. Prepare data
  const processedBills = useMemo(() => {
    let bills = applyCategorization(mockBills)
    bills = bills.map(b => enrichWarrantyInfo(b))
    bills = bills.map(b => enrichReturnInfo(b))
    return bills
  }, [])

  // 2. Filter data
  const filteredBills = useMemo(() => {
    return processedBills.filter(bill => {
      // Search
      const term = search.toLowerCase()
      if (term && !bill.vendor.toLowerCase().includes(term) && !bill.product.toLowerCase().includes(term) && !bill.category.toLowerCase().includes(term)) {
        return false
      }
      
      // Category Filter
      if (filters.category !== 'All' && bill.category !== filters.category) {
        return false
      }

      // Amount Filter
      if (filters.amount === 'Below 1000' && bill.amount >= 1000) return false
      if (filters.amount === '1000-5000' && (bill.amount < 1000 || bill.amount > 5000)) return false
      if (filters.amount === 'Above 5000' && bill.amount <= 5000) return false

      return true
    }).sort((a, b) => {
      const dateA = new Date(a.purchaseDate).getTime()
      const dateB = new Date(b.purchaseDate).getTime()
      return filters.sort === 'Latest' ? dateB - dateA : dateA - dateB
    })
  }, [processedBills, search, filters])

  // Split logic based on active page
  let displayBills = filteredBills
  if (activePage === 'warranty') {
    displayBills = displayBills.filter(b => b.warranty && b.warranty.durationMonths)
  } else if (activePage === 'returns') {
    displayBills = displayBills.filter(b => b.returnInfo && b.returnInfo.eligible)
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
            badge = <span className={`badge badge-warranty-${wStatus.replace(/\s+/g, '-').toLowerCase()}`}>{wStatus}</span>
          } else if (activePage === 'returns' && bill.returnInfo) {
            const rStatus = bill.returnInfo.status
            badge = <span className={`badge badge-return-${rStatus.replace(/\s+/g, '-').toLowerCase()}`}>{rStatus}</span>
          }

          let dateLabel = bill.purchaseDate
          if (activePage === 'history') {
             // just show date
          }

          return (
            <BillCard
              key={bill.id}
              vendor={bill.vendor}
              product={bill.product}
              category={bill.category}
              amount={bill.amount}
              date={dateLabel}
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
    setFilters({ category: 'All', amount: 'All', sort: 'Latest' })
  }

  return (
    <div className="app">
      <main className="main-content">
        
        {(activePage === 'home' || activePage === 'bills' || activePage === 'history' || activePage === 'warranty' || activePage === 'returns') && (
          <>
            <Header search={search} setSearch={setSearch} />
            <FilterBar filters={filters} setFilters={setFilters} onClear={handleClearFilters} />
          </>
        )}

        {activePage === 'home' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Recent Bills</h2>
            </div>
            {renderBillList(displayBills.slice(0, 3))}
            <button className="view-all" onClick={() => setActivePage('bills')}>
              View All Bills →
            </button>
          </section>
        )}

        {activePage === 'bills' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>All Bills</h2>
            </div>
            {renderBillList(displayBills)}
          </section>
        )}

        {activePage === 'history' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Purchase History</h2>
            </div>
            {renderBillList(displayBills)}
          </section>
        )}

        {activePage === 'warranty' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Warranty Tracking</h2>
            </div>
            {renderBillList(displayBills)}
          </section>
        )}

        {activePage === 'returns' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Return Tracking</h2>
            </div>
            {renderBillList(displayBills)}
          </section>
        )}

        {activePage === 'more' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>More</h2>
            </div>
            <div className="bill-list">
              <button className="more-item" onClick={() => setActivePage('history')}>
                Purchase History
              </button>
              <button className="more-item" onClick={() => setActivePage('returns')}>
                Returns
              </button>
              <button className="more-item">Profile</button>
              <button className="more-item">Settings</button>
              <button className="more-item">About BillStack</button>
            </div>
          </section>
        )}
      </main>

      <MobileNav activePage={activePage} setActivePage={setActivePage} />

      <BillDetailModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
    </div>
  )
}

export default App
import { useState } from 'react'
import MobileNav from './components/MobileNav'
import BillCard from './components/BillCard'
import AddBill from './components/AddBill'
import { bills as initialBills } from './data/bills'
import Dashboard from './Dashboard'
import './styles/dashboard.css'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [bills, setBills] = useState(initialBills)
  const [showAddBill, setShowAddBill] = useState(false)

  const handleAddBill = (newBill) => {
    const billWithId = {
      ...newBill,
      id: Date.now(),
    }

    setBills((currentBills) => [
      ...currentBills,
      billWithId,
    ])

    setShowAddBill(false)
  }

  return (
    <div className="app">

      <main className="main-content">

        {/* HOME / DASHBOARD */}
        {activePage === 'home' && (
          <Dashboard
            bills={bills}
            onAddBillClick={() => setShowAddBill(true)}
            onViewAllBills={() => setActivePage('bills')}
          />
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

              <button
                className="primary-add-button"
                onClick={() => setShowAddBill(true)}
              >
                <span>+</span>
                Add Bill
              </button>
            </div>

            <div className="all-bills-list">
              {bills.map((bill) => (
                <BillCard
                  key={bill.id}
                  vendor={bill.vendor}
                  category={bill.category}
                  amount={bill.amount}
                  date={bill.date}
                  warrantyMonths={bill.warrantyMonths}
                />
              ))}
            </div>

          </section>
        )}

        {/* WARRANTY */}
        {activePage === 'warranty' && (
          <section className="page-section">

            <div className="page-header">
              <div>
                <p className="section-eyebrow">
                  PROTECTION
                </p>

                <h1>Warranties</h1>

                <p>
                  Track active warranties on your purchases.
                </p>
              </div>

              <button
                className="primary-add-button"
                onClick={() => setShowAddBill(true)}
              >
                <span>+</span>
                Add Bill
              </button>
            </div>

            <div className="all-bills-list">
              {bills
                .filter((bill) => bill.warrantyMonths > 0)
                .map((bill) => (
                  <BillCard
                    key={bill.id}
                    vendor={bill.vendor}
                    category={bill.category}
                    amount={bill.amount}
                    date={bill.date}
                    warrantyMonths={bill.warrantyMonths}
                  />
                ))}
            </div>

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

            <div className="more-list">

              <button className="more-item">
                <span>👤</span>
                Profile
                <strong>→</strong>
              </button>

              <button className="more-item">
                <span>⚙</span>
                Settings
                <strong>→</strong>
              </button>

              <button className="more-item">
                <span>ℹ</span>
                About BillStack
                <strong>→</strong>
              </button>

            </div>

          </section>
        )}

      </main>

      {/* ADD BILL MODAL */}
      {showAddBill && (
        <AddBill
          onAddBill={handleAddBill}
          onClose={() => setShowAddBill(false)}
        />
      )}

      {/* MOBILE NAVIGATION */}
      <MobileNav
        activePage={activePage}
        setActivePage={setActivePage}
      />

    </div>
  )
}

export default App
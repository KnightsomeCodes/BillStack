import MobileNav from './components/MobileNav'
import Header from './components/Header'
import BillCard from './components/BillCard'
import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [savedBills, setSavedBills] = useState(
  JSON.parse(localStorage.getItem('billstack-bills')) || []
)
  return (
    <div className="app">

      <main className="main-content">

        {activePage === 'home' && (
          <>
            <Header />

            <section className="bills-section">
              <div className="section-header">
                <h2>Recent Bills</h2>
              </div>

              <div className="bill-list">
                {savedBills.length === 0 ? (
                  <p className="empty-bills">
                    No saved bills yet.
                  </p>
                ) : (
                  savedBills.slice(-3).reverse().map((bill) => (
                    <BillCard
                      key={bill.id}
                      vendor={bill.vendor}
                      category={bill.category}
                      amount={bill.totalAmount}
                      date={bill.date}
                    />
                  ))
                )}
              </div>

              <button
                className="view-all"
                onClick={() => setActivePage('bills')}
              >
                View All Bills →
              </button>
            </section>
          </>
        )}

        {activePage === 'bills' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>All Bills</h2>
            </div>

            <div className="bill-list">
              {savedBills.length === 0 ? (
                <div className="empty-bills">
                  <strong>No bills yet</strong>
                  <p>Your saved bills will appear here.</p>
                </div>
              ) : (
                savedBills.map((bill) => (
                  <BillCard
                    key={bill.id}
                    vendor={bill.vendor}
                    category={bill.category}
                    amount={bill.totalAmount}
                    date={bill.date}
                  />
                ))
              )}
            </div>
          </section>
        )}
        
        {activePage === 'warranty' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>Warranty</h2>
            </div>

            <div className="bill-list">

              <BillCard
                vendor="Croma"
                category="Electronics"
                amount="8,999"
                date="Warranty: 11 months"
              />

              <BillCard
                vendor="Flipkart"
                category="Electronics"
                amount="1,299"
                date="Warranty: 10 months"
              />

            </div>
          </section>
        )}

        {activePage === 'more' && (
          <section className="bills-section">
            <div className="section-header">
              <h2>More</h2>
            </div>

            <div className="bill-list">
              <button className="more-item">Profile</button>
              <button className="more-item">Settings</button>
              <button className="more-item">About BillStack</button>

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

    </div>
  )
}

export default App
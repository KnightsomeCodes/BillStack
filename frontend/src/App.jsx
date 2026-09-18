import MobileNav from './components/MobileNav'
import Header from './components/Header'
import BillCard from './components/BillCard'
import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('home')
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

                <BillCard
                  vendor="Croma"
                  category="Electronics"
                  amount="8,999"
                  date="Sep 12"
                />

                <BillCard
                  vendor="Amazon"
                  category="Food"
                  amount="2,499"
                  date="Sep 10"
                />

                <BillCard
                  vendor="Flipkart"
                  category="Electronics"
                  amount="1,299"
                  date="Sep 08"
                />

              </div>

              <button className="view-all">
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

              <BillCard
                vendor="Croma"
                category="Electronics"
                amount="8,999"
                date="Sep 12"
              />

              <BillCard
                vendor="Amazon"
                category="Food"
                amount="2,499"
                date="Sep 10"
              />

              <BillCard
                vendor="Flipkart"
                category="Electronics"
                amount="1,299"
                date="Sep 08"
              />

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

              <button className="more-item">
                Profile
              </button>

              <button className="more-item">
                Settings
              </button>

              <button className="more-item">
                About BillStack
              </button>

            </div>
          </section>
        )}

      </main>

      <MobileNav
        activePage={activePage}
        setActivePage={setActivePage}
      />

    </div>
  )
}

export default App
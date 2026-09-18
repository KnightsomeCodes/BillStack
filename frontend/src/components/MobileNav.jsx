import { useState } from 'react'

function MobileNav({ activePage, setActivePage }) {
  const [showAddMenu, setShowAddMenu] = useState(false)

  return (
    <>
      {showAddMenu && (
        <>
          <div
            className="add-menu-overlay"
            onClick={() => setShowAddMenu(false)}
          />

          <div className="add-menu">

          <button onClick={() => setShowAddMenu(false)}>
            Upload Bill
          </button>

          <button onClick={() => setShowAddMenu(false)}>
            Scan Bill
          </button>

            </div>
            </>
          )}

      <nav className="mobile-nav">
        <button
          className={activePage === 'home' ? 'active' : ''}
          onClick={() => setActivePage('home')}
        >
          <span>⌂</span>
          Home
        </button>

        <button
          className={activePage === 'bills' ? 'active' : ''}
          onClick={() => setActivePage('bills')}
        >
          <span>▤</span>
          Bills
        </button>

        <button
          className="add-button"
          onClick={() => {
            setShowAddMenu(!showAddMenu)
            setActivePage('home')
          }}
        >
          <span>+</span>
          Add
        </button>

        <button
          className={activePage === 'warranty' ? 'active' : ''}
          onClick={() => setActivePage('warranty')}
        >
          <span>✓</span>
          Warranty
        </button>

        <button
          className={activePage === 'more' ? 'active' : ''}
          onClick={() => setActivePage('more')}
        >
          <span>☰</span>
          More
        </button>
      
      </nav>
    </>
  )
}

export default MobileNav
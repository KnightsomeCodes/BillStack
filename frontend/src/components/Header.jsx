function Header({ search, setSearch }) {
  return (
    <header className="topbar">

      <div className="header-top">
        <p className="page-label">BillStack</p>

        <button className="profile-circle" aria-label="Profile">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
          </svg>
        </button>
      </div>

      <div className="search-bar">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search bills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    </header>
  )
}

export default Header
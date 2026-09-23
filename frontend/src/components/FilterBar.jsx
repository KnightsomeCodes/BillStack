
const FilterBar = ({ filters, setFilters, onClear }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Others">Others</option>
        </select>
        
        <select
          value={filters.amount}
          onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
        >
          <option value="All">All Amounts</option>
          <option value="Below 1000">Below ₹1,000</option>
          <option value="1000-5000">₹1,000 - ₹5,000</option>
          <option value="Above 5000">Above ₹5,000</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      
      <button className="clear-filters" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;

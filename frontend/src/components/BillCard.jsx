function BillCard({ vendor, category, amount, date }) {
  return (
    <div className="bill">
      <div className="bill-info">
        <h3>{vendor}</h3>

        <div className="bill-category">
          <span></span>
          <p>{category}</p>
        </div>
      </div>

      <div className="bill-amount">
        <strong>₹{amount}</strong>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default BillCard
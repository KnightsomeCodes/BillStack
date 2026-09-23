function BillCard({ vendor, product, category, amount, date, onClick, statusBadge }) {
  return (
    <div className="bill" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="bill-info">
        <h3>{vendor}</h3>
        {product && <p className="bill-product">{product}</p>}
        <div className="bill-category">
          <span></span>
          <p>{category}</p>
        </div>
      </div>

      <div className="bill-amount">
        <strong>₹{amount}</strong>
        <p>{date}</p>
        {statusBadge && <div className="bill-badge-container">{statusBadge}</div>}
      </div>
    </div>
  )
}

export default BillCard
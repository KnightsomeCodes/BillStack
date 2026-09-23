const BillDetailModal = ({ bill, onClose }) => {
  if (!bill) return null;

  const wStatus = bill.warranty?.status;
  const rStatus = bill.returnInfo?.status;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <h2>{bill.vendor}</h2>
        <p className="modal-product">{bill.product}</p>
        
        <div className="modal-grid">
          <div>
            <label>Amount</label>
            <p><strong>₹{bill.amount}</strong></p>
          </div>
          <div>
            <label>Category</label>
            <p>{bill.category}</p>
          </div>
          <div>
            <label>Purchased</label>
            <p>{bill.purchaseDate}</p>
          </div>
        </div>

        <div className="modal-section">
          <h3>Warranty</h3>
          {bill.warranty?.durationMonths ? (
            <>
              <p>{bill.warranty.durationMonths} months</p>
              <p>Expires: {bill.warranty.expiryDate}</p>
              <p>Status: <span className={`badge badge-warranty-${wStatus?.replace(/\s+/g, '-').toLowerCase()}`}>{wStatus}</span></p>
            </>
          ) : (
            <p>No warranty information</p>
          )}
        </div>

        <div className="modal-section">
          <h3>Return</h3>
          {bill.returnInfo?.eligible ? (
            <>
              <p>Window: {bill.returnInfo.returnWindowDays} days</p>
              <p>Deadline: {bill.returnInfo.deadline}</p>
              <p>Status: <span className={`badge badge-return-${rStatus?.replace(/\s+/g, '-').toLowerCase()}`}>{rStatus}</span></p>
            </>
          ) : (
            <p>Status: <span className="badge badge-return-not-eligible">{rStatus || 'Not Eligible'}</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillDetailModal;

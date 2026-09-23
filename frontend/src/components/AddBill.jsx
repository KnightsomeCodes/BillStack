import { useState } from 'react'

function AddBill({ onAddBill, onClose }) {
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [warrantyMonths, setWarrantyMonths] = useState('')
  const [returnDays, setReturnDays] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBill = {
      id: Date.now(),
      vendor,
      category,
      amount: Number(amount),
      date,
      warrantyMonths: Number(warrantyMonths) || 0,
      returnDays: Number(returnDays) || 0,
    }

    onAddBill(newBill)
    onClose()
  }

  return (
    <div className="add-bill-overlay">

      <div className="add-bill-form">

        <div className="form-header">
          <h2>Add New Bill</h2>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>
            Vendor
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="e.g. Croma"
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Electronics"
              required
            />
          </label>

          <label>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 8999"
              required
            />
          </label>

          <label>
            Date
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Sep 20"
              required
            />
          </label>

          <label>
            Warranty (months)
            <input
              type="number"
              value={warrantyMonths}
              onChange={(e) => setWarrantyMonths(e.target.value)}
              placeholder="e.g. 12"
            />
          </label>

          <label>
            Return Period (days)
            <input
              type="number"
              value={returnDays}
              onChange={(e) => setReturnDays(e.target.value)}
              placeholder="e.g. 7"
            />
          </label>

          <button type="submit" className="save-bill-button">
            Add Bill
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddBill
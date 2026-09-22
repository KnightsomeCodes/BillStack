import { useState } from 'react'
import { useRef } from 'react'

function MobileNav({ activePage, setActivePage, setSavedBills, savedBills }) {
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const fileInputRef = useRef(null)
  const [ocrText, setOcrText] = useState('')
  const [extractedData, setExtractedData] = useState(null)
  const [reviewData, setReviewData] = useState(null)

  return (
    <>
      {showAddMenu && (
        <>
          <div
            className="add-menu-overlay"
            onClick={() => setShowAddMenu(false)}
          />

          <div className="add-menu">

          <button
            onClick={() => {
              setShowAddMenu(false)
              fileInputRef.current.click()
            }}
          >
            Upload Bill
          </button>

          <button
            onClick={() => {
              setShowAddMenu(false)
              document.getElementById('cameraInput').click()
            }}
          >
            Scan Bill
          </button>

            </div>
            </>
          )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          onChange={async (e) => {
            const file = e.target.files[0]

            if (!file) return

            setSelectedFile(file)

            const formData = new FormData()
            formData.append('bill', file)

            try {
              const response = await fetch('http://192.168.1.14:5000/upload', {
                method: 'POST',
                body: formData
              })

              const data = await response.json()
              console.log(data)
              setOcrText(data.text || '')
              setExtractedData(data.extractedData || null)
              setReviewData(data.extractedData || null)
              setSelectedFile(null)
            } catch (error) {
              console.error('Upload failed:', error)
            }
          }}
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          id="cameraInput"
          onChange={async (e) => {
            const file = e.target.files[0]

            if (!file) return

            setSelectedFile(file)

            const formData = new FormData()
            formData.append('bill', file)

            try {
              const response = await fetch('http://10.12.15.231:5000/upload', {
                method: 'POST',
                body: formData
              })

              const data = await response.json()
              console.log(data)
              setOcrText(data.text || '')
              setExtractedData(data.extractedData || null)
              setReviewData(data.extractedData || null)
              setSelectedFile(null)
            } catch (error) {
              console.error('Upload failed:', error)
            }
          }}
        />

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

        {selectedFile && (
          <div className="selected-file">
            <strong>Scanning Bill...</strong>
          </div>
        )}

        {reviewData && (
          <div className="review-bill">
            <h3>Review Bill</h3>

            <label>
              Vendor
              <input
                value={reviewData.vendor}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    vendor: e.target.value
                  })
                }
              />
            </label>

            <label>
              Invoice Number
              <input
                value={reviewData.invoiceNumber}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    invoiceNumber: e.target.value
                  })
                }
              />
            </label>

            <label>
              Date
              <input
                value={reviewData.date}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    date: e.target.value
                  })
                }
              />
            </label>

            <label>
              Items
              <textarea
                value={reviewData.items.join('\n')}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    items: e.target.value.split('\n')
                  })
                }
              />
            </label>

            <label>
              Total Amount
              <input
                value={reviewData.totalAmount}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    totalAmount: e.target.value
                  })
                }
              />
            </label>

            <label>
              Category
              <input
                value={reviewData.category}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    category: e.target.value
                  })
                }
              />
            </label>

            <label>
              Warranty
              <input
                value={reviewData.warranty}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    warranty: e.target.value
                  })
                }
              />
            </label>

            <label>
              Return Policy
              <textarea
                value={reviewData.returnPolicy}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    returnPolicy: e.target.value
                  })
                }
              />
            </label>

            <button
              className="save-bill-button"
              onClick={() => {
                const savedBills =
                  JSON.parse(localStorage.getItem('billstack-bills')) || []

                const newBill = {
                  id: Date.now(),
                  ...reviewData,
                  savedAt: new Date().toISOString()
                }

                localStorage.setItem(
                  'billstack-bills',
                  JSON.stringify([...savedBills, newBill])
                )

                setSavedBills([...savedBills, newBill])

                alert('Bill saved successfully')
                

                alert('Bill saved successfully')
              }}
            >
              Save Bill
            </button>
          </div>
        )}
    </>
  )
}

export default MobileNav
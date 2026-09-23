export const mockBills = [
  {
    id: 1,
    vendor: "Croma",
    product: "Sony WH-1000XM5",
    category: "Electronics",
    amount: 8999,
    purchaseDate: "2026-09-12",
    warranty: {
      durationMonths: 12,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 7,
    }
  },
  {
    id: 2,
    vendor: "Amazon",
    product: "Protein Oats",
    category: "Food",
    amount: 2499,
    purchaseDate: "2026-09-10",
    warranty: {
      durationMonths: null,
    },
    returnInfo: {
      eligible: false,
    }
  },
  {
    id: 3,
    vendor: "Flipkart",
    product: "Mechanical Keyboard",
    category: "Electronics",
    amount: 1299,
    purchaseDate: "2026-08-08",
    warranty: {
      durationMonths: 6,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 14,
    }
  },
  {
    id: 4,
    vendor: "MakeMyTrip",
    product: "Flight to Mumbai",
    category: "Travel",
    amount: 5400,
    purchaseDate: "2026-09-15",
    warranty: {
      durationMonths: null,
    },
    returnInfo: {
      eligible: false,
    }
  },
  {
    id: 5,
    vendor: "Udemy",
    product: "React Native Course",
    category: "Education",
    amount: 499,
    purchaseDate: "2026-09-01",
    warranty: {
      durationMonths: null,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 30,
    }
  },
  {
    id: 6,
    vendor: "Local Grocery",
    product: "Monthly Groceries",
    category: "Food",
    amount: 3200,
    purchaseDate: "2026-09-05",
    warranty: null,
    returnInfo: {
      eligible: false
    }
  },
  {
    id: 7,
    vendor: "Apple Store",
    product: "iPhone 15 Pro",
    category: "Electronics",
    amount: 129900,
    purchaseDate: "2025-09-21",
    warranty: {
      durationMonths: 12,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 14,
      status: "Return Window Expired"
    }
  },
  {
    id: 8,
    vendor: "Myntra",
    product: "Nike Running Shoes",
    category: "Others",
    amount: 4500,
    purchaseDate: "2026-08-20",
    warranty: {
      durationMonths: 6,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 30,
      status: "Returned"
    }
  },
  {
    id: 9,
    vendor: "Amazon",
    product: "Bluetooth Speaker",
    category: "Electronics",
    amount: 2999,
    purchaseDate: "2025-10-15",
    warranty: {
      durationMonths: 12,
    },
    returnInfo: {
      eligible: true,
      returnWindowDays: 7,
    }
  },
  {
    id: 10,
    vendor: "BookMyShow",
    product: "Movie Tickets",
    category: "Others",
    amount: 600,
    purchaseDate: "2026-09-18",
    warranty: null,
    returnInfo: {
      eligible: false
    }
  },
  {
    id: 11,
    vendor: "Coursera",
    product: "Data Science Specialization",
    category: "Education",
    amount: 3200,
    purchaseDate: "2026-07-10",
    warranty: null,
    returnInfo: {
      eligible: true,
      returnWindowDays: 14
    }
  },
  {
    id: 12,
    vendor: "Uber",
    product: "Airport Ride",
    category: "Travel",
    amount: 850,
    purchaseDate: "2026-09-14",
    warranty: null,
    returnInfo: {
      eligible: false
    }
  }
]

export const bills = [
  {
    id: 1,
    vendor: 'Croma',
    category: 'Electronics',
    amount: 8999,
    date: '2026-09-12',
    warrantyMonths: 11,
    returnDays: 0,
  },
  {
    id: 2,
    vendor: 'Amazon',
    category: 'Electronics',
    amount: 2499,
    date: '2026-09-10',
    warrantyMonths: 0,
    returnDays: 2,
  },
  {
    id: 3,
    vendor: 'Flipkart',
    category: 'Electronics',
    amount: 1299,
    date: '2026-09-08',
    warrantyMonths: 10,
    returnDays: 0,
  },
  {
    id: 4,
    vendor: 'Myntra',
    category: 'Clothing',
    amount: 1799,
    date: '2026-08-25',
    warrantyMonths: 0,
    returnDays: 7,
  },
  {
    id: 5,
    vendor: 'Reliance Digital',
    category: 'Electronics',
    amount: 5499,
    date: '2026-08-18',
    warrantyMonths: 12,
    returnDays: 7,
  },
  {
    id: 6,
    vendor: 'IKEA',
    category: 'Home',
    amount: 3299,
    date: '2026-07-22',
    warrantyMonths: 6,
    returnDays: 7,
  },
  {
    id: 7,
    vendor: 'Decathlon',
    category: 'Sports',
    amount: 2199,
    date: '2026-07-10',
    warrantyMonths: 3,
    returnDays: 30,
  },
  {
    id: 8,
    vendor: 'Nykaa',
    category: 'Beauty',
    amount: 1499,
    date: '2026-06-28',
    warrantyMonths: 0,
    returnDays: 7,
  },
  {
    id: 9,
    vendor: 'Amazon',
    category: 'Home',
    amount: 2899,
    date: '2026-06-15',
    warrantyMonths: 6,
    returnDays: 10,
  },
  {
    id: 10,
    vendor: 'Croma',
    category: 'Appliances',
    amount: 7499,
    date: '2026-05-20',
    warrantyMonths: 12,
    returnDays: 7,
  },
]
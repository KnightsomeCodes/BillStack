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
    returnInfo: { eligible: false }
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
    returnInfo: { eligible: false }
  },
  {
    id: 11,
    vendor: "Coursera",
    product: "Data Science Specialization",
    category: "Education",
    amount: 3200,
    purchaseDate: "2026-07-10",
    warranty: null,
    returnInfo: { eligible: true, returnWindowDays: 14 }
  },
  {
    id: 12,
    vendor: "Uber",
    product: "Airport Ride",
    category: "Travel",
    amount: 850,
    purchaseDate: "2026-09-14",
    warranty: null,
    returnInfo: { eligible: false }
  }
];

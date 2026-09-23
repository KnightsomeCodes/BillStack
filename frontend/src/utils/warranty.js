export const calculateWarrantyExpiry = (purchaseDate, durationMonths) => {
  if (!purchaseDate || !durationMonths) return null;
  const date = new Date(purchaseDate);
  date.setMonth(date.getMonth() + durationMonths);
  return date.toISOString().split('T')[0];
};

export const getWarrantyStatus = (expiryDate) => {
  if (!expiryDate) return 'No Warranty';
  
  const now = new Date();
  const expiry = new Date(expiryDate);
  
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'Expired';
  } else if (diffDays <= 30) {
    return 'Expiring Soon';
  } else {
    return 'Active';
  }
};

export const enrichWarrantyInfo = (bill) => {
  if (!bill.warranty || !bill.warranty.durationMonths) {
    return { ...bill, warranty: { ...bill.warranty, status: 'No Warranty' } };
  }
  
  const expiryDate = bill.warranty.expiryDate || calculateWarrantyExpiry(bill.purchaseDate, bill.warranty.durationMonths);
  const status = getWarrantyStatus(expiryDate);
  
  return {
    ...bill,
    warranty: {
      ...bill.warranty,
      expiryDate,
      status
    }
  };
};

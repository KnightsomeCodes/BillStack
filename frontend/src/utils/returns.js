export const calculateReturnDeadline = (purchaseDate, returnWindowDays) => {
  if (!purchaseDate || !returnWindowDays) return null;
  const date = new Date(purchaseDate);
  date.setDate(date.getDate() + returnWindowDays);
  return date.toISOString().split('T')[0];
};

export const getReturnStatus = (eligible, deadline, existingStatus) => {
  if (existingStatus) return existingStatus;
  if (!eligible) return 'Not Eligible';
  if (!deadline) return 'Not Eligible';

  const now = new Date();
  const dead = new Date(deadline);

  if (now > dead) {
    return 'Return Window Expired';
  } else {
    return 'Eligible';
  }
};

export const enrichReturnInfo = (bill) => {
  if (!bill.returnInfo || !bill.returnInfo.eligible) {
    return {
      ...bill,
      returnInfo: {
        ...bill.returnInfo,
        eligible: false,
        status: bill.returnInfo?.status || 'Not Eligible'
      }
    };
  }

  const deadline = bill.returnInfo.deadline || calculateReturnDeadline(bill.purchaseDate, bill.returnInfo.returnWindowDays);
  const status = getReturnStatus(bill.returnInfo.eligible, deadline, bill.returnInfo.status);

  return {
    ...bill,
    returnInfo: {
      ...bill.returnInfo,
      deadline,
      status
    }
  };
};

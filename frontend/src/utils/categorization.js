export const categorizeBill = (bill) => {
  if (bill.category) return bill.category;

  const text = `${bill.product} ${bill.vendor}`.toLowerCase();

  const rules = {
    Electronics: ['phone', 'mobile', 'iphone', 'samsung', 'laptop', 'computer', 'keyboard', 'mouse', 'headphone', 'earphone', 'tablet', 'monitor', 'camera', 'charger', 'electronics', 'tv', 'television', 'speaker'],
    Food: ['food', 'grocery', 'groceries', 'restaurant', 'meal', 'pizza', 'burger', 'coffee', 'snacks', 'oats'],
    Travel: ['flight', 'hotel', 'train', 'bus', 'cab', 'uber', 'ola', 'makemytrip', 'booking', 'travel'],
    Education: ['book', 'course', 'education', 'udemy', 'coursera', 'college', 'stationery', 'study'],
  };

  for (const [category, keywords] of Object.entries(rules)) {
    if (keywords.some(kw => text.includes(kw))) {
      return category;
    }
  }

  return 'Others';
};

export const applyCategorization = (bills) => {
  return bills.map(b => ({ ...b, category: categorizeBill(b) }));
};

export const calculateAmountWithoutGst = (amount) => {
  return amount / (1 + 18 / 100);
};

export const getInrFormattedAmount = (amount) => {
  try {
    const result = new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount)
    return result.slice(1)
  } catch (e) {
    return amount
  }
}

export const calculateGst = (amount) => {
  const gstPercentage = 18;
  return (amount * gstPercentage) / 100;;
}
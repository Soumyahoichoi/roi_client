export const calculateAmountWithoutGst = (amount) => {
  const gstPercentage = 18;

  return (amount / (100 + gstPercentage)) * 100;
};

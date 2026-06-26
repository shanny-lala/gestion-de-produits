export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '$0.00';
  
  // Format to 2 decimal places with thousands separators
  return '$' + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const formatNumber = (value) => {
  if (value === undefined || value === null) return '0';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

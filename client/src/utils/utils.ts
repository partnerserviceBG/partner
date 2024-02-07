export const getShortAddress = (fullAddress?: string) => {
  return fullAddress?.split(',').slice(2).join(',');
};

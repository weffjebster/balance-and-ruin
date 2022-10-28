export const getNumberSuffix = (id: string, type: string | string[]) => {
  if (id.includes('percent') || type === 'PERCENT') {
    return '%';
  }

  return '';
};

export const getNumberSuffix = (id: string | number, type: string | string[]) => {
  if ((typeof id === 'string' && id.includes('percent')) || type == 'PERCENT') {
    return '%';
  }

  return '';
};

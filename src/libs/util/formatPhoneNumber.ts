const formatPhoneNumber = (numberString: string) => {
  if (!numberString) return '';

  if (numberString.length <= 3) return numberString;
  if (numberString.length <= 7) return `${numberString.slice(0, 3)}-${numberString.slice(3)}`;
  return `${numberString.slice(0, 3)}-${numberString.slice(3, 7)}-${numberString.slice(7)}`;
};

export default formatPhoneNumber;

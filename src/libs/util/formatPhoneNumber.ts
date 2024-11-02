const formatPhoneNumber = (number: string) => {
  if (number.length <= 3) return number;
  if (number.length <= 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
  return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
};

export default formatPhoneNumber;

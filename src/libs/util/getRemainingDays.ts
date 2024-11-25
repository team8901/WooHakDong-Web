const getRemainingDays = (targetDate: string) => {
  const current = new Date();
  const target = new Date(targetDate);

  const differenceInTime = target.getTime() - current.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

export default getRemainingDays;

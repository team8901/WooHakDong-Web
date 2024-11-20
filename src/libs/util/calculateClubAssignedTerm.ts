const calculateClubAssignedTerm = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (month >= 7) {
    return `${year}-07-01`;
  } else {
    return `${year}-03-01`;
  }
};

export default calculateClubAssignedTerm;

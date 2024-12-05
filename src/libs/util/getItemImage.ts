const getItemImage = (category: string) => {
  if (category === 'BOOK') {
    return '/images/item/book.png';
  } else if (category === 'CLOTHES') {
    return '/images/item/clothes.png';
  } else if (category === 'DIGITAL') {
    return '/images/item/digital.png';
  } else if (category === 'SPORT') {
    return '/images/item/sport.png';
  } else if (category === 'STATIONERY') {
    return '/images/item/stationery.png';
  }
  return '/images/item/etc.png';
};

export default getItemImage;

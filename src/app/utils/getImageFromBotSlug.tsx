import yodaImg from '../bot_avatars/yoda.webp';
import darkHelmetImg from '../bot_avatars/dark_helmet.png';
import darthVaderImg from '../bot_avatars/darth_vader.jpg';

export const getImageFromBotSlug = (slug: string) => {
  switch (slug) {
    case 'yoda':
      return yodaImg;
    case 'dark_helmet':
      return darkHelmetImg;
    case 'darth_vader':
      return darthVaderImg;
    default:
      return '/bot_avatars/default.png'; // fallback image
  }
};

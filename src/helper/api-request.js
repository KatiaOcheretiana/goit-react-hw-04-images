import axios from 'axios';

export const searchByName = async (item, page) => {
  const key = '39735643-6cc1b2c73d81a27078c554324';
  const perPage = '12';
  const apiURL = `https://pixabay.com/api/?q=${item}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  const result = await axios.get(apiURL);
  return result.data;
};

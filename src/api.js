import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export async function fetchItems() {
  const { data } = await instance.get(`/posts`);
  return data;
}

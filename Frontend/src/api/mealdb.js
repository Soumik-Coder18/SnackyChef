export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchByName = async (name) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${name}`);
  return res.json();
};

export const searchByFirstLetter = async (letter) => {
  const res = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  return res.json();
};

export const filterByIngredient = async (ingredient) => {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  return res.json();
};

export const filterByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  return res.json();
};

export const filterByArea = async (area) => {
  const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
  return res.json();
};

export const getMealById = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  return res.json();
};

export const listCategories = async () => {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  return res.json();
};

export const listIngredients = async () => {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  return res.json();
};

export const listAreas = async () => {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);
  return res.json();
};

export const getRandomMeal = async () => {
  const res = await fetch(`${BASE_URL}/random.php`);
  return res.json();
};
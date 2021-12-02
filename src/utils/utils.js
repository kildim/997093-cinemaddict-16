import {createCardTemplate} from '../view/card';

export const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const createCards = (films, cardsCount) => {
  let cardsTemplate = '';
  for (let index=0; index < cardsCount; index++) {
    cardsTemplate = cardsTemplate.concat(createCardTemplate(films[index]));
  }
  return cardsTemplate;
};
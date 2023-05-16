import { Level } from './types';

const BASE_URL = 'https://www.meme-arsenal.com/memes';

export const LEVELS: Level[] = [
  {
    id: 'easy',
    title: 'Легкий уровень',
    img: `${BASE_URL}/c2660bc7ed210868db568f833e8548fb.jpg`,
  },
  {
    id: 'medium',
    title: 'Средний уровень',
    img: `${BASE_URL}/887c4565db2d97ff3a0475b78b296762.jpg`,
  },
  {
    id: 'hard',
    title: 'Сложный уровень',
    img: `${BASE_URL}/887c4565db2d97ff3a0475b78b296762.jpg`,
  },
];

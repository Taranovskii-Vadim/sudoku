import { atom, selector } from 'recoil';

import { api } from 'src/api';
import getLevels from 'src/api/getLevels';

import { getAtomKey } from '../helpers';

import { Level } from './types';

export const levelsState = atom<Level[]>({
  key: getAtomKey('levels'),
  default: selector({
    key: getAtomKey('levels', 'default'),
    get: async () => await api(getLevels),
  }),
});

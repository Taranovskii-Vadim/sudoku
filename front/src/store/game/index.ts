import { selectorFamily } from 'recoil';

import { api } from 'src/api';
import getGame from 'src/api/getGame';

import { getSelectorKey } from '../helpers';

export const gameQuery = selectorFamily({
  key: getSelectorKey('game'),
  get: (level) => async () => {
    const response = await api(getGame, level as GameMode);

    return response;
  },
});

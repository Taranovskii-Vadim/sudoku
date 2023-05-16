import { Sudoku } from 'src/store/game/types';

import { Method, Route } from './types';

type ResponseDTO = {
  id: number;
  template: string[][];
};

class GetGame implements Route {
  method: Method = 'GET';

  getUrl(level?: GameMode): string {
    return `/games/${level}`;
  }

  getData(response: ResponseDTO): Sudoku {
    return response;
  }
}

export default new GetGame();

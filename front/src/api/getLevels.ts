import { Level } from 'src/store/levels/types';

import { Method, Route } from './types';

type LevelDTO = {
  id: GameMode;
  title: string;
  img: string;
};

type ResponseDTO = {
  levels: LevelDTO[];
};

class GetLevels implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return `/levels`;
  }

  getData({ levels }: ResponseDTO): Level[] {
    return levels;
  }
}

export default new GetLevels();

import { Method, Route } from './types';

class PostGame implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/games/check';
  }

  getData(response: boolean[][]): boolean[][] {
    return response;
  }
}

export default new PostGame();

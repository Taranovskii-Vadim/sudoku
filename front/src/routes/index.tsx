import { lazy } from 'react';

import { Nodes, Paths, Route, RouteKey } from './types';

const Home = lazy(() => import('../pages/Home'));
const Game = lazy(() => import('../pages/Game'));

const ROOT = '/';
const NODES: Nodes = { home: <Home />, game: <Game /> };
const PATHS: Paths = { home: ROOT, game: `${ROOT}game/:mode` };

export const getGamePagePath = (mode: GameMode): string => `${ROOT}game/${mode}`;

export const getRoutes = (): Route[] => {
  const keys = Object.keys(NODES) as RouteKey[];

  return keys.map((id) => ({ id, path: PATHS[id], element: NODES[id] }));
};

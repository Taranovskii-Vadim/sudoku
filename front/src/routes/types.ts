export type RouteKey = 'home' | 'game';

export type Paths = Record<RouteKey, string>;

export type Nodes = Record<RouteKey, JSX.Element>;

export type Route = { id: RouteKey; path: string; element: JSX.Element };

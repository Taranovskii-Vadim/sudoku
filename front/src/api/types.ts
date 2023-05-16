export type Method = 'GET';

export type Route<D = unknown> = {
  method: Method;

  getUrl: (q?: GameMode) => string;

  getData: (response: any) => D;
};

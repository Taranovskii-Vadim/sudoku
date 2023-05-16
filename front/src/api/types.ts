export type Method = 'GET';

export type Route<D = unknown> = {
  method: Method;

  getUrl: (q?: string) => string;

  getData: (response: any) => D;
};

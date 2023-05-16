import { Request } from "express";

type Sudoku = {
  id: number;
  template: string[][];
};

export type Games = Record<GameMode, Sudoku[]>;

export type Req = Request<{ level: GameMode }>;

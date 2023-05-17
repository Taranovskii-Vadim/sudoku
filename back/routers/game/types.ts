import { Request } from "express";

import { GameMode } from "../types";

export type Sudoku = {
  id: number;
  template: string[][];
};

export type Games = Record<GameMode, Sudoku[]>;

export type GetGameReq = Request<{ level: GameMode }>;
export type CheckReq = Request<any, any, Sudoku & { mode: GameMode }>;

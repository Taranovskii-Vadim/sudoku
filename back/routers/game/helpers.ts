import { GameMode } from "../types";

import { Sudoku } from "./types";
import { GAMES } from "./constants";

export const solveSudokuFor = (id: number, mode: GameMode): string[][] => {
  const { template } = GAMES[mode].find((item) => item.id === id) as Sudoku;

  const getSolution = (sudoku: string[][]): string[][] => {
    const size = sudoku.length;
    const boxSize = Math.sqrt(sudoku.length);

    const findEmptyPosition = (): number[] => {
      for (let r = 0; r < size; r++) {
        const column = sudoku[r];
        for (let c = 0; c < size; c++) {
          if (!column[c]) {
            return [r, c];
          }
        }
      }

      return [];
    };

    const isSudokuValid = ([r, c]: number[], candidat: string): boolean => {
      for (let i = 0; i < size; i++) {
        if (sudoku[r][i] === candidat && i !== c) {
          return false;
        }
      }

      for (let i = 0; i < size; i++) {
        if (sudoku[i][c] === candidat && i !== r) {
          return false;
        }
      }

      const boxRow = Math.floor(r / boxSize) * boxSize;
      const boxCol = Math.floor(c / boxSize) * boxSize;

      for (let i = boxRow; i < boxRow + boxSize; i++) {
        for (let j = boxCol; j < boxCol + boxSize; j++) {
          if (sudoku[i][j] === candidat && i !== r && j !== c) {
            return false;
          }
        }
      }

      return true;
    };

    const solve = () => {
      const positions = findEmptyPosition();

      if (!positions.length) {
        return true;
      }

      for (let i = 1; i <= size; i++) {
        const insertCandidat = i.toString();
        const isValid = isSudokuValid(positions, insertCandidat);

        if (isValid) {
          const [r, c] = positions;
          sudoku[r][c] = insertCandidat;

          if (solve()) {
            return true;
          }

          sudoku[r][c] = "";
        }
      }

      return false;
    };

    solve();
    return sudoku;
  };

  return getSolution(
    template.map((yItem) => {
      return yItem.map((xItem) => xItem);
    })
  );
};

export const check = (payload: string[][], result: string[][]): boolean[][] => {
  const errors = Array.from<unknown, boolean[]>(
    { length: payload.length },
    () => []
  );

  for (let y = 0; y < payload.length; y++) {
    for (let x = 0; x < payload[y].length; x++) {
      const isValue = payload[y][x];
      errors[y][x] = !isValue || payload[y][x] !== result[y][x];
    }
  }

  return errors;
};

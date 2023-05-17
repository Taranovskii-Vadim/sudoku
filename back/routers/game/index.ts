import { Response, Router } from "express";

import { GAMES } from "./constants";
import { CheckReq, GetGameReq } from "./types";
import { check, solveSudokuFor } from "./helpers";

const router = Router();

router.get("/:level", async ({ params }: GetGameReq, res: Response) => {
  try {
    const { level } = params;
    const targetBase = GAMES[level];
    const randomIndex = Math.floor(Math.random() * targetBase.length);

    res.json(targetBase[randomIndex]);
  } catch (e) {
    res.status(500).json({ message: "Unexpected server error" });
  }
});

router.post("/check", async ({ body }: CheckReq, res: Response) => {
  try {
    const { id, template, mode } = body;

    const solvedSudoku = solveSudokuFor(id, mode);
    const result = check(template, solvedSudoku);

    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Unexpected server error" });
  }
});

export default router;

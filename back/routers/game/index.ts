import { Response, Router } from "express";

import { Req } from "./types";
import { GAMES } from "./constants";

const router = Router();

router.get("/:level", async ({ params }: Req, res: Response) => {
  try {
    const { level } = params;
    const targetBase = GAMES[level];
    const randomIndex = Math.floor(Math.random() * targetBase.length);

    res.json(targetBase[randomIndex]);
  } catch (e) {
    res.status(500).json({ message: "Unexpected server error" });
  }
});

export default router;

import { Response, Request, Router } from "express";

const router = Router();

router.get("/", async (r: Request, res: Response) => {
  res.json({ test: "game router" });
});

export default router;

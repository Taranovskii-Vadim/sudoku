import { Router } from "express";

import levelRouter from "./level";
import gameRouter from "./game";

type Prefix = "levels" | "games";

interface AppRouter {
  prefix: Prefix;
  router: Router;
}

export const routers: AppRouter[] = [
  { prefix: "levels", router: levelRouter },
  { prefix: "games", router: gameRouter },
];

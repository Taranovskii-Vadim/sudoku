import express, { json } from "express";

import { routers } from "./routers";

const PORT = 3001;

export const server = express();

server.use(json());

routers.forEach(({ prefix, router }) => {
  const completedPrefix = `/api/${prefix}`;

  server.use(completedPrefix, router);
});

export const connection = server.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

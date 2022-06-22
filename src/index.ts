import express = require("express")
import { ClaimFreeShareUseCase } from "./application/reward/ClaimFreeShareUseCase"
import * as dotenv from "dotenv"
import { BuyFreeShareUseCase } from "./application/reward/BuyFreeShareUseCase";

const app = express();  
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Aplicação escutando na porta ${process.env.PORT}`);
});

app.post("/claim", (req: express.Request, res: express.Response) => {

  const claimFreeShareUseCase = new ClaimFreeShareUseCase();
  claimFreeShareUseCase.execute(2);

  res.json(true);
});

app.post("/buy-share", (req: express.Request, res: express.Response) => {
  const buyFreeShareUseCase = new BuyFreeShareUseCase()
  buyFreeShareUseCase.execute(1)

  res.json(true);
});

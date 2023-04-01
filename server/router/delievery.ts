import { Router } from "express";

const DelieveryRouter = Router();

DelieveryRouter.get("/", (req, res) => {
  //return all delieveries made by the user
  //req.user: User
});

DelieveryRouter.post("/", (req, res) => {
  //create a delievery
});

export default DelieveryRouter;

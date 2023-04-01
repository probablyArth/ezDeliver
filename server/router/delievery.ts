import { Router } from "express";
import { prisma } from "..";

const DelieveryRouter = Router();

DelieveryRouter.get("/",async (req, res) => {
  //return all delieveries made by the user
  //req.user: User

  try {
    const deliveries =await prisma.delievery.findMany({
      where:
      {
        sellerId:req.user.id
      }
    })
    return res.json({deliveries})
    
  } catch (error) {
    res.sendStatus(500);
  }

});

DelieveryRouter.post("/", (req, res) => {
  //create a delievery
  
});

export default DelieveryRouter;

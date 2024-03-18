import { Router } from "express";

function debugRequest(req, res, next) {
  if (process.env.DEBUG) {
    console.log("serving request:", req.method, req.url);
  }
  next();
  if (process.env.DEBUG) {
    console.log("response status:", res.statusCode);
  }
}

function createIngredientsRouter(ingredientsCtrl) {
  const router = Router();
  router.get("/:id/edit", ingredientsCtrl.editFn);
  router.post("/:id/update", ingredientsCtrl.updateFn);
  router.post("/:id/delete", ingredientsCtrl.deleteFn);
  router.get("/:id", ingredientsCtrl.showFn);
  router.get("/", debugRequest, ingredientsCtrl.listFn);
  router.post("/", ingredientsCtrl.createFn);
  return router;
}

export { createIngredientsRouter };

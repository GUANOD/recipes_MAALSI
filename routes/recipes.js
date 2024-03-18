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

function createRouter(recipesControllers) {
  const router = Router();

  router.get("/:id/edit", recipesControllers.editFn);
  router.post("/:id/update", recipesControllers.updateFn);
  router.post("/:id/delete", recipesControllers.deleteFn);
  router.get("/:id", recipesControllers.showFn);
  router.get("/", debugRequest, recipesControllers.listFn);
  router.post("/", recipesControllers.createFn);

  return router;
}

export { createRouter };

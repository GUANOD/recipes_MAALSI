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

function createAuthRouter(authCtrl) {
  const router = Router();
  router.get("/", authCtrl.loginForm);
  router.post("/", authCtrl.login);
  router.get("/create", authCtrl.create);
  router.post("/createpost", authCtrl.createPost);
  router.get("/disconnect", authCtrl.logoff);
  return router;
}

export { createAuthRouter };

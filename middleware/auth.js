export const auth = (req, res, next) => {
  console.log(req.session);
  if (!req.session.login) return res.redirect("/login");
  next();
};

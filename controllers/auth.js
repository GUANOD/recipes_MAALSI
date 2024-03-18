import bcrypt from "bcrypt";
import { User } from "../model/db/models.js";

function createAuthControllers() {
  const loginForm = (req, res) => {
    res.render("loginForm");
  };

  const logoff = (req, res) => {
    req.session.login = null;
    res.send("log out");
  };

  const login = async (req, res) => {
    if (!req.body.password || !req.body.login) return res.send("bad request");

    const matchedUser = await User.find({ login: req.body.login }).exec();
    if (!matchedUser.length) return res.send("no user found");

    if (!(await bcrypt.compare(req.body.password, matchedUser[0].password)))
      return res.send("bad pass");

    req.session.login = matchedUser;

    res.redirect("/");
  };
  const create = (req, res) => {
    res.render("createAccount");
  };
  const createPost = async (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const user = new User({ login: req.body.login, password: hash });
        user.save();
      });
    });
    res.redirect("/");
  };

  return { login, create, loginForm, createPost, logoff };
}

export { createAuthControllers };

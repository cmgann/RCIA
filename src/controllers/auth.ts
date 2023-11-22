import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// enviroment import
import dotenv from "dotenv";

// internal imports
import { AuthUser } from "../dto/authUser";
import { RegisteredUser, UserType } from "../dto/RegisteredUser";
import {
  getUserExistsByUsername,
  addUser,
  getUserByUsername,
  USERS,
  assignUserType,
} from "../data/dataUsers";

function generateAccessToken(username: string) {
  dotenv.config();
  if (process.env.TOKEN_SECRET) {
    return jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
      expiresIn: "1 days",
    });
  } else {
    return;
  }
}

export const register: RequestHandler = async (req, res, next) => {
  // get username from body
  let username = req.body.username;
  let password = req.body.password;
  let usertype = req.body.usertype;

  let finalUserType = assignUserType(usertype);

  if (!username || !password) {
    res.status(400).json("invalid user");
  }

  // let salt = await bcrypt.genSalt(12);

  let encryptedPassword = await bcrypt.hash(password, 12);

  // if username does not exists then send error
  let exists: boolean = getUserExistsByUsername(username);
  if (!exists) return res.status(400).json("user exists");

  // else create token
  const token = generateAccessToken(username);

  if (token && exists) {
    // success
    // create user
    let user: RegisteredUser = {
      id: USERS.length + 1,
      username: username,
      password: encryptedPassword,
      active: true,
      created: new Date(),
      updated: new Date(),
      userType: finalUserType,
    };
    addUser(user);

    res.sendStatus(201);
  } else {
    res.status(500).json("server error");
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  // get username from body
  let username = req.body.username;
  let password = req.body.password;

  // if username does not exists then send error
  if (!username || !password) res.status(400).json("missing information");

  let encryptedPassword = getUserByUsername(username)?.password;

  let valid = bcrypt.compare(
    password,
    encryptedPassword!,
    function (err, result) {
      if (result) {
        const token = generateAccessToken(username);

        if (token) {
          let response: AuthUser = {
            username: username,
            title: getUserByUsername(username)?.userType,
            token: token!,
          };
          // send token
          res.json(response);
        } else {
          res.status(500).json("server error");
        }
      } else {
        res.status(400).json("credentails not valid");
      }
    }
  );
};

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  dotenv.config();
  let token: string = "";
  if (authHeader) {
    token = authHeader;
  }

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
      next();
    }
  );
};

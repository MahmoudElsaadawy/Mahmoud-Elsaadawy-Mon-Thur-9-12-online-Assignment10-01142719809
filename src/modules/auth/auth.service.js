import User from "../../DB/models/user.model.js";
import { successResponse } from "../../utils/responses/success.response.js";
import { conflictException, notFoundException, unauthorizedException } from "../../utils/responses/error.response.js";
import { hash } from "../../utils/security/hashing/hash.js";
import { compare } from "../../utils/security/hashing/compare.js";
import { encrypt, decrypt } from "../../utils/security/encryption/encrypt.js";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, username, email, password, gender, role, phone } =
    req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    conflictException("User Already Exists");
  }
  const userCreated = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: await hash(password),
    gender,
    role,
    phone: await encrypt(phone),
  });

  successResponse({
    res,
    message: "User Created Successfully",
    data: userCreated,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    unauthorizedException("Invalid email or password");
  }

  const matchedPassword = await compare(password, user.password)

  if (!matchedPassword) {
    unauthorizedException("Invalid email or password");
  }
  successResponse({
    res,
    message: "User logged in Successfully",
    data: {
      "encrypted phone": user.phone,
      "decrypted phone": decrypt(user.phone),
      "hashed password": user.password,
    },
  });
};


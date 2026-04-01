import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({
    errors: errors.array(),
  });
};
export const registerValidation = [
  body("username").isString().withMessage("username should be string"),
  body("email").isEmail().withMessage("email should be valid"),
  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("password should be between 6 to 12 character"),

  validate,
];

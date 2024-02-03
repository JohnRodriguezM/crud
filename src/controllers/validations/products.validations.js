import { check } from "express-validator";

const productValidationRules = [
  check("name")
    .exists()
    .withMessage("Name is required, please provide it")
    .isString()
    .withMessage("Name must be a string"),

  check("quantity")
    .exists()
    .withMessage("Quantity is required, please provide it")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  check("price")
    .exists()
    .withMessage("Price is required, please provide it")
    .isInt({ gt: 0 })
    .withMessage("Price must be a positive integer"),

  check("image").optional().isString().withMessage("Image must be a string"),
];

const productUpdateValidationRules = [
  check("name").optional().isString().withMessage("Name must be a string"),

  check("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  check("price")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Price must be a positive integer"),

  check("image").optional().isString().withMessage("Image must be a string"),
];

export { productValidationRules, productUpdateValidationRules };

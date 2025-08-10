import { isValidObjectId } from "mongoose";

export const notFoundHandler = async (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  return next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (req.params.id && !isValidObjectId(req.params.id)) {
    res.status(404);
    return res.json({ message: `Invalid ObjectId of:  ${req.params.id}` });
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "prodution" ? null : err.stack,
  });
};

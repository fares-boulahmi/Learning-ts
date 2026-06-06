import type { Request, Response, NextFunction } from "express";

export const checkNemvalidateNumericId = (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>,
  next: NextFunction,
): void => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    res.status(400).json({ message: "the id must be a number " });
  } else {
    next();
  }
};

export const pleaseAuth = (
  req: Request<{}, unknown, {}, { password: "please" }>,
  res: Response,
  next: NextFunction,
): void => {
  const { password } = req.query;
  if (password != "please") {
    res.status(401).json({ message: "you don't have access for this route " });
  } else {
    next();
  }
};

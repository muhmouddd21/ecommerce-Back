import { verifyJWT } from "../auth";
import { DB } from "../datastore";
import { ExpressHandler } from "../types";

export const authMiddleware:ExpressHandler<any,any> = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const payload = verifyJWT(token);
    let user = await DB.getUserById(payload.userId);
    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    res.locals.user = user;
    next();
  } catch (error: any) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
}
import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server"; // Import your Express app

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res); // Forward request to Express
}
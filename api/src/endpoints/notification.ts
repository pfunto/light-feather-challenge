import { Request, Response } from 'express';
import axios from 'axios';

export async function createNotification(req: Request, res: Response) {
  try {
    const { firstName, lastName, supervisor } = req.body;
    if (!firstName || !lastName || !supervisor) {
      res.status(500).send('Your submission is missing data');
    } else {
      console.log(req.body);
      res.send(req.body);
    }
  } catch (e) {
    console.log(e);
  }
}

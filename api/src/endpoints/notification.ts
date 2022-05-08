import { Request, Response } from 'express';

export async function createNotification(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, phoneNumber, supervisor } = req.body;
    const response = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      supervisor: supervisor,
    };

    if (!firstName || !lastName || !supervisor) {
      res.status(500).send('Your submission is missing data');
    } else {
      console.log(response);
      res.send(response);
    }
  } catch (e) {
    console.log(e);
  }
}

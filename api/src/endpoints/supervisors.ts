import { Request, Response } from 'express';
import axios from 'axios';

export async function getSupervisors(_req: Request, res: Response) {
  try {
    const supervisors = await axios.get(
      'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
    );

    res.send(supervisors.data);
  } catch (e) {
    console.log(e);
  }
}

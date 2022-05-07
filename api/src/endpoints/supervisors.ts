import { Request, Response } from 'express';
import axios from 'axios';

export async function getSupervisors(_req: Request, res: Response) {
  try {
    const managers = await axios.get(
      'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
    );

    const supervisors = [];
    for (let supervisor of managers.data) {
      const { jurisdiction, firstName, lastName } = supervisor;
      supervisors.push(`${jurisdiction} - ${lastName}, ${firstName}`);
    }
    supervisors.sort();
    res.send(supervisors);
  } catch (e) {
    console.log(e);
  }
}

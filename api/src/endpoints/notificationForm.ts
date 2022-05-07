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

// export async function createNotification(req: Request, res: Response) {
//   try {
//     const submission = await axios.post(
//       'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit',
//       {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         phoneNumber: req.body.phoneNumber,
//         supervisor: req.body.supervisor,
//       }
//     );

//     console.log(submission.data);
//   } catch (e) {
//     console.log(e);
//   }
// }

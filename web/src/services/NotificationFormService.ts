import axios from 'axios';
import { NotificationFormFields } from '../components/NotificationForm';

async function getManagers(): Promise<string[]> {
  const response = await axios.get(`http://localhost:8080/api/supervisors`);
  return response.data;
}

async function createNotification({
  firstName,
  lastName,
  email,
  phoneNumber,
  supervisor,
}: NotificationFormFields) {
  const response = await axios.post(`http://localhost:8080/api/submit`, {
    firstName,
    lastName,
    email,
    phoneNumber,
    supervisor,
  });
  return response.data;
}

export { getManagers, createNotification };

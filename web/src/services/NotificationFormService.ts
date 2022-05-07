import axios from 'axios';

async function getManagers() {
  const response = await axios.get(`http://localhost:8080/api/supervisors`);
  return response.data;
}

export { getManagers };

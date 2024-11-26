import axios from 'axios';
import { toast } from 'sonner';

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(
      `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/UserAccount/${userId}`
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch user data");
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchServicesData = async () => {
  try {
    const response = await axios.get(
      `https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/service-list`
    );
    return response.data;
  } catch(error) {
    toast.error("Failed to fetch services data");
    console.error("Error fetching services data:", error);
    throw error;
  }
};

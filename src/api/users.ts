import axios from "./axios";

const getUsers = async () => {
  const response = await axios.get("/users");
  const data = await response.data;
  return data;
};

export { getUsers };

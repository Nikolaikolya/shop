import { HTTP, returningRequest } from "../helpers/Request";

export const register = async (requestData) => {
  const { data } = await HTTP.post("/auth/register", requestData);
  return returningRequest(data);
};

export const login = async (requestData) => {
  const { data } = await HTTP.post("/auth/login", requestData);
  return returningRequest(data);
};

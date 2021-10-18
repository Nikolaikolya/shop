import { HTTP, returningRequest } from "../helpers/Request";

export const getRegions = async () => {
  const { data } = await HTTP.get("/info/regions");
  return returningRequest(data);
};

export const getCities = async (id) => {
  const { data } = await HTTP.get(`/info/city/${id}`);
  return returningRequest(data);
};

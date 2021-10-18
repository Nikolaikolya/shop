import { HTTP, returningRequest } from "../helpers/Request";

export const loadFile = async (requestData, pathName) => {
  const { data } = await HTTP.post(`/load/${pathName}`, requestData);
  return returningRequest(data);
};

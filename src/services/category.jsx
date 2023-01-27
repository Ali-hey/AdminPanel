import httpService from "./httpService";

export const getCategoryServices = (id = null) => {
  return httpService(`/admin/categories${id ? `?parent=${id}` : ""}`, "get");
};

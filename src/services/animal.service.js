import http from "../http-common";
import authHeader from "./auth-header";

class AnimalDataService {
  create(data) {
    return http.post("/animals", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/animals", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/animals/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/animals/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/animals/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/animals`, { headers: authHeader() });
  }
}

export default new AnimalDataService();

import http from "../http-common";
import authHeader from "./auth-header";

class AnimalLocationDataService {
  create(data) {
    return http.post("/animal_locations", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/animal_locations", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/animal_locations/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/animal_locations/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/animal_locations/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/animal_locations`, { headers: authHeader() });
  }
}

export default new AnimalLocationDataService();

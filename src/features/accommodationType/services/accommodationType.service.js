import { HttpClient } from "../../../utils/http/HttpClient";

export class AccommodationTypeService {
  static async getAllAccommodationTypes(signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const HttpClient = new HttpClient({
      baseURL: `${apiUrl}/accommodationTypes`,
      signal,
    });
    return await HttpClient.get("");
  }

  static async getAccommodationTypeById(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/accommodationTypes`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  static async createAccommodationType(accommodationType, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/accommodationTypes`,
      signal,
    });
    return await httpClient.post("/add", accommodationType);
  }

  static async updateAccommodationType(accommodationType, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/accommodationTypes`,
      signal,
    });
    return await httpClient.put("/update", accommodationType);
  }

  static async deleteAccommodationType(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/accommodationTypes`,
      signal,
    });
    return await httpClient.delete(`/delete/${id}`);
  }
}

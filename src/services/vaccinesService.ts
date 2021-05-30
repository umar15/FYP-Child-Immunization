import http from "./httpService";
import { apiURL } from "../config/config.json";

const apiEndPoint = apiURL + "/vaccines";

export function addVaccine(vaccine: any) {
	http.post(`${apiEndPoint}/add`, vaccine);
}

export function getVaccines() {
	return http.get(apiEndPoint);
}

export function getVaccine(id: any) {
	return http.get(`${apiEndPoint}/${id}`);
}

export function deleteVaccine(id: any) {
	return http.delete(`${apiEndPoint}/${id}`);
}

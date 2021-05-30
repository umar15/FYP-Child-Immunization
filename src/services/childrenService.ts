import http from "./httpService";
import { apiURL } from "../config/config.json";

const apiEndPoint = apiURL + "/children";

export function addChild(child: any) {
	http.post(`${apiEndPoint}/add`, child);
}

export function getChildren() {
	return http.get(apiEndPoint);
}

export function getChild(id: any) {
	return http.get(`${apiEndPoint}/${id}`);
}

export function deleteChild(id: any) {
	return http.delete(`${apiEndPoint}/${id}`);
}

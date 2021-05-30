import http from "./httpService";
import { apiURL } from "../config/config.json";

const apiEndPoint = apiURL + "/campaigns";

export function addCampaign(campaign: any) {
	//clone
	// const body = { ...campaign };
	// console.log(body);
	// //update
	// if (campaign.id) {
	// 	//delete _id
	// 	delete body.id;
	// 	return http.post(`${apiEndPoint}/${campaign.id}`, body);
	// }
	http.post(`${apiEndPoint}/add`, campaign);
}

export function getCampaigns() {
	return http.get(apiEndPoint);
}

export function getCampaign(id: any) {
	return http.get(`${apiEndPoint}/${id}`);
}

export function deleteCampaign(id: any) {
	return http.delete(`${apiEndPoint}/${id}`);
}

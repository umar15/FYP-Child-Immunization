import axios from "axios";
import { baseURL, BE_PORT } from "./constants";

const instance = axios.create({
	baseURL: "https://backendproject-335118.uc.r.appspot.com/",
	withCredentials: true,
});

export default instance;

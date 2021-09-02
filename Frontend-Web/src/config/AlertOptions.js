import { transitions, positions } from "react-alert";

export const alertOptions = {
	position: positions.TOP_RIGHT,
	timeout: 3000,
	offset: "10px",
	transition: transitions.SCALE,
	containerStyle: { zIndex: 999999 },
};

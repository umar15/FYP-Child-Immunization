import React from "react";
import axios from "../config/AxiosOptions";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return { ...state, isAuthenticated: true };
		case "SIGN_OUT_SUCCESS":
			return { ...state, isAuthenticated: false };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function UserProvider({ children }) {
	var [state, dispatch] = React.useReducer(userReducer, {
		isAuthenticated: !!localStorage.getItem("user"),
	});

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

function useUserState() {
	var context = React.useContext(UserStateContext);
	if (context === undefined) {
		throw new Error("useUserState must be used within a UserProvider");
	}
	return context;
}

function useUserDispatch() {
	var context = React.useContext(UserDispatchContext);
	if (context === undefined) {
		throw new Error("useUserDispatch must be used within a UserProvider");
	}
	return context;
}

function loginUser(event, dispatch, history, setIsLoading, setError, alert, setErrorMessage) {
	event.preventDefault();

	const login = event.target.username.value,
		password = event.target.password.value;
	setError(false);
	setIsLoading(true);

	axios
		.post("/admin/login", { username: login, password: password })
		.then((res) => {
			localStorage.setItem("user", JSON.stringify(res.data.data.user));
			setError(null);
			setErrorMessage("");
			setIsLoading(false);
			dispatch({ type: "LOGIN_SUCCESS" });
			history.push("/first");
			alert.show("Login Successful", { type: "success" });
		})
		.catch((err) => {
			setError(true);
			setErrorMessage(err.response.data.message || "Error");
			setIsLoading(false);
			alert.show("Login Failed: " + err.response.data.message || "Error", { type: "error" });
		});
}

function signOut(dispatch, history) {
	localStorage.removeItem("user");
	dispatch({ type: "SIGN_OUT_SUCCESS" });
	history.push("/login");
	axios.delete("/logout").catch(() => {});
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

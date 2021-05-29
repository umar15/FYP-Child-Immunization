import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import HospitalDashboard from "./components/dashboard/HospitalDashboard";
import VaccineCenterDashboard from "./components/dashboard/VaccineCenterDashboard";
import Homepage from "./pages/Homepage";
// const BrowserRouter = require("react-router-dom");

function App() {
	return (
		<>
			{/* <Route path="/" exact component={Homepage} />
			<Route path="/hospital" exact component={HospitalDashboard} />
			<Route path="/vaccinecenter" exact component={VaccineCenterDashboard} />
			<Route path="/" exact component={Homepage} /> */}
			<Homepage />
			{/* <HospitalDashboardPage /> */}
			{/* <HospitalDashboard /> */}
			{/* <VaccineCenterDashboard /> */}
		</>
	);
}

export default App;

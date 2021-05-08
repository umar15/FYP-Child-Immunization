import React from "react";
import Header from "./components/header/Header";
import AboutUs from "./components/homepage/AboutUs";
import OurMission from "./components/homepage/OurMission";
import VaccinationTable from "./components/homepage/VaccinationTable";
import Welcome from "./components/welcome/Welcome";

function App() {
	return (
		<div>
			<Header />
			<Welcome />
			<AboutUs />
			<OurMission />
			<VaccinationTable />
		</div>
	);
}

export default App;

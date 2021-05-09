import React from "react";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Header from "./components/header/Header";
import AboutUs from "./components/homepage/AboutUs";
import OurDoctors from "./components/homepage/OurDoctors";
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
			<OurDoctors />
			<Footer />
			<FooterBottom />
		</div>
	);
}

export default App;

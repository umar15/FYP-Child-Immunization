import React from "react";
import AddChild from "./components/child/AddChild";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Header from "./components/header/Header";
import AboutUs from "./components/homepage/AboutUs";
import OurDoctors from "./components/homepage/OurDoctors";
import OurMission from "./components/homepage/OurMission";
import VaccinationTable from "./components/homepage/VaccinationTable";
import Welcome from "./components/homepage/Welcome";
import Login from "./components/login/login";
import Signup from "./components/signup/Signup";
import AddVaccineStock from "./components/vaccineStock/AddVaccineStock";
import AddCampaign from "./components/campaigns/AddCampaign";
import ViewChildren from "./components/child/ViewChildren";
import VaccineCenterHeader from "./components/header/VaccineCenterHeader";
import HospitalHeader from "./components/header/HospitalHeader";
import HospitalDashboard from "./components/dashboard/HospitalDashboard";
import VaccineCenterDashboard from "./components/dashboard/VaccineCenterDashboard";

function App() {
	return (
		<div>
			{/* <Header /> */}
			<VaccineCenterHeader />
			{/* <HospitalHeader /> */}
			{/* <HospitalDashboard /> */}
			<VaccineCenterDashboard />
			{/* <Welcome />
			<AboutUs />
			<OurMission />
			<VaccinationTable />
			<OurDoctors /> */}
			{/* <Signup /> */}
			{/* <Login /> */}
			{/* <AddChild /> */}
			{/* <AddVaccineStock /> */}
			{/* <AddCampaign /> */}
			{/* <ViewChildren /> */}
			<Footer />
			<FooterBottom />
		</div>
	);
}

export default App;

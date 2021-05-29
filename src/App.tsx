import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddCampaign from "./components/campaigns/AddCampaign";
import ViewCampaigns from "./components/campaigns/ViewCampaigns";
import AddChild from "./components/child/AddChild";
import ViewChildren from "./components/child/ViewChildren";
import HospitalDashboard from "./components/dashboard/HospitalDashboard";
import VaccineCenterDashboard from "./components/dashboard/VaccineCenterDashboard";
import AddVaccineStock from "./components/vaccineStock/AddVaccineStock";
import ViewVaccineStock from "./components/vaccineStock/ViewVaccineStock";
import Homepage from "./pages/Homepage";

function App() {
	return (
		<Router>
			<Route path="/" exact component={Homepage} />
			<Route path="/hospital" exact component={HospitalDashboard} />
			<Route path="/vaccinecenter" exact component={VaccineCenterDashboard} />
			<Route path="/hospital/children" exact component={ViewChildren} />
			<Route path="/hospital/children/add" exact component={AddChild} />
			<Route path="/hospital/vaccines" exact component={ViewVaccineStock} />
			<Route path="/hospital/vaccines/add" exact component={AddVaccineStock} />
			<Route path="/vaccinecenter/campaigns" exact component={ViewCampaigns} />
			<Route path="/vaccinecenter/campaigns/add" exact component={AddCampaign} />
		</Router>
	);
}

export default App;

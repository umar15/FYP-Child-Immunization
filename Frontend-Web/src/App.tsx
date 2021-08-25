import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HospitalDashboard from "./components/dashboard/HospitalDashboard";
import VaccineCenterDashboard from "./components/dashboard/VaccineCenterDashboard";
import Login from "./components/login/login";
import Signup from "./components/signup/Signup";
import AddCampaignPage from "./pages/AddCampaignPage";
import AddChildPage from "./pages/AddChildPage";
import AddVaccineStockPage from "./pages/AddVaccineStockPage";
import AddVaccineStockPageH from "./pages/AddVaccineStockPageH";
import CampaignsPage from "./pages/CampaignsPage";
import ChildrenPage from "./pages/ChildrenPage";
import Homepage from "./pages/Homepage";
import VaccineStockPage from "./pages/VaccineStockPage";
import VaccineStockPageH from "./pages/VaccineStockPageH";

function App() {
	return (
		<Router>
			<Route path="/" exact component={Homepage} />
			<Route path="/login" exact component={Login} />
			<Route path="/signup" exact component={Signup} />
			<Route path="/hospital" exact component={HospitalDashboard} />
			<Route path="/vaccinecenter" exact component={VaccineCenterDashboard} />
			<Route path="/hospital/children" exact component={ChildrenPage} />
			<Route path="/hospital/children/add" exact component={AddChildPage} />
			<Route path="/hospital/vaccines" exact component={VaccineStockPageH} />
			<Route path="/hospital/vaccines/add" exact component={AddVaccineStockPageH} />
			<Route path="/vaccinecenter/campaigns" exact component={CampaignsPage} />
			<Route path="/vaccinecenter/campaigns/add" exact component={AddCampaignPage} />
			<Route path="/vaccinecenter/vaccines" exact component={VaccineStockPage} />
			<Route path="/vaccinecenter/vaccines/add" exact component={AddVaccineStockPage} />
		</Router>
	);
}

export default App;

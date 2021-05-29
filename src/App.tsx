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
import AddCampaignPage from "./pages/AddCampaignPage";
import AddChildPage from "./pages/AddChildPage";
import AddVaccineStockPage from "./pages/AddVaccineStockPage";
import CampaignsPage from "./pages/CampaignsPage";
import ChildrenPage from "./pages/ChildrenPage";
import Homepage from "./pages/Homepage";
import VaccineStockPage from "./pages/VaccineStockPage";

function App() {
	return (
		<Router>
			<Route path="/" exact component={Homepage} />
			<Route path="/hospital" exact component={HospitalDashboard} />
			<Route path="/vaccinecenter" exact component={VaccineCenterDashboard} />
			<Route path="/hospital/children" exact component={ChildrenPage} />
			<Route path="/hospital/children/add" exact component={AddChildPage} />
			<Route path="/hospital/vaccines" exact component={VaccineStockPage} />
			<Route path="/hospital/vaccines/add" exact component={AddVaccineStockPage} />
			<Route path="/vaccinecenter/campaigns" exact component={CampaignsPage} />
			<Route path="/vaccinecenter/campaigns/add" exact component={AddCampaignPage} />
			<Route path="/vaccinecenter/vaccines" exact component={VaccineStockPage} />
			<Route path="/vaccinecenter/vaccines/add" exact component={AddVaccineStockPage} />
		</Router>
	);
}

export default App;

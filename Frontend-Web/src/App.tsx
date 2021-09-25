import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HospitalDashboard from "./components/dashboard/HospitalDashboard";
import SubAdminDashboard from "./components/dashboard/SubAdminDashboard";
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
import SubAdminsPage from "./pages/admin/SubAdminsPage";
import AddSubadmin from "./pages/admin/AddSubadmin";
import AddSubadminPage from "./pages/admin/AddSubadminPage";
import HospitalPage from "./pages/admin/hospitals/HospitalPage";
import VaccineCenterPage from "./pages/admin/vaccine center/VaccineCenterPage";
import VaccinesPage from "./pages/admin/vaccines/VaccinesPage";
import AddVaccinePage from "./pages/admin/vaccines/AddVaccinePage";

function App() {
	return (
		<Router>
			<Route path="/" exact component={Homepage} />
			<Route path="/login" exact component={Login} />
			<Route path="/signup" exact component={Signup} />
			{/* <Route path="/hospital" exact component={HospitalDashboard} />
			<Route path="/vaccinecenter" exact component={VaccineCenterDashboard} />
			<Route path="/hospital/children" exact component={ChildrenPage} />
			<Route path="/hospital/children/add" exact component={AddChildPage} />
			<Route path="/hospital/vaccines" exact component={VaccineStockPageH} />
			<Route path="/hospital/vaccines/add" exact component={AddVaccineStockPageH} />
			<Route path="/vaccinecenter/campaigns" exact component={CampaignsPage} />
			<Route path="/vaccinecenter/campaigns/add" exact component={AddCampaignPage} />
			<Route path="/vaccinecenter/vaccines" exact component={VaccineStockPage} />
			<Route path="/vaccinecenter/vaccines/add" exact component={AddVaccineStockPage} /> */}
			<Route path="/admin" exact component={AdminDashboard} />
			<Route path="/admin/subadmins" exact component={SubAdminsPage} />
			<Route path="/admin/subadmins/:id" exact component={AddSubadminPage} />
			<Route path="/admin/hospitals" exact component={HospitalPage} />
			<Route path="/admin/vaccinecenters" exact component={VaccineCenterPage} />
			<Route path="/admin/vaccines" exact component={VaccinesPage} />
			<Route path="/admin/vaccines/:id" exact component={AddVaccinePage} />
			{/* <Route path="/admin/subadmins/edit" exact component={AddSubadminPage} /> */}
			<Route path="/subadmin" exact component={SubAdminDashboard} />
		</Router>
	);
}

export default App;

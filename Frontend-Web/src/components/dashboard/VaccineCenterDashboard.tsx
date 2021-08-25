import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { IoMdAddCircle } from "react-icons/io";
import { GiLoveInjection } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import { AiFillFolderAdd } from "react-icons/ai";
import ViewVaccineStock from "../vaccineStock/ViewVaccineStock";
import "../../index.css";
import VaccineCenterHeader from "../header/VaccineCenterHeader";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";

const VaccineCenterDashboard = () => {
	const iconSize = 20;
	return (
		<div className="hospital-dashboard">
			<VaccineCenterHeader />
			<Container className="hospital-container">
				<Row>
					<Col lg="3" className="sidebar">
						<ul>
							<li>
								<Link className="link" to="/vaccinecenter">
									<FaUserEdit size={iconSize} className="sidebar-icon" />
									Update Child Vaccine
								</Link>
							</li>
							<li>
								<a>
									<Link className="link" to="/vaccinecenter/campaigns">
										<SiCampaignmonitor size={iconSize} className="sidebar-icon" />
										View Campaigns
									</Link>
								</a>
							</li>
							<li>
								<Link className="link" to="/vaccinecenter/campaigns/add">
									<AiFillFolderAdd size={iconSize} className="sidebar-icon" />
									Add Campaign
								</Link>
							</li>
							<li>
								<Link className="link" to="/vaccinecenter/vaccines">
									<GiLoveInjection size={iconSize} className="sidebar-icon" />
									Vaccine Stock
								</Link>
							</li>
							<li>
								<Link className="link" to="/vaccinecenter/vaccines/add">
									<IoMdAddCircle size={iconSize} className="sidebar-icon" />
									Add Vaccine Stock
								</Link>
							</li>
						</ul>
					</Col>
					<Col lg="9" className="data-table">
						<ViewVaccineStock />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</div>
	);
};

export default VaccineCenterDashboard;

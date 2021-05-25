import React from "react";
import { Container, Col, Row } from "reactstrap";
import { IoMdAddCircle } from "react-icons/io";
import { GiLoveInjection } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import { AiFillFolderAdd } from "react-icons/ai";
import ViewVaccineStock from "../vaccineStock/ViewVaccineStock";

const VaccineCenterDashboard = () => {
	const iconSize = 20;
	return (
		<div className="hospital-dashboard">
			<Container className="hospital-container">
				<Row>
					<Col lg="3" className="sidebar">
						<ul>
							<li>
								<FaUserEdit size={iconSize} className="sidebar-icon" />
								Update Child Vaccine
							</li>
							<li>
								<a>
									<SiCampaignmonitor size={iconSize} className="sidebar-icon" />
									View Campaigns
								</a>
							</li>
							<li>
								<AiFillFolderAdd size={iconSize} className="sidebar-icon" />
								Add Campaign
							</li>
							<li>
								<GiLoveInjection size={iconSize} className="sidebar-icon" />
								Vaccine Stock
							</li>
							<li>
								<IoMdAddCircle size={iconSize} className="sidebar-icon" />
								Add Vaccine Stock
							</li>
						</ul>
					</Col>
					<Col lg="9" className="data-table">
						<ViewVaccineStock />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default VaccineCenterDashboard;

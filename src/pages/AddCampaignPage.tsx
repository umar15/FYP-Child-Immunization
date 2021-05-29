import React from "react";
import { Container, Col, Row } from "reactstrap";
import { IoMdAddCircle } from "react-icons/io";
import { GiLoveInjection } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import { AiFillFolderAdd } from "react-icons/ai";
import "../index.css";
import VaccineCenterHeader from ".././components/header/VaccineCenterHeader";
import Footer from ".././components/footer/Footer";
import FooterBottom from ".././components/footer/FooterBottom";
import AddCampaign from "../components/campaigns/AddCampaign";

const AddCampaignPage = () => {
	const iconSize = 20;
	return (
		<div className="hospital-dashboard">
			<VaccineCenterHeader />
			<Container className="hospital-container">
				<Row>
					<Col lg="3" className="sidebar" style={{ height: "750px" }}>
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
						<AddCampaign />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</div>
	);
};

export default AddCampaignPage;

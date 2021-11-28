import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import ChildVaccinationSchedule from "./ChildVaccinationSchedule";

const ChildVaccinationSchedulePage = () => {
	return (
		<>
			<AdminHeader userType="Admin" />
			<Container className="admin-container">
				<Row>
					<Col lg="3">
						<Sidebar height="1000px" />
					</Col>
					<Col lg="9">
						<ChildVaccinationSchedule />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default ChildVaccinationSchedulePage;

import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import Vaccines from "./Vaccines";

const VaccinesPage = () => {
	return (
		<>
			<AdminHeader userType="Vaccine Center" />
			<Container className="admin-container">
				<Row>
					<Col lg="3">
						<Sidebar />
					</Col>
					<Col lg="9">
						<Vaccines />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default VaccinesPage;

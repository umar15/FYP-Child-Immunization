import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import Children from "./Children";

const ChildrenPage = () => {
	return (
		<>
			<AdminHeader userType="Admin" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar height="1000px" />
					</Col>
					<Col lg="9">
						<Children />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default ChildrenPage;

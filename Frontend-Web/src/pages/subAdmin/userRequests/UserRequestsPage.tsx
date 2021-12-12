import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import UserRequests from "./UserRequests";

const UserRequestsPage = () => {
	return (
		<>
			<AdminHeader userType="Sub Admin" />

			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9">
						<UserRequests />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default UserRequestsPage;

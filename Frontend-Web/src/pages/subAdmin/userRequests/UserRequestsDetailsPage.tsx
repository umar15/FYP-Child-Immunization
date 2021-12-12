import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import UserRequestsDetails from "./UserRequestsDetails";

const UserRequestsDetailsPage = () => {
	return (
		<>
			<AdminHeader userType="Sub Admin" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9">
						<UserRequestsDetails />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default UserRequestsDetailsPage;

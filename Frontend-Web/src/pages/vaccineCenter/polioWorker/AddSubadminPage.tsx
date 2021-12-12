import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "../Sidebar";
import AddSubadmin from "./AddSubadmin";

const AddSubadminPage = () => {
	return (
		<>
			<AdminHeader />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9" style={addSubadminStyles}>
						<AddSubadmin />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

const addSubadminStyles = {
	marginTop: "30px",
};

export default AddSubadminPage;

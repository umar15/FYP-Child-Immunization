import React from "react";
import { Container, Col, Row } from "reactstrap";
import ViewVaccineStock from "../vaccineStock/ViewVaccineStock";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";
import AdminHeader from "../header/AdminHeader";

const SubAdminDashboard = () => {
	return (
		<div className="hospital-dashboard">
			<AdminHeader />
			<Container className="hospital-container">
				<Row>
					<Col lg="3" className="sidebar">
						<ul>
							<li>
								<Link className="link" to="/hospital/children">
									Area Statistics
								</Link>
							</li>
							<li>
								<Link className="link" to="/hospital/children/add">
									Children
								</Link>
							</li>
							<li>
								<Link className="link" to="/hospital/children">
									Organizations
								</Link>
							</li>
							<li>
								<Link className="link" to="/hospital/vaccines">
									Vaccine Stock
								</Link>
							</li>
							<li>
								<Link className="link" to="/hospital/vaccines/add">
									Add vaccine stock
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

export default SubAdminDashboard;

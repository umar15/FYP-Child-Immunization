import React from "react";
import { Container, Col, Row } from "reactstrap";
import ViewChildren from "../child/ViewChildren";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { GiLoveInjection } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";

const HospitalDashboard = () => {
	const iconSize = 20;
	return (
		<div className="hospital-dashboard">
			<Container className="hospital-container">
				<Row>
					<Col lg="3" className="sidebar">
						<ul>
							<li>
								<a>
									<BsPeopleFill size={iconSize} className="sidebar-icon" />
									View Children
								</a>
							</li>
							<li>
								<IoPersonAdd size={iconSize} className="sidebar-icon" />
								Add child
							</li>
							<li>
								<GiLoveInjection size={iconSize} className="sidebar-icon" />
								Vaccine Stock
							</li>
							<li>
								<IoMdAddCircle size={iconSize} className="sidebar-icon" />
								Add vaccine stock
							</li>
							<li>
								<FaUserEdit size={iconSize} className="sidebar-icon" />
								Update Child Vaccine
							</li>
						</ul>
					</Col>
					<Col lg="9" className="data-table">
						<ViewChildren />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default HospitalDashboard;

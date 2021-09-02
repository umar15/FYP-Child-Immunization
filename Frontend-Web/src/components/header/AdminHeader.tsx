import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import "../../index.css";
import logo from "../../assets/images/logo-two.png";

const AdminHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className="header">
			<Navbar className="nav-bar" light expand="md">
				<NavbarBrand href="/" className="logo">
					<img src={logo} style={{ marginLeft: "-30px" }} width="60px" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>Child Immunization</h6>
							</NavLink>
						</NavItem>
					</Nav>
					<NavbarText>
						<h5>Admin Panel</h5>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default AdminHeader;

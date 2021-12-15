import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import "../../index.css";
import { signOut, useUserDispatch } from "../../context/userContext";
import { withRouter, useHistory } from "react-router-dom";
import logo from "../../assets/images/logoo.png";
import { sign } from "crypto";
import { HiDatabase } from "react-icons/hi";
import axios from "../../config/AxiosOptions";
import { useAlert } from "react-alert";

const AdminHeader = (props) => {
	const [data, setData] = useState<any>();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const history = useHistory();
	const userDispatch = useUserDispatch();
	const alert = useAlert();

	const getUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				setData(res.data?.data.user);
			})
			.catch((err) =>
				alert.show("Failed to fetch user!", {
					type: "error",
				})
			);
	};
	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="header">
			<Navbar className="nav-bar" light expand="md">
				<NavbarBrand href="/" className="logo">
					<img src={logo} style={{ marginLeft: "-150px" }} width="60px" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>
									{data?.name} {`${props.userType} Dashboard` || "Child Immunization"}
								</h6>
							</NavLink>
						</NavItem>
					</Nav>
					<NavbarText>
						<button className="default-btn" onClick={() => signOut(userDispatch, history)}>
							Logout
						</button>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default AdminHeader;

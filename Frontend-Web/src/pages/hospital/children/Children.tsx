import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";
import ChildData from "./ChildData";

const Children = () => {
	const [children, setChildren] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

	const getChildren = async () => {
		axios
			.get("/hospital/children")
			.then((res) => {
				console.log(res.data.data);
				setChildren(res.data?.data);
				setLoading(false);
				Reminders();
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	// 86400000 miliseconds in a day
	const Reminders = () => {
		let dob, bt, vd;
		children?.map((child: any) => {
			dob = new Date(child.dateOfBirth);
			bt = new Date();
			// let six_Week = dob.getTime() + (86400000 * 42);  // 6 weeks reminder
			// let ten_Week = dob.getTime() + (86400000 * 70);  // 10 weeks reminder
			// let forteen_Week = dob.getTime() + (86400000 * 98);  // 14 weeks reminder
			// let nine_months = dob.getTime() + (86400000 * 270);  // 9 months reminder
			// let fifteen_months = dob.getTime() + (86400000 * 450);  // 15 months reminder

			vd = bt.getTime() + 20000; // 30s reminder

			setInterval(async () => {
				axios.get(`/hospital/reminders/${child._id}`).then((res: any) => console.log(res));
			}, vd);
		});
	};

	useEffect(() => {
		getChildren();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}
	if (children.length == 0) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<h4>No child added.</h4>
			</div>
		);
	}

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="9">
					<h3>Children</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/hospital/child/add" style={linkStyles}>
							Add Child
						</a>
					</button>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Child ID</th>
								<th>Parent Name</th>
								<th>Parent CNIC</th>
								<th>Contact No</th>
								<th>Gender</th>
								<th>View Details</th>
							</tr>
						</thead>
						<tbody>
							{children &&
								children.map((child: any, index) => (
									<tr key={child._id}>
										{/* {console.log(child.dateOfBirth.getTime())} */}
										<th scope="row">{index + 1}</th>
										<td>{child.childID}</td>
										<td>{child.parentName}</td>
										<td>{child.parentCNIC}</td>
										<td>{child.contactNo}</td>
										<td>{child.gender}</td>
										<td>
											<Link
												to={{
													pathname: `/hospital/children/${child._id}`,
													state: {
														data: child,
													},
												}}
											>
												view
											</Link>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const editStyles = {
	cursor: "pointer",
	color: "green",
};
const deleteStyles = {
	cursor: "pointer",
	color: "red",
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const rowStyles = {
	cursor: "pointer",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Children;

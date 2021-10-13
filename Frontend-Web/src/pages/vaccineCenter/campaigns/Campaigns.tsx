import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Campaigns = () => {
	const [campaigns, setCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getCampaigns = async () => {
		axios
			.get("/vaccinecenter/campaigns")
			.then((res) => {
				console.log(res.data.data);
				setCampaigns(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch campaigns", {
					type: "error",
				})
			);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/vaccinecenter/campaigns/${id}`)
			.then((res) => {
				alert.show("Campaign deleted successfully!", {
					type: "success",
				});
				setCampaigns(campaigns.filter((item: any) => item._id !== id));
			})
			.catch((err) => {
				alert.show("Failed to delete campaign. Try again later", {
					type: "error",
				});
			});
	};

	const notifyPublic = (id) => {
		axios
			.get(`vaccinecenter/campaigns/notify/${id}`)
			.then((res: any) => {
				console.log(res.data);
				alert.show(res.data.message, {
					type: "success",
				});
			})
			.catch((err) =>
				alert.show("Failed to notify public. Try again later", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getCampaigns();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="9">
					<h3>Campaigns</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/vaccinecenter/campaigns/add" style={linkStyles}>
							Add campaign
						</a>
					</button>
				</Col>
			</Row>
			{/* <Row>
				<Col>
					<h3>Sub Admins</h3>
				</Col>
			</Row> */}
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Campaign ID</th>
								{/* <th>Vaccine Center</th> */}
								<th>Area</th>
								<th>No. of Workers</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Campaign Status</th>
								<th>Notify Public</th>
								{/* <th>Edit</th>
								<th>Delete</th>
								<th>Notify Public</th> */}
							</tr>
						</thead>
						<tbody>
							{campaigns &&
								campaigns.map((campaign: any, index) => (
									<tr key={campaign._id}>
										<th scope="row">{index + 1}</th>
										<td>{campaign.campaignID}</td>
										{/* <td>{campaign.vaccineCenter}</td> */}
										<td>{campaign.area}</td>
										<td>{campaign.noOfWorkers}</td>
										<td>{campaign.startDate}</td>
										<td>{campaign.endDate}</td>
										<td>{campaign.status}</td>
										{/* <td>
											<Link
												to={{
													pathname: `/vaccinecenter/campaigns/${campaign._id}`,
													state: {
														campaign,
													},
												}}
											>
												<BiEdit style={editStyles} size="20" />
											</Link>
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(campaign._id)}
												style={deleteStyles}
												size="20"
											/>
										</td> */}
										<td>
											<button className="default-btn" onClick={() => notifyPublic(campaign._id)}>
												notify
											</button>
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

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Campaigns;

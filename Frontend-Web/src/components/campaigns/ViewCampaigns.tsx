import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getCampaigns, deleteCampaign } from "../../services/campaignsService";

const ViewCampaigns = () => {
	const [campaigns, setCampaigns] = useState([]);

	async function getAllCampaigns() {
		const allCampaigns = await getCampaigns();
		console.log("All campaigns ", campaigns);
		setCampaigns(allCampaigns.data);
		console.log(campaigns);
	}

	const handleDelete = (id: any) => {
		deleteCampaign(id);
		setCampaigns(
			campaigns.filter((campaign) => {
				const { _id } = campaign;
				return _id !== id;
			})
		);
	};

	const handleEdit = () => {
		console.log("Edit");
	};

	useEffect(() => {
		getAllCampaigns();
	}, []);

	return (
		<div style={{ marginLeft: "15%" }} className="display-table">
			<Container>
				<h2 className="table-heading">Campaigns Details</h2>
				<div className="form-group search-field">
					<input type="text" className="form-control" name="area" placeholder="Search campaigns" />
					<button type="button" className="btn btn-primary">
						Search
					</button>
				</div>
				<Table hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Campaign Status</th>
							<th>Campaign Area</th>
							<th># of workers</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{campaigns &&
							campaigns.map((campaign) => {
								// console.log(campaign);
								const { _id, campaignID, status, area, noOfWorkers, startDate, endDate } = campaign;
								return (
									<tr key={campaignID}>
										<td>{campaignID}</td>
										<td>{status}</td>
										<td>{area}</td>
										<td>{noOfWorkers}</td>
										<td>{startDate}</td>
										<td>{endDate}</td>
										<td>
											<a style={{ cursor: "pointer" }} onClick={handleEdit}>
												<BiEdit className="editIcon" />
											</a>
										</td>
										<td>
											<a style={{ cursor: "pointer" }} onClick={() => handleDelete(_id)}>
												<AiFillDelete className="deleteIcon" />
											</a>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default ViewCampaigns;

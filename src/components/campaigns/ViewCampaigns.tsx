import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import VaccineCenterHeader from "../header/VaccineCenterHeader";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";

const ViewCampaigns = () => {
	return (
		<div style={{ marginLeft: "15%" }} className="display-table">
			<Container>
				<h2 className="table-heading">Campaigns Details</h2>
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Campaign Status</th>
							<th>Campaign Area</th>
							<th># of workers</th>
							<th>Vaccine quantity allotted</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Active</td>
							<td>G-6 Islamabad</td>
							<td>5</td>
							<td>40</td>
							<td>1/6/21</td>
							<td>1/7/21</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Active</td>
							<td>G-6 Islamabad</td>
							<td>5</td>
							<td>40</td>
							<td>1/6/21</td>
							<td>1/7/21</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Active</td>
							<td>G-6 Islamabad</td>
							<td>5</td>
							<td>40</td>
							<td>1/6/21</td>
							<td>1/7/21</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">4</th>
							<td>Active</td>
							<td>G-6 Islamabad</td>
							<td>5</td>
							<td>40</td>
							<td>1/6/21</td>
							<td>1/7/21</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">5</th>
							<td>Active</td>
							<td>G-6 Islamabad</td>
							<td>5</td>
							<td>40</td>
							<td>1/6/21</td>
							<td>1/7/21</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default ViewCampaigns;

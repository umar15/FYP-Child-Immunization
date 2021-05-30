import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import { addCampaign } from "../../services/campaignsService";

const AddCampaign = () => {
	const makecampaignID = () => {
		let campaignID = "CM-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) campaignID += possible.charAt(Math.floor(Math.random() * possible.length));
		return campaignID;
	};

	const [campaignID, setCampaignID] = useState(makecampaignID());
	const [status, setStatus] = useState("active");
	const [area, setArea] = useState("");
	const [noOfWorkers, setNoOfWorkers] = useState("5");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const handleDateChange = (date: any) => {
		setStartDate(date);
	};
	const handleEndDateChange = (date: any) => {
		setEndDate(date);
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		const newCampaign = {
			campaignID,
			status,
			area,
			noOfWorkers,
			startDate,
			endDate,
		};

		try {
			await addCampaign(newCampaign);
			alert("Campaign Added");
		} catch (err) {
			alert(err);
		}
		window.location.replace("/campaigns");
	};

	return (
		<div className="add-form">
			<Container>
				<div className="section-title">
					<h2>Add Campaign</h2>
				</div>
				<Row>
					<Col>
						<div className="add-campaign">
							<form onSubmit={handleFormSubmit}>
								<Row>
									<Col lg="12">
										<div className="form-group">
											<select
												value={status}
												onChange={(e) => setStatus(e.target.value)}
												className="form-control"
											>
												<option value="campaign">Campaign Status</option>
												<option value="active">Active</option>
												<option value="inactive">Inactive</option>
											</select>
										</div>
									</Col>
									<Col lg="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="area"
												placeholder="Campaign Area"
												value={area}
												onChange={(e) => setArea(e.target.value)}
											/>
										</div>
									</Col>
									<Col lg="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="numWorkers"
												placeholder="No. of workers"
												value={noOfWorkers}
												onChange={(e) => setNoOfWorkers(e.target.value)}
											/>
										</div>
									</Col>
									{/* <Col lg="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="vaccineQuantity"
												placeholder="Vaccine Quantity"
												value={area}
												onChange={(e) => setArea(e.target.value)}
											/>
										</div>
									</Col> */}
									<Col lg="12">
										<div className="form-group">
											<DatePicker
												className="form-control"
												// value={startDate}
												selected={startDate}
												onChange={handleDateChange}
											/>
										</div>
									</Col>
									<Col lg="12">
										<div className="form-group">
											<DatePicker
												className="form-control"
												// value={endDate}
												selected={endDate}
												onChange={handleEndDateChange}
											/>
										</div>
									</Col>

									<Col lg="12">
										<button className="default-btn add-stock-btn" type="submit">
											Add Campaign
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddCampaign;

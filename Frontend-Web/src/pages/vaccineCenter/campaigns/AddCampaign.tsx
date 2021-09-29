import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCampaign = (props) => {
	const campID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [data, setData] = useState<any>({
		campaignID: "",
		status: "",
		area: "",
		noOfWorkers: 5,
		startDate: new Date(),
		endDate: new Date(),
		vaccineCenter: "",
	});
	const campaign: any = location.state ? location.state : "";
	console.log("Campaign: ", campaign);

	React.useEffect(() => {
		if (campID.id === "add") {
			return;
		} else {
			campID.id !== "add" &&
				setData({
					campaignID: "",
					status: "",
					area: "",
					noOfWorkers: 5,
					startDate: new Date(),
					endDate: new Date(),
					vaccineCenter: "",
				});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (campID.id == "add") {
			axios
				.post("/vaccinecenter/campaigns/add", data)
				.then((res) => {
					console.log("add: ", res);
					alert.show("Campaign added successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/campaigns");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to add campaign.", {
						type: "error",
					});
				});
		} else {
			axios
				.put(`/vaccinecenter/campaigns/${campID.id}`, data)
				.then((res) => {
					console.log("update", res);
					alert.show("Campaign updated successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/campaigns");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to update campaign", {
						type: "error",
					});
				});
		}
		console.log(data);
	};

	const handleStartDateChange = (date: any) => {
		setData({
			...data,
			startDate: date,
		});
	};
	const handleEndDateChange = (date: any) => {
		setData({
			...data,
			endDate: date,
		});
	};

	return (
		<Container>
			{/* {console.log("subadmin", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col lg="12">
									<div className="form-group">
										<select
											value={data.status}
											onChange={(e) =>
												setData({
													...data,
													status: e.target.value,
												})
											}
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
											value={data.area}
											onChange={(e) =>
												setData({
													...data,
													area: e.target.value,
												})
											}
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
											value={data.noOfWorkers}
											onChange={(e) =>
												setData({
													...data,
													noOfWorkers: e.target.value,
												})
											}
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
											selected={data.startDate}
											onChange={handleStartDateChange}
										/>
									</div>
								</Col>
								<Col lg="12">
									<div className="form-group">
										<DatePicker
											className="form-control"
											// value={endDate}
											selected={data.endDate}
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
	);
};

const headerStyles = {
	marginBottom: "20px",
	marginLeft: "30%",
};

const formStyles = {
	marginLeft: "20%",
	height: "700px",
};

export default AddCampaign;

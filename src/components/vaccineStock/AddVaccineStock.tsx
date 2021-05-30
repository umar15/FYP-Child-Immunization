import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import { addVaccine } from "../../services/vaccinesService";

const AddVaccineStock = () => {
	const makeVaccineID = () => {
		let vaccineID = "VC-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) vaccineID += possible.charAt(Math.floor(Math.random() * possible.length));
		return vaccineID;
	};

	const [vaccineID, setVaccineID] = useState(makeVaccineID());
	const [name, setName] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [quantity, setQuantity] = useState("50");
	const [expiryDate, setExpiryDate] = useState(new Date());

	const handleDateChange = (date: any) => {
		setExpiryDate(date);
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		const newVaccine = {
			vaccineID,
			name,
			manufacturer,
			quantity,
			expiryDate,
		};

		try {
			await addVaccine(newVaccine);
			alert("Vaccine Added");
		} catch (err) {
			alert(err);
		}
		window.location.href = "/hospital/vaccines";
	};

	return (
		<div className="add-form">
			<Container>
				<div className="section-title">
					<h2>Add Vaccine Stock</h2>
				</div>
				<Row>
					<Col>
						<div className="add-campaign">
							<form method="post" onSubmit={handleFormSubmit}>
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<select
												value={name}
												onChange={(e) => setName(e.target.value)}
												className="form-control"
											>
												<option value="0">Vaccine Name</option>
												<option value="hapititus A">Hapititus A</option>
												<option value="polio">Polio</option>
												<option value="measles">Measles</option>
												<option value="influenza">Influenze</option>
												<option value="homophiles">Homophiles</option>
												<option value="hapititus B">Hapititus B</option>
											</select>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="manufacturer"
												placeholder="Manufacturer"
												value={manufacturer}
												onChange={(e) => setManufacturer(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="quantity"
												value={quantity}
												onChange={(e) => setQuantity(e.target.value)}
												placeholder="Quantity"
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<DatePicker
												className="form-control"
												// value={endDate}
												selected={expiryDate}
												onChange={handleDateChange}
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<button className="default-btn add-stock-btn" type="submit">
											Add Vaccine Stock
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

export default AddVaccineStock;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../index.css";

const AddVaccineStock = () => {
	return (
		<div className="signup-area">
			<Container>
				<div className="section-title">
					<h2>Add Vaccine Stock</h2>
				</div>
				<Row>
					<Col>
						<div className="add-child-form">
							<form method="post">
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<select className="form-control">
												<option value="0">Vaccine Name</option>
												<option value="1">Hapititus A</option>
												<option value="2">Polio</option>
												<option value="0">Measles</option>
												<option value="1">Influenze</option>
												<option value="2">Homophiles</option>
												<option value="2">Hapititus B</option>
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
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="number" className="form-control" name="quantity" placeholder="Quantity" />
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="date"
												// onFocus={type="date"}
												className="form-control"
												name="expiry"
												placeholder="Expiry Date"
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

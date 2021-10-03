import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import signUpImg from "../../assets/images/sign-up-img.jpg";
import "../../index.css";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";
import Header from "../header/Header";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "../../config/AxiosOptions";

const Signup = () => {
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "",
		password: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [confirmPass, setConfirmPass] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.password === confirmPass) {
			axios
				.post("/users/create", data)
				.then((res) => {
					console.log(res);
					alert.show("User added successfully!", {
						type: "success",
					});
					history.push("/login");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to signup. please try again!", {
						type: "error",
					});
				});
		} else {
			alert.show("Password donot match with confirm password", {
				type: "error",
			});
		}

		console.log(data);
	};
	return (
		<>
			<Header />
			<div className="signup-area">
				<Container>
					<div className="section-title">
						<h2>Create an account!</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id
							dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio
						</p>
					</div>
					<Row>
						<Col lg="6">
							<div className="signup-form">
								<form onSubmit={handleSubmit}>
									<Row>
										<Col md="12" sm="12">
											<div className="form-group">
												<select
													value={data.userType}
													onChange={(e) => setData({ ...data, userType: e.target.value })}
													className="form-control"
												>
													<option value="">Sign up As</option>
													<option value="hospital">Hospital</option>
													<option value="vaccinecenter">Vaccine center</option>
												</select>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="text"
													className="form-control"
													name="name"
													placeholder="Name"
													value={data.name}
													onChange={(e) => setData({ ...data, name: e.target.value })}
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="email"
													className="form-control"
													name="email"
													placeholder="Email Address"
													value={data.email}
													onChange={(e) => setData({ ...data, email: e.target.value })}
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="password"
													className="form-control"
													name="password"
													placeholder="Password"
													value={data.password}
													onChange={(e) => setData({ ...data, password: e.target.value })}
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="password"
													className="form-control"
													name="password"
													placeholder="Confirm Password"
													value={confirmPass}
													onChange={(e) => setConfirmPass(e.target.value)}
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="text"
													className="form-control"
													name="name"
													placeholder="Address"
													value={data.address.addr}
													onChange={(e) =>
														setData({ ...data, address: { ...data.address, addr: e.target.value } })
													}
												/>
											</div>
										</Col>
										<Col md="6" sm="12">
											<div className="form-group">
												<input
													type="text"
													className="form-control"
													name="name"
													placeholder="Area"
													value={data.address.area}
													onChange={(e) =>
														setData({ ...data, address: { ...data.address, area: e.target.value } })
													}
												/>
											</div>
										</Col>
										<Col md="6" sm="12">
											<div className="form-group">
												<input
													type="text"
													className="form-control"
													name="name"
													placeholder="City"
													value={data.address.city}
													onChange={(e) =>
														setData({ ...data, address: { ...data.address, city: e.target.value } })
													}
												/>
											</div>
										</Col>
										<Col md="12" sm="12" className="form-condition">
											<div style={{ marginBottom: "20px" }} className="agree-label">
												<input type="checkbox" id="chb1" />
												<label htmlFor="chb1">
													I agree with your <a href="/privacy-policy"> Privacy Policy</a> &amp;
													<a href="/terms-conditions"> Terms Conditions</a>
												</label>
											</div>
										</Col>
										<Col md="12" sm="12">
											<button className="default-btn signup-btn" type="submit">
												Sign up
											</button>
										</Col>
										<Col md="12" sm="12">
											<p style={{ marginTop: "20px" }} className="account-desc">
												Already have an account? <a href="/login">Log In</a>
											</p>
										</Col>
									</Row>
								</form>
							</div>
						</Col>
						<Col lg="6">
							<div className="signup-img">
								<img src={signUpImg} />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default Signup;

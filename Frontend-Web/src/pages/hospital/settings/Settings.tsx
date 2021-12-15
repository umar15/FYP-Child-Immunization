import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { validEmail, validPassword, validString, validMobileNumber } from "../../../config/regex";
import { selectCity } from "../../../config/cities";

const Settings = () => {
	const [id, setId] = useState("");
	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "hospital",
		password: "",
		phoneNo: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [error, setError] = useState<any>({
		email: false,
		name: false,
		cnic: false,
		userType: false,
		password: false,
		phoneNo: false,
		address: {
			addr: false,
			area: false,
			city: false,
		},
	});
	const alert = useAlert();
	const [confirmPass, setConfirmPass] = useState("");

	const handleChange = (name, value, regex) => {
		if (name === "addr" || name === "area" || name === "city") {
			setData({
				...data,
				address: {
					...data.address,
					[name]: value,
				},
			});
			if (!regex.test(data.address[name])) {
				setError({
					...error,
					address: {
						...error.address,
						[name]: true,
					},
				});
			} else {
				setError({
					...error,
					address: {
						...error.address,
						[name]: false,
					},
				});
			}
		} else {
			setData({
				...data,
				[name]: value,
			});
			if (!regex.test(data[name])) {
				setError({
					...error,
					[name]: true,
				});
			} else {
				setError({
					...error,
					[name]: false,
				});
			}
		}
	};

	const getUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				setId(res.data?.data.user._id);
				setData({
					email: res.data?.data.user.email,
					name: res.data?.data.user.name,
					cnic: res.data?.data.user.cnic,
					userType: res.data?.data.user.userType,
					phoneNo: res.data?.data.user.phoneNo,
					address: {
						addr: res.data?.data.user.address.addr,
						area: res.data?.data.user.address.area,
						city: res.data?.data.user.address.city,
					},
				});
			})
			.catch((err) =>
				alert.show("Failed to fetch user!", {
					type: "error",
				})
			);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Data in submit", data);
		if (error.name === true || error.email === true || error.password === true || error.phoneNo === true) {
			alert.show("Please solve the above errors in the form!", {
				type: "error",
			});
		} else {
			if (data.password === confirmPass) {
				axios
					.put(`/users/${id}`, data)
					.then((res) => {
						alert.show("Profile updated syccessfully!!", {
							type: "success",
						});
					})
					.catch((err) => {
						alert.show("Failed to update profile. Please try again later!", {
							type: "error",
						});
					});
			} else {
				alert.show("Password must match with confirm password!", {
					type: "error",
				});
			}
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			<Row style={{ maxWidth: "90%" }} className="subadmin-admin">
				<Col lg="12">
					<h3>Update Profile</h3>
				</Col>
			</Row>
			<Row style={{ maxWidth: "90%" }}>
				{console.log("data: ", data)}
				<form onSubmit={(e) => handleSubmit(e)}>
					<Row>
						<Col md="12" sm="12">
							<div className="form-group">
								<select
									value={data?.userType}
									onChange={(e) => setData({ ...data, userType: e.target.value })}
									className="form-control"
									disabled
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
									required
									type="text"
									className="form-control"
									name="name"
									placeholder="Name"
									value={data.name}
									onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
								/>
								{error.name && <p className="err">Invalid Name!</p>}
							</div>
						</Col>
						<Col md="12" sm="12">
							<div className="form-group">
								<input
									required
									type="email"
									title="i.e abc@mail.com"
									className="form-control"
									name="email"
									placeholder="Email Address"
									value={data.email}
									onChange={(e) => handleChange(e.target.name, e.target.value, validEmail)}
								/>
								{error.email && <p className="err">Your email is invalid</p>}
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="password"
									className="form-control"
									name="password"
									placeholder="Password"
									value={data.password}
									onChange={(e) => handleChange(e.target.name, e.target.value, validPassword)}
									// onChange={(e) => setData({ ...data, password: e.target.value })}
									// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
									title="Mininmum 6 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 2 numbers"
								/>
								{error.password && <p className="err">Invalid password!</p>}
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="password"
									className="form-control"
									name="confirmPassword"
									placeholder="Confirm Password"
									value={confirmPass}
									onChange={(e) => setConfirmPass(e.target.value)}
									// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
									title="Mininmum 7 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 2 numbers"
								/>
							</div>
						</Col>
						<Col md="12" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="phoneNo"
									placeholder="Phone Number +923151234569"
									value={data.phoneNo}
									title="e.g +923151234567"
									onChange={(e) => handleChange(e.target.name, e.target.value, validMobileNumber)}
									// onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
								/>
								{error.phoneNo && <p className="err">Invalid phone number!</p>}
							</div>
						</Col>
						<Col md="12" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="addr"
									placeholder="Address"
									value={data.address.addr}
									onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
								/>
								{/* {error.address.addr && <p className="err">Invalid address!</p>} */}
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="area"
									placeholder="Area"
									value={data.address.area}
									onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
								/>
								{/* {error.address.area && <p className="err">Invalid area!</p>} */}
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<select
									required
									className="form-control"
									name="city"
									placeholder="City"
									value={data.address.city}
									onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
								>
									<option value="">City</option>
									{selectCity()}
								</select>
							</div>
						</Col>
						<Col md="12" sm="12">
							<button className="default-btn signup-btn" type="submit">
								Update Profile
							</button>
						</Col>
					</Row>
				</form>
			</Row>
		</Container>
	);
};

export default Settings;

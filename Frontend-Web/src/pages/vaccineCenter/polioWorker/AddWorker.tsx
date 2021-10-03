import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddWorker = (props) => {
	const workerID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "worker",
		password: "",
		parentOrg: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [confirmPass, setConfirmPass] = useState("");
	const worker: any = location.state ? location.state : "";
	console.log("Worker a: ", worker);

	const getCurrentUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				console.log("user: ", res.data.data.user);
				setData({
					...data,
					parentOrg: res.data.data.user._id,
				});
			})
			.catch((err) => console.log("Error: ", err));
	};

	// const { worker } = location.state;
	console.log("id", workerID.id);

	React.useEffect(() => {
		getCurrentUser();
		if (workerID.id === "add") {
			return;
		} else {
			workerID.id !== "add" &&
				setData({
					email: worker ? worker.worker.email : "",
					name: worker ? worker.worker.name : "",
					cnic: worker ? worker.worker.cnic : "",
					userType: "worker",
					parentOrd: worker ? worker.worker.parentOrg : "",
					password: worker ? worker.worker.password : "",
					address: {
						addr: worker ? worker.worker.address.addr : "",
						area: worker ? worker.worker.address.area : "",
						city: worker ? worker.worker.address.city : "",
					},
				});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);

		if (workerID.id === "add") {
			if (data.password === confirmPass) {
				axios
					.post("/vaccinecenter/workers/add", data)
					.then((res) => {
						console.log(res);
						alert.show("worker added successfully!", {
							type: "success",
						});
						history.push("/vaccinecenter/workers");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to add worker", {
							type: "error",
						});
					});
			} else {
				alert.show("Password donot match with confirm password", {
					type: "error",
				});
			}
		} else {
			axios
				.put(`/vaccinecenter/workers/${workerID.id}`, data)
				.then((res) => {
					console.log(res);
					alert.show("worker updated successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/workers");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to update worker", {
						type: "error",
					});
				});
		}
	};

	return (
		<Container>
			{/* {console.log("worker", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col md="12" sm="12">
									<h3 style={headerStyles}>{workerID.id == "add" ? "Add worker" : "Update worker"}</h3>
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
								<Col md="12" sm="12">
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
								<Col md="12" sm="12">
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
								<Col md="12" sm="12">
									<button type="submit" className="default-btn signup-btn">
										{workerID.id === "add" ? "Add" : "Update"}
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

export default AddWorker;

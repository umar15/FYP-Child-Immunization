import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "800px" }} className="sidebar">
			<ul>
				<li>
					<Link className="link" to="/hospital/">
						dashboard
					</Link>
				</li>
				<li>
					<Link className="link" to="/hospital/children">
						Children
					</Link>
				</li>
				{/* <li>
					<Link className="link" to="/hospital/children">
						Children
					</Link>
				</li> */}
				<li>
					<Link className="link" to="/hospital/vaccines">
						Vaccine Stock
					</Link>
				</li>
				{/* <li>
					<Link className="link" to="/admin/vaccinecenters">
						Vaccine Centers
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/vaccines">
						Vaccine Stock
					</Link>
				</li> */}
				{/* <li>
					<Link className="link" to="/admin/children">
						Children
					</Link>
				</li> */}
				<li>
					<Link className="link" to="/admin/reports">
						Reports
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/settings">
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

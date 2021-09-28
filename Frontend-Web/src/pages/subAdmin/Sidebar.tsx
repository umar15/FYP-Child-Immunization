import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "800px" }} className="sidebar">
			<ul>
				<li>
					<Link className="link" to="/subadmin">
						dashboard
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/hospitals">
						Hospitals
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/vaccinecenters">
						Vaccine Centers
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/vaccines">
						Vaccine Stock
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/children">
						Children
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/reports">
						Reports
					</Link>
				</li>
				<li>
					<Link className="link" to="/subadmin/settings">
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<ul>
				<li>
					<Link className="link" to="/admin">
						dashboard
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/subadmins">
						Sub Admins
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/hospitals">
						Hospitals
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/vaccinecenters">
						Vaccine Centers
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/vaccines">
						Vaccine Stock
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/children">
						Children
					</Link>
				</li>
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

import React from "react";
import { AppName } from "../Constants";

export function Header() {
	return (
		<header className="bg-red-800 p-3 text-gray-300">
			{AppName}
		</header>
	);
}
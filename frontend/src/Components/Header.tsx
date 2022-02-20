import React from "react";
import { AppName } from "../Constants";

export function Header() {
	return (
		<header className="bg-red-800 p-5 text-gray-300">
			{AppName}
		</header>
	);
}
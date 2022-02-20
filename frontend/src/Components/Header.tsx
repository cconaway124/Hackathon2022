import React from "react";
import { AppName } from "../Constants";

export function Header() {
	return (
		<header className="flex bg-red-800 text-3xl p-5 text-gray-300">
			<span className="ml-auto mr-auto">{AppName}</span>
		</header>
	);
}
import React from "react";
import { TestPoster } from "../Constants";
import { Post, User } from "../Types/Post";

export interface PostProps {
	post: Post
}

export function DisplayUser({ user }: { user: User }) {
	return (
		<div>
			<span className="font-bold">{user.name}</span>
		</div>
	);
}

export function DisplayPost({ post }: PostProps) {
	return (
		<div className="w-full p-5 m-3 bg-gradient-to-r from-gray-400 to-gray-400 hover:from-gray-400 hover:via-gray-400 hover:to-red-800 rounded">
			<DisplayUser user={post.poster} />
			<span className="bg-red-800 mt-2 p-1 rounded-lg text-white">{post.posterTag}</span> looking for <span className="bg-red-800 mt-2 p-1 rounded-lg text-white">{post.lookingForTag}</span><br></br>
			{post.description}
		</div>
	);
}

/*
bg-[#babab8]
bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
bg-gradient-to-r from-gray-500 to-red-500
bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
*/
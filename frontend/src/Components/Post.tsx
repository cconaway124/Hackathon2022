import React from "react";
import { TestPoster } from "../Constants";
import { Post, PostWithUser, User } from "../Types/Post";

export interface PostProps {
	post: PostWithUser
}

export function DisplayUser({ user }: { user: User }) {
	return (
		<div>
			<span>{user.name}</span>
		</div>
	);
}

export function DisplayPost({ post }: PostProps) {
	return (
		<div className="w-full p-3 m-3 bg-gradient-to-r from-gray-500 to-gray-500 hover:from-gray-500 hover:via-gray-500 hover:to-red-800 rounded">
			<DisplayUser user={post.poster} />
			{post.posterTag} looking for {post.lookingForTag}<br></br>
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
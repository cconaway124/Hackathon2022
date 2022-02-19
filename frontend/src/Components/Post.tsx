import React from "react";
import { TestPoster } from "../Constants";
import { Post, User } from "../Types/Post";

export interface PostProps {
	post: Post
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
		<div className="w-full p-3 m-3">
			<DisplayUser user={post.poster} />
			{post.posterTag} looking for {post.lookingForTag}<br></br>
			{post.description}
		</div>
	);
}
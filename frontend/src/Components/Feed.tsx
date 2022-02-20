import { ChangeEvent, useCallback, useState } from "react";
import { TestPoster } from "../Constants";
import { Status, useAPIRequest, useGetAllPosts, useGetAllUsers, useGetPostsByUserID } from "../Hooks/databaseRequests";
import { Post, PostWithUser, User } from "../Types/Post";
import { DisplayPost } from "./Post";

type Filter<T> = Partial<{
	[key in keyof T]: (value: T[key]) => boolean
}>
type UniqueValues<T> = Partial<{
	[key in keyof T]: Set<T[key]>
}>
type Displayers<T> = {
	[key in keyof T]: (value: T[key]) => string
}

export function Feed({ user }: { user: User }) {
	const roles = useAPIRequest<string[]>("/roles")

	const [filterRole, setFilterRole] = useState<string | null>(null)

	const filter = useCallback(({ target }: ChangeEvent<Element>) => {
		const tany = target as any
		console.log(tany.value)
		console.log(tany.option)
		setFilterRole(target.nodeValue)
	}, [])

	const requestForPosts = useGetAllPosts()

	console.log(requestForPosts)

	return (
		<div className="w-2/3 ml-auto mr-auto">
			<div className="flex place-content-center ">
				{
					<select onChange={filter}>
						{roles.value?.map(x => <option value={x}>{x}</option>)}
					</select>
				}
			</div>
			{(requestForPosts.isLoading) ?
				<span>Loading...</span>
				: (requestForPosts.value?.map((post, i) => (
					<div key={i} className="shadow-md rounded-md">
						<DisplayPost post={post as unknown as PostWithUser} />
					</div>
				)))}
		</div>
	);
}
import { TestPoster } from "../Constants";
import { Status, useGetAllPosts, useGetAllUsers, useGetPostsByUserID } from "../Hooks/databaseRequests";
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
	const users = useGetAllUsers()
	console.log(users.value)


	const requestForPosts = useGetAllPosts()

	// for (const post of posts) {
	// 	for (const key in post) {
	// 		const keyAsKey = key as keyof Post
	// 		if (uniques[keyAsKey] == undefined) {
	// 			uniques[keyAsKey] = new Set<Post[typeof keyAsKey]>() as any
	// 		}
	// 		uniques[keyAsKey]?.add(post[keyAsKey] as any)
	// 	}
	// }
	// console.log(uniques, displayer)

	return (
		<div className="w-2/3 ml-auto mr-auto">
			{/* <div className="flex place-content-center ">
				{
					Object.entries(uniques).map(([key, value]) => {
						const disp = displayer[key as keyof Post]
						console.log(key, value)
						const arr = Array.of(value)
						console.log(arr)
						return (<select key={key}>
							{[...value].map(opt => (
								<option key={opt.toString()}>{disp(opt as any)}</option>
							))}
						</select>)
					})}
			</div> */}
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
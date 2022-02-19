import { TestPoster } from "../Constants";
import { Post, User } from "../Types/Post";
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
	const posts: Post[] = []
	for (let i = 0; i < 10; i++) {
		posts.push({
			poster: TestPoster,
			posterTag: "PosterTag1",
			lookingForTag: "LookingForTag1",
			description: "Description"
		})
		posts.push({
			poster: TestPoster,
			posterTag: "PosterTag2",
			lookingForTag: "LookingForTag2",
			description: "Description"
		})
	}

	const filters: Filter<Post> = {

	}
	const uniques: UniqueValues<Post> = {

	}

	const displayer: Displayers<Post> = {
		poster: (p) => p.name,
		posterTag: (p) => p,
		lookingForTag: (p) => p,
		description: (p) => p,
	}

	for (const post of posts) {
		for (const key in post) {
			const keyAsKey = key as keyof Post
			if (uniques[keyAsKey] == undefined) {
				uniques[keyAsKey] = new Set<Post[typeof keyAsKey]>() as any
			}
			uniques[keyAsKey]?.add(post[keyAsKey] as any)
		}
	}
	console.log(uniques, displayer)

	return (
		<div className="w-2/3 ml-auto mr-auto">
			<form>
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
			</form>
			{posts.map((post, i) => (
				<div key={i} className="shadow-md rounded-md">
					<DisplayPost post={post} />
				</div>
			))}
		</div>
	);
}
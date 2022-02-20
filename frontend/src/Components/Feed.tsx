import { ChangeEventHandler, FormEventHandler, useState } from "react";
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
	const [posts, setPosts] =
		useState<Post[]>([{
			poster: { userId: 4, name: "Hunter McClure", email: "hunter.mcclure@wsu.edu", roles: [] },
			posterTag: "Driver",
			lookingForTag: "Passengers",
			description: "On my way to Spokane! Any takers?"
		}, {
			poster: { userId: 4, name: "Chase Conaway", email: "chase.conaway@wsu.edu", roles: [] },
			posterTag: "CS Tutor",
			lookingForTag: "Students",
			description: "I've taken 121, 122, and 123, as well as a bunch of math!"
		}, {
			poster: { userId: 4, name: "Aden Slade", email: "aden.slade@wsu.edu", roles: [] },
			posterTag: "CS122 Textbook",
			lookingForTag: "Buyer",
			description: "$35"
		}, {
			poster: { userId: 4, name: "Marcel Mukundi", email: "marcel.mukundi@wsu.edu", roles: [] },
			posterTag: "Party-goer",
			lookingForTag: "Ride home",
			description: "Partied to hard at the Coug, need a ride home"
		},


		{
			poster: { userId: 4, name: "Alex O'Conner", email: "hunter.mcclure@wsu.edu", roles: [] },
			posterTag: "Driver",
			lookingForTag: "Passengers",
			description: "On my way to the west side"
		}, {
			poster: { userId: 4, name: "Roger Robbin", email: "aden.slade@wsu.edu", roles: [] },
			posterTag: "Eng402 Textbook",
			lookingForTag: "Buyer",
			description: "$15"
		},
		{
			poster: { userId: 4, name: "Hannah Trenner", email: "chase.conaway@wsu.edu", roles: [] },
			posterTag: "GenEd Tutor",
			lookingForTag: "Students",
			description: "Physics, algebra, english, etc. $10/hr"
		}, {
			poster: { userId: 4, name: "Martin John", email: "marcel.mukundi@wsu.edu", roles: [] },
			posterTag: "Party-goer",
			lookingForTag: "Ride home",
			description: "Partied to hard at the Coug, need a ride home"
		}])

	function setter(oldSetter: Function): FormEventHandler {
		return function ({ target }) {
			oldSetter((target as any).value)
		}
	}

	const [name, setName] = useState<string>("")
	const [pr, setPostRole] = useState<string>("")
	const [lr, setLookingRole] = useState<string>("")
	const [desc, setDescription] = useState<string>("")

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

	function add() {
		console.log("hi")
		posts.push({
			poster: { userId: 4, name, email: "marcel.mukundi@wsu.edu", roles: [] },
			posterTag: pr,
			lookingForTag: lr,
			description: desc
		})
		console.log(name, pr, lr, desc)
		setPosts([...posts])
	}

	return (
		<div className="w-2/3 ml-auto mr-auto">
			<div className="flex place-content-center ">
				{
					Object.entries(uniques).map(([key, value]) => {
						const disp = displayer[key as keyof Post]
						console.log(key, value)
						const arr = Array.of(value)
						console.log(arr)
						return (<select className="bg-gray-400" key={key}>
							{[...value].map(opt => (
								<option key={JSON.stringify(opt)}>{disp(opt as any)}</option>
							))}
						</select>)
					})}
				<button className="bg-red-800 mt-2 p-3 rounded-lg text-white" onClick={add}>Add Post + </button>
			</div>
			<div className="bg-red-800 p-3 m-3 text-white rounded-md">
				Name: <input className="text-black m-2" onInput={setter(setName)} /><br />
				<input className="text-black m-2" onInput={setter(setPostRole)} />
				looking for <input className="text-black m-2" onInput={setter(setLookingRole)} /><br />
				Description: <input className="text-black m-2" onInput={setter(setDescription)} />
			</div>
			{posts.map((post, i) => (
				<div key={i} className="shadow-md rounded-md">
					<DisplayPost post={post} key={JSON.stringify(post.poster)} />
				</div>
			))}
		</div>
	);
}
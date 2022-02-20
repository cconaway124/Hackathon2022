export type Role = string

export interface User {
	userID: number,
	name: string
	email: `${string}@${string}.${string}`
	roles: string[]
}

export interface Post {
	postID: number,

	replyingToID: number,

	poster: User["userID"]

	posterTag: Role
	lookingForTag: Role

	description: string
}

export type PostWithUser = Omit<Post, "poster"> & {
	poster: User
}
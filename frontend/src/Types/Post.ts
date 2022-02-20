export type Role = string

export interface User {
	userId: number,
	name: string
	email: `${string}@${string}.${string}`
	roles: string[]
}

export interface Post {
	poster: User

	posterTag: Role
	lookingForTag: Role

	description: string
}
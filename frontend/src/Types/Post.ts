export type Role = string

export interface User {
	userId: number,
	name: string
	email: `${string}@${string}.${string}`
	roles: string[]
}

export interface Post {
	poster: User["userId"]

	posterTag: Role
	lookingForTag: Role

	description: string
}
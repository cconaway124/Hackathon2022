export type Role = string

export interface User {
	name: string
	email: `${string}@${string}.${string}`
	roles: Role[]
}

export interface Post {
	poster: User

	posterTag: Role
	lookingForTag: Role

	description: string
}
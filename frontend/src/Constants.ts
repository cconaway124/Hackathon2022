import { User } from "./Types/Post"

export const AppName: string = "Looking4"

export const APIUrl: string =
	process.env.NODE_ENV === "production" ? "https://wsu-hackathon-2022-server-ma5du.ondigitalocean.app" : "api"

export const TestPoster: User = { userID: 4, name: "Poster", email: "post@email.email", roles: [] }
export const TestResponder: User = { userID: 3, name: "Responder", email: "respond@email.email", roles: [] }
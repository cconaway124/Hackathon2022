import { useEffect, useState } from "react";
import { APIUrl } from "../Constants";
import { Post, User } from "../Types/Post";

export const enum Status {
	NotSent,
	Loading,
	Success,
	Fail
}

type ModifiedInit = Omit<RequestInit, "body"> & { body: any }

export function useRequest<T>(url: string, init?: ModifiedInit) {
	const [value, setValue] = useState<T>()
	const [status, setStatus] = useState<Status>(Status.NotSent)
	const [error, setError] = useState<any>(null)

	if (init) {
		init.body = JSON.stringify(init.body)
	}
	const actualInit: RequestInit | undefined = init as RequestInit;

	useEffect(() => {
		fetch(url, actualInit).then(returnedValue => {
			returnedValue.json().then(setValue)
			setStatus(Status.Success)
		}).catch(returnedError => {
			setError(returnedError)
			setStatus(Status.Fail)
		})
	}, [init, url])
	useEffect(() => {
		setStatus(Status.Loading)
	}, [])

	return {
		value, status, error, isLoading: status === Status.Loading
	}
}

export function useAPIRequest<T>(route: string, init?: ModifiedInit) {
	return useRequest<T>(`${APIUrl}/${route}`, init);
}


export function useGetPostById(postId: number) {
	return useAPIRequest(`/post/${postId}`);
}
export function useCreatePost(post: Post) {
	return useAPIRequest<Post["postID"]>(`/post`, { method: "POST", body: post });
}

export function useCreateUser(user: User) {
	return useAPIRequest<User["userID"]>('/user', { method: "POST", body: user })
}
export function useGetUserByUId(userID: number) {
	return useAPIRequest<User>(`/user/${userID}`)
}

export function useGetRepliesByPost(postID: number) {
	return useAPIRequest<Post[]>(`/allReplies/${postID}`)
}

export function useGetPostsByUserID(userID: number) {
	return useAPIRequest<Post[]>(`/allPosts/${userID}`)
}

export function useGetAllPosts() {
	return useAPIRequest<Post[]>(`/allPosts`)
}

export function useGetAllUsers() {
	return useAPIRequest<User[]>(`/users`)
}
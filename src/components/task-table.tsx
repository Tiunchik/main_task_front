import {AppProps} from "next/app";
import {useEffect, useState} from "react";
import {Task} from "../domains/task";
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function TasksTable(): JSX.Element {
    const { data, error } = useSWR<Task[]>('http://localhost:8080/api/v1/tasks', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            {
                data.map((el: Task) => <p key={el.id}>{el.name} - {el.description} </p>)
            }
        </>
    )

}

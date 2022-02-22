import {AppProps} from "next/app";
import {useEffect, useState} from "react";
import {Task} from "../src/domains/task";
import TasksTable from "../src/components/task-table";
import {Box, Button, Container} from "@mui/material";
import TaskDialog from "../src/components/task-dialog";

export default function Tasks({Component, pageProps}: AppProps): JSX.Element {

    return (
        <>
            <TaskDialog />
            <TasksTable />
        </>
    )
}




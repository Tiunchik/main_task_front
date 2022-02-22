import {Box, Button, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

export default function TaskCreate() {
    const [name, setName] = useState<string>('')
    let descr = ''
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="name"
                    label="Required"
                    helperText="Task name"
                    value={name}
                />
                <TextField
                    required
                    id="description"
                    label="Disabled"
                    helperText="Task description"
                    value={descr}
                />
            </div>
            <Button onClick={() => createTask(name, descr)}>
                Send
            </Button>
        </Box>
    )
}


const createTask = (name: string, description: string): void => {
    console.log(`name is ${name} and description is ${description}`)
}

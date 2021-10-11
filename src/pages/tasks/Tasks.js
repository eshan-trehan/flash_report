import React from 'react'
import { Button } from '@material-ui/core'
import PageTitle from '../../components/PageTitle/PageTitle'

function Tasks() {
    return (
        <>
        <PageTitle 
        title="Tasks"
        button={
        <Button
        variant="contained"
        size="medium"
        color="secondary">
        Create Task
        </Button>}/> 
        </>
    )
}

export default Tasks

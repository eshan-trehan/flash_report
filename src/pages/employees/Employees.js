import React from 'react'
import { Button } from '@material-ui/core'
import PageTitle from '../../components/PageTitle/PageTitle'

function Employees() {
    /* 
        Display all the employees satisfying the query
    */
    return (
        <>
        <PageTitle 
        title="Employees"
        button={
        <Button
        variant="contained"
        size="medium"
        color="secondary">
        Create Employee
        </Button>}/> 
        </>
    )
}

export default Employees

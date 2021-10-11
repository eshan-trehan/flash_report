import React from 'react'
import { Button } from '@material-ui/core'

import PageTitle from '../../components/PageTitle/PageTitle'

function Reports() {
    return (
        <>
        <PageTitle 
        title="Reports"
        button={
        <Button
        variant="contained"
        size="medium"
        color="secondary">
        Create Report
        </Button>}/>  
        </>
    )
}

export default Reports

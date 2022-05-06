import * as React from 'react'
import Orders from '../Dashboard/Orders'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Grid, Paper } from '@mui/material'

const steps = [
  'Not Registered',
  'Registration Pending',
  'Fully Registered'
]

export default function Status() {
  const [studentStatus, setStudentStatus] = React.useState(0)
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3>Your Status</h3>
        <Stepper activeStep={studentStatus} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Grid>
  )
}

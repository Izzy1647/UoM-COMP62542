import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import LinearProgress from '@mui/material/LinearProgress'
import { Button, Grid, Paper, Box } from '@mui/material'
import { getStatus, updateStatus } from '../../api/status'
import UserDataManager from '../../model/UserDataManager'

const steps = ['Not Registered', 'Registration Pending', 'Fully Registered']

export default function Status() {
  // retrieve data from singleton UserData
  const userData = UserDataManager.getInstance()

  const [showLoading, setShowLoading] = React.useState(false)
  const [status, setStatus] = React.useState(userData.getUserData().status)

  React.useEffect(() => {
    getStudentStatus()
  }, [])

  const getStudentStatus = async () => {
    const res = await getStatus()
    setStatus(res.status)
  }

  const handleUpdateStatus = async () => {
    setShowLoading(true)
    try {
      const res = await updateStatus(status)
      alert(res.message)
      setShowLoading(false)
    } catch {
      setShowLoading(false)
      alert('Server error. Try again later please.')
    }
  }

  return (
    <Grid item xs={12}>
      {showLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3>Your Status</h3>
        <Stepper activeStep={status} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <p>
          What to do now:{' '}
          {status === 0
            ? 'pay the tuition fee :)'
            : status === 1
            ? 'wait for the status update :)'
            : 'congrats you are fully registered. You may check your calendar or opt in courses.'}
        </p>
        {status === 0 && (
          <Button onClick={handleUpdateStatus} variant="text" color="success">
            I have paid my fee
          </Button>
        )}
      </Paper>
    </Grid>
  )
}

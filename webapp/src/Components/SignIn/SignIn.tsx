import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CssBaseline from '@mui/material/CssBaseline'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { login } from '../../api/signin'

const cookies = new Cookies()
const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  React.useEffect(() => {
    if(localStorage.getItem('studentId')) {
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // store studentId if rememberMe checked
    // remove stored studentId if different studentId applied and not checked
    const studentId = data.get('studentId') as string
    if (rememberMe) {
      localStorage.setItem('studentId', studentId)
    } else {
      let storedStudentId = localStorage.getItem('studentId')
      if (studentId !== storedStudentId) {
        localStorage.removeItem('studentId')
      }
    }

    try {
      const res = await login(data)
      const { token } = res
      cookies.set('token', token)
      sessionStorage.setItem('user', JSON.stringify(res.user))
      if (res.status) {
        navigate('/dashboard/status', {state: {status: res.user.status}})
      } else {
        setShowAlert(true)
      }
    } catch {
      setShowAlert(true)
    }
  }

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  const handleRemberMeCheck = (event: any) => {
    const checked = event.target.checked
    setRememberMe(checked)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            // onClose={handleCloseAlert}
            severity="warning"
            sx={{ width: '100%' }}
          >
            Error, try later. Check your student ID and your internet.
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={localStorage.getItem('studentId')}
              name="studentId"
              label="Your student ID"
              type="studentId"
              id="studentId"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} />}
              label="Remember me"
              onChange={handleRemberMeCheck}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

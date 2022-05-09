import * as React from 'react'
import {
  Scheduler,
  WeekView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from 'moment'
// import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import { styled, alpha } from '@mui/material/styles'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ViewState } from '@devexpress/dx-react-scheduler'
// import appointments from './mock-today-appointments'
import { EActivityType, getActivities, postActivity } from '../../api/calendar'

const PREFIX = 'Demo'

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`
}

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  ({ theme }) => ({
    [`&.${classes.todayCell}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.14)
      },
      '&:focus': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16)
      }
    },
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04)
      },
      '&:focus': {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04)
      }
    }
  })
)

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  ({ theme }) => ({
    [`&.${classes.today}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.16)
    },
    [`&.${classes.weekend}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06)
    }
  })
)

const TimeTableCell = (props: any) => {
  const { startDate } = props
  const date = new Date(startDate)

  if (date.getDate() === new Date().getDate()) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />
    )
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />
    )
  }
  return <StyledWeekViewTimeTableCell {...props} />
}

const DayScaleCell = (props: any) => {
  const { startDate, today } = props

  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.today} />
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />
  }
  return <StyledWeekViewDayScaleCell {...props} />
}

// activities data fetched from the server
interface IActivityValue {
  activityName: string
  time: string
  type: string
}

interface ICalendarValue {
  startDate: Date
  endDate: Date
  title: string
  location: string
}

const processActivityData = (data: IActivityValue): ICalendarValue => {
  const { time, activityName } = data

  const [weekday, startTime, endTime] = time.split('-')

  const resStartTime = moment()
    .startOf('week')
    .add('days', Number(weekday))
    .set('hour', Number(startTime.slice(0, 2)))
    .set('minute', Number(startTime.slice(2)))

  const resEndTime = moment()
    .startOf('week')
    .add('days', Number(weekday))
    .set('hour', Number(endTime.slice(0, 2)))
    .set('minute', Number(endTime.slice(2)))

  return {
    startDate: resStartTime.toDate(),
    endDate: resEndTime.toDate(),
    title: activityName,
    location: ''
  }
}

const Calendar = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [appointments, setAppointments] = React.useState([{}])
  const [newActivityType, setNewActivityType] = React.useState('')
  const [weekday, setWeekday] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [duration, setDuration] = React.useState('')
  const [showLinearProgress, setshowLinearProgress] = React.useState(false)
  const [mountInProgress, setMountInProgress] = React.useState(true)

  async function fetchActivities() {
    const res = await getActivities()
    setMountInProgress(false)
    // data: IActivityValue[]
    const activites = res.data as IActivityValue[]
    const appointments = activites.map(item => processActivityData(item))
    setAppointments(appointments)
  }

  // fetch activities data
  React.useEffect(() => {
    fetchActivities()
  }, [])

  const onClickNewActivity = () => {
    setModalOpen(true)
  }

  const toggleModal =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setModalOpen(open)
    }

  const handleNewActivityTypeSelect = (event: SelectChangeEvent) => {
    setNewActivityType(event.target.value as string)
  }

  const handleWeekdaySelect = (event: SelectChangeEvent) => {
    setWeekday(event.target.value as string)
  }

  const handleStartTimeSelect = (event: SelectChangeEvent) => {
    setStartTime(event.target.value as string)
  }
  const handleDurationSelect = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string)
  }

  const concatTime = (day: string, hour: string, duration: string) => {
    return `${day}-${hour}00-${Number(hour) + Number(duration)}00`
  }

  const handleSubmitNewActivity = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const day = data.get('weekday') as string
    const hour = data.get('startTime') as string
    const duration = data.get('duration') as string

    const time = concatTime(day, hour, duration)
    const type = data.get('type') as EActivityType
    const activityName = data.get('activityName') as string

    setshowLinearProgress(true)
    const postRes = await postActivity(activityName, type, time)
    if (postRes.status !== 1) {
      alert('Something goes wrong, check and try again.')
    }
    setshowLinearProgress(false)

    setModalOpen(false)
    window.location.reload()
  }

  const boxInModalStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      {mountInProgress && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {/* @ts-ignore */}
      <Scheduler data={appointments} height={580}>
        <ViewState />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>

      <Modal
        open={modalOpen}
        onClose={toggleModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={boxInModalStyle}
          component="form"
          onSubmit={handleSubmitNewActivity}
        >
          {showLinearProgress && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}

          <TextField
            margin="normal"
            fullWidth
            // required
            name="activityName"
            label="Activity name"
            id="activityName"
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Activity type</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="activityType"
              value={newActivityType}
              label="Activity type"
              onChange={handleNewActivityTypeSelect}
              name="activityType"
            >
              <MenuItem value={EActivityType.Tutorial}>Tutorial</MenuItem>
              <MenuItem value={EActivityType.Meeting}>Meeting</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel>Pick a day</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="weekday"
              value={weekday}
              label="Pick a day"
              onChange={handleWeekdaySelect}
              name="weekday"
            >
              {weekdays.map((day, index) => {
                return (
                  <MenuItem key={day} value={index + 1}>
                    {day}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel>Start time</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="startTime"
              value={startTime}
              label="Start time"
              onChange={handleStartTimeSelect}
              name="startTime"
            >
              {Array.from({ length: 9 }, (_, i) => i + 10).map(item => {
                return (
                  <MenuItem key={item} value={item}>{`${item}:00`}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="duration"
              value={duration}
              label="Duration"
              onChange={handleDurationSelect}
              name="duration"
            >
              <MenuItem value={'1'}>1 hour</MenuItem>
              <MenuItem value={'2'}>2 hours</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField
            // required
            id="startTime"
            margin="normal"
            label="Start time"
            type="datetime-local"
            defaultValue="2022-05-09T10:00"
            name="startTime"
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            required
            id="endTime"
            margin="normal"
            label="End time"
            type="datetime-local"
            defaultValue="2022-05-09T12:00"
            name="endTime"
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true
            }}
          /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            SUBMIT
          </Button>
        </Box>
      </Modal>
      <Button
        onClick={onClickNewActivity}
        style={{ margin: '20px auto' }}
        variant="contained"
      >
        NEW ACTIVITY
      </Button>
    </>
  )
}

export default Calendar

import * as React from 'react'
import {
  Scheduler,
  WeekView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from 'moment'
// import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import { styled, alpha } from '@mui/material/styles'
import { ViewState } from '@devexpress/dx-react-scheduler'
// import appointments from './mock-today-appointments'
import { getActivities } from '../../api/calendar'

const PREFIX = 'Demo'

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`
}

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
  console.log(time)

  // !!time[0] to be modified after api update
  const [weekday, startTime, endTime] = time[0].split('-')

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

  console.log(resStartTime, resEndTime)

  return {
    startDate: resStartTime.toDate(),
    endDate: resEndTime.toDate(),
    title: activityName,
    location: ''
  }
}

const Calendar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [appointments, setAppointments] = React.useState([{}])

  // send request
  React.useEffect(() => {
    async function fetchActivities() {
      const res = await getActivities()

      // data: IActivityValue[]
      const activites = res.data as IActivityValue[]
      const appointments = activites.map(item => processActivityData(item))
      setAppointments(appointments)
    }
    fetchActivities()
  }, [])

  const onClickNewActivity = () => {
    setDrawerOpen(true)
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }

  return (
    <>
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

      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 480 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          13456
        </Box>
      </Drawer>

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

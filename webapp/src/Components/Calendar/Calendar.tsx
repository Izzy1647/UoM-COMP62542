import * as React from 'react'
import {
  Scheduler,
  WeekView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'
// import Grid from '@mui/material/Grid'
import { styled, alpha } from '@mui/material/styles'
import { ViewState } from '@devexpress/dx-react-scheduler'
import appointments from './mock-today-appointments'

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

const Calendar = () => {
  return (
    <>
      {/* <Grid item xs={6}>
        

      </Grid>
      <Grid item xs={6}>
        ads32re
      </Grid> */}
      {/* @ts-ignore */}
      <Scheduler data={appointments} height={660}>
        <ViewState />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>
    </>
  )
}

export default Calendar

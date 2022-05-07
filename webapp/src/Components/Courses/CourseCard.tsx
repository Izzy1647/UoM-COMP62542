import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { weekdays } from '../Calendar/Calendar'
import { enroll } from '../../api/courses'

export interface ICourseCardProps {
  courseName: string
  time: string
  type: string
  department: string
  courseId: string
  showLoading?: (value: boolean) => void
}

const insert = (str: string, index: number, value: string) => {
  return str.substr(0, index) + value + str.substr(index)
}

const formatTime = (time: string) => {
  const [day, startTime, endTime] = time.split('-')
  return `${weekdays[Number(day) - 1]} ${insert(startTime, 2, ':')}-${insert(
    endTime,
    2,
    ':'
  )}`
}

export default function CourseCard(props: ICourseCardProps) {
  const { courseName, time, department, courseId, showLoading } = props
  const handleEnroll = async () => {
    if (showLoading) {
      showLoading(true)
      const res = await enroll(courseId)
      showLoading(false)
      if (res.status === 1) {
        alert('Success')
      } else {
        alert('Fail, try again')
      }
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1
        },
        margin: '6px'
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {courseName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {formatTime(time)}
          </Typography>
          <Typography variant="body2">{department}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEnroll}>
            Enroll
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

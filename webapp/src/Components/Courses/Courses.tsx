import * as React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import CourseCard, { ICourseCardProps } from './CourseCard'
import { getOptCourses } from '../../api/courses'

export default function Courses() {
  const [courses, setCourses] = React.useState<ICourseCardProps[]>([])
  const [showLoading, setShowLoading] = React.useState(false)

  React.useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setShowLoading(true)
    const res = await getOptCourses()
    setShowLoading(false)
    const courses = res.data as ICourseCardProps[]
    setCourses(courses)
  }

  const setLoadingStatus = (value: boolean) => {
    setShowLoading(value)
  }

  return (
    <>
      {showLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      {courses.map(course => {
        return (
          <CourseCard
            key={course.courseId}
            showLoading={setLoadingStatus}
            {...course}
          />
        )
      })}
    </>
  )
}

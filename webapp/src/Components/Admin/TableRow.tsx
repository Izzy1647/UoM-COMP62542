import * as React from 'react'
import { Button, Divider } from '@mui/material'

import './styles.css'
import { optStudentOut } from '../../api/admin'

export interface IRowProps {
  courseId: string
  studentId: string
  showLoading?: (value: boolean) => void
}

export default function TableRow(props: IRowProps) {
  const { courseId, studentId, showLoading } = props

  const handleKickStudentOut = async () => {
    showLoading!(true)
    const res = await optStudentOut(studentId, courseId)
    alert(res.message)
    showLoading!(false)
  }

  return (
    <>
      <div className="rowContainer">
        <p className="rowItem">{courseId}</p>
        <Divider orientation="vertical" flexItem />
        <p className="rowItem">{studentId}</p>
        <Divider orientation="vertical" flexItem />
        <Button onClick={handleKickStudentOut}> Opt-out</Button>
      </div>
    </>
  )
}

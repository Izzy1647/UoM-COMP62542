import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  LinearProgress
} from '@mui/material'
import Cookies from 'universal-cookie'
import { getEnrollList } from '../../api/admin'
import TableRow from './TableRow'

export interface IEnrollTableProps {
  courseId: string
  studentId: string
}

export default function Admin() {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [searchType, setSearchType] = React.useState('courseId')
  const [showLoading, setShowLoading] = React.useState(false)
  const [tableData, setTableData] = React.useState<IEnrollTableProps[]>([])

  const handleLogout = () => {
    sessionStorage.clear()
    cookies.remove('token')
    navigate('/')
  }

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as string)
  }

  const handleShowLoading = (value: boolean) => {
    setShowLoading(value)
  }

  const handleSubmitSearch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const id = data.get('id') as string
    setShowLoading(true)
    const res = await getEnrollList(searchType, id)
    setShowLoading(false)
    console.log('resL', res)
    setTableData(res.data)
  }

  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {showLoading && <LinearProgress />}

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmitSearch}>
          <FormControl fullWidth>
            <InputLabel>Search type</InputLabel>
            <Select
              value={searchType}
              label="SearchType"
              onChange={handleSearchTypeChange}
            >
              <MenuItem value={'courseId'}>Course Id</MenuItem>
              <MenuItem value={'studentId'}>Student Id</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" required fullWidth name="id" id="id" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {tableData.length !== 0 && (
        <>
          {tableData.map(row => {
            return <TableRow {...row} showLoading={handleShowLoading} />
          })}
        </>
      )}
    </Box>
  )
}

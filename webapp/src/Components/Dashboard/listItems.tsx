import * as React from 'react'
import ListItem from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import { Link } from 'react-router-dom'

const list = [
  {
    icon: <DataUsageIcon />,
    key: 'Status'
  },
  {
    icon: <EventNoteIcon />,
    key: 'Calendar'
  },
  {
    icon: <BarChartIcon />,
    key: 'Courses'
  },
  {
    icon: <LayersIcon />,
    key: 'Newsletter'
  }
]

export const mainListItems = (
  <React.Fragment>
    {list.map(item => {
      return (
        <ListItem
          key={item.key}
          component={Link}
          to={`/dashboard/${item.key.toLowerCase()}`}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.key} />
        </ListItem>
      )
    })}
  </React.Fragment>
)

import * as React from 'react'
import Box from '@mui/material/Box'
import NewsletterCard from './NewsletterCard'
import { newsletters } from './mock'

export default function Newsletter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1
        },
        margin: '20px'
      }}
    >
      {newsletters.map(item => {
        return (
          <NewsletterCard
            id={item.id}
            title={item.title}
            preview={item.preview}
          />
        )
      })}
    </Box>
  )
}

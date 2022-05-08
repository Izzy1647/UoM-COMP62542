import * as React from 'react'
import Box from '@mui/material/Box'
import NewsletterCard, { INewsletterCardProps } from './NewsletterCard'
import { getNewsletters } from '../../api/newsletter'

export default function Newsletter() {
  const [newsletters, setNewsletters] = React.useState<INewsletterCardProps[]>(
    []
  )

  React.useEffect(() => {
    fetchNewsletters()
  }, [])

  const fetchNewsletters = async () => {
    const res = await getNewsletters()
    const newsletters = res.data as INewsletterCardProps[]
    setNewsletters(newsletters)
  }

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
        return <NewsletterCard {...item} />
      })}
    </Box>
  )
}

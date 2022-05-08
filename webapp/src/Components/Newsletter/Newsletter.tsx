import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import NewsletterCard, { INewsletterCardProps } from './NewsletterCard'
import { getNewsletters } from '../../api/newsletter'

export default function Newsletter() {
  const [newsletters, setNewsletters] = React.useState<INewsletterCardProps[]>(
    []
  )
  const [showLoading, setShowLoading] = React.useState(false)

  const controlLoading = (value: boolean) => {
    setShowLoading(value)
  }

  React.useEffect(() => {
    fetchNewsletters()
  }, [])

  const fetchNewsletters = async () => {
    setShowLoading(true)
    const res = await getNewsletters()
    const newsletters = res.data as INewsletterCardProps[]
    setNewsletters(newsletters)
    setShowLoading(false)
  }

  return (
    <>
      {showLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
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
          return <NewsletterCard {...item} setShowLoading={controlLoading} />
        })}
      </Box>
    </>
  )
}

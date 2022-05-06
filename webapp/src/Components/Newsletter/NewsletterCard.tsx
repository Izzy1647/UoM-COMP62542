import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export interface INewsletterCardProps {
  id: string
  title: string
  preview: string
  onSubscribe?: () => void
}

export default function NewsletterCard(props: INewsletterCardProps) {
  const { title, preview, onSubscribe} = props
  return (
    <Card >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {preview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onSubscribe}>Subscribe</Button>
      </CardActions>
    </Card>
  )
}

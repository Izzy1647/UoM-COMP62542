import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { subscribe } from '../../api/newsletter'

export interface INewsletterCardProps {
  newsletterId: string
  newsletterName: string
  preview: string
}

export default function NewsletterCard(props: INewsletterCardProps) {
  const { newsletterName, preview } = props
  const onSubscribe = async () => {
    const {newsletterId} = props
    const res = await subscribe(newsletterId)
    alert(res.message)
  }
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {newsletterName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {preview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onSubscribe}>
          Subscribe
        </Button>
      </CardActions>
    </Card>
  )
}

import express, { type Application } from 'express'

const PORT: number = 8000

const app: Application = express()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
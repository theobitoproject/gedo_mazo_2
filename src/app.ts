import express, { Request, RequestHandler, Response } from 'express'
import { json } from 'body-parser'

const app = express()

app.use(json())

const home: RequestHandler = (req: Request, res: Response) => {
  const msg = 'hello from express with typescript, con cambio 2'
  console.log(req.params.id)
  console.log(msg)
  return res.status(200).json({ message: msg })
}

app.get('/', home)

app.listen(8000)

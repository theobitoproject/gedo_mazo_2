import { ErrorRequestHandler, Request, Response } from 'express'

export const handleError: ErrorRequestHandler = (
  err: Error,
  _: Request,
  res: Response
) => {
  console.error(err)
  return res.status(500).json({ message: 'an error occured' })
}

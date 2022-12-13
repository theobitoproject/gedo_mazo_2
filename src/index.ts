import { join } from 'path'
import { promises as fsPromises } from 'fs'

import express, { json } from 'express'
import { google } from 'googleapis'

import { Application as GedoMazoApplication } from './app/Application'
import { Auther } from './app/FileStorage'
import { FileStorage as GoogleFileStorage } from './adapters/google/FileStorage'
import { handleError } from './middlewares'
import { HttpServer } from './ports/http'

const temporalAuther: Auther = {
  async getAuth(): Promise<object> {
    try {
      const token = join(__dirname, 'token.json')
      const content = await fsPromises.readFile(token)
      const credentials = JSON.parse(content.toString())
      return google.auth.fromJSON(credentials)
    } catch (err) {
      return {
        err,
      }
    }
  },
}

const fileStorage: GoogleFileStorage = new GoogleFileStorage()

const gedoMazoApplication: GedoMazoApplication = new GedoMazoApplication(
  temporalAuther,
  fileStorage
)

const httpServer: HttpServer = new HttpServer(gedoMazoApplication)

const app = express()
app.use(json())

app.post(
  '/docs/generate/from-template',
  httpServer.generateDocumentFromTemplate
)

app.use(handleError)

app.listen(8000)

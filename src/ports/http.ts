import { NextFunction, Request, RequestHandler, Response } from 'express'

import { Application } from '../app/Application'
import { DataToMerge } from '../domain/DataToMerge'
import { Document } from '../domain/Document'
import { Folder } from '../domain/Folder'
import { GenerateDocumentFromTemplateRequest } from './types'

export class HttpServer {
  constructor(private readonly app: Application) {}

  generateDocumentFromTemplate: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parameters = req.body as GenerateDocumentFromTemplateRequest

      const templateDoc: Document = new Document(parameters.document_id)
      const outputFolder: Folder = new Folder(parameters.folder_id)
      const data: DataToMerge = parameters.data_to_merge as DataToMerge

      await this.app.generateDocumentFromTemplate(
        templateDoc,
        outputFolder,
        data
      )

      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}

import { DataToMerge } from '../domain/DataToMerge'
import { Document } from '../domain/Document'
import { FileStorage } from './FileStorage'
import { Folder } from '../domain/Folder'

// Application encapsulates all available actions
// that the service offers
export class Application {
  constructor(private readonly fileStorage: FileStorage) {}

  // generateDocumentFromTemplate creates a new document
  // based on a template document
  // inside the specified output folder
  // and the it merges data into the new document
  generateDocumentFromTemplate(
    this: Application,
    templateDoc: Document,
    outputFolder: Folder,
    data: DataToMerge
  ) {
    const newDocument = this.fileStorage.cloneDocument(
      templateDoc,
      outputFolder
    )

    this.fileStorage.mergeDataIntoDocument(newDocument, data)
  }
}

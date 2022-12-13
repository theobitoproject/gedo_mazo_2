import { DataToMerge } from '../domain/DataToMerge'
import { Document } from '../domain/Document'
import { Auther, FileStorage } from './FileStorage'
import { Folder } from '../domain/Folder'

// Application encapsulates all available actions
// that the service offers
export class Application {
  constructor(
    private readonly auther: Auther,
    private readonly fileStorage: FileStorage
  ) {}

  // generateDocumentFromTemplate creates a new document
  // based on a template document
  // inside the specified output folder
  // and the it merges data into the new document
  async generateDocumentFromTemplate(
    this: Application,
    templateDoc: Document,
    outputFolder: Folder,
    data: DataToMerge
  ) {
    const newDocument = await this.fileStorage.cloneDocument(
      templateDoc,
      outputFolder,
      this.auther
    )

    await this.fileStorage.mergeDataIntoDocument(newDocument, data, this.auther)
  }
}

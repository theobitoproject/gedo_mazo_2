import { DataToMerge } from '../domain/DataToMerge'
import { Document } from '../domain/Document'
import { Folder } from '../domain/Folder'

// FileStorage defines a handler to access and manage files
export interface FileStorage {
  // cloneDocument clones a document into a specific folder
  cloneDocument(document: Document, folder: Folder): Document
  // mergeDataIntoDocument merges the passed data into the document
  mergeDataIntoDocument(document: Document, data: DataToMerge): void
}

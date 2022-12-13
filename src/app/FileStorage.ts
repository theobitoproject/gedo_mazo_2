import { DataToMerge } from '../domain/DataToMerge'
import { Document } from '../domain/Document'
import { Folder } from '../domain/Folder'

// Auther defines a handler to manage authentication/authorization with file storage
export interface Auther {
  // getAuth returns the proper object
  // to authenticate/authorize requests to the file storage.
  // It returns an object since the each file storage will expect a different
  // auth type (string token, a specific type of instance, etc)
  getAuth(): object
}

// FileStorage defines a handler to access and manage files
export interface FileStorage {
  // cloneDocument clones a document into a specific folder
  cloneDocument(
    document: Document,
    folder: Folder,
    auther: Auther
  ): Promise<Document>
  // mergeDataIntoDocument merges the passed data into the document
  mergeDataIntoDocument(
    document: Document,
    data: DataToMerge,
    auther: Auther
  ): Promise<void>
}

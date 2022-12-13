import { google, docs_v1 } from 'googleapis'

import { Auther } from '../../app/FileStorage'
import { DataToMerge } from '../../domain/DataToMerge'
import { Document } from '../../domain/Document'
import { Folder } from '../../domain/Folder'

import { Auth as GoogleAuth } from './Auth'

// FileStorage defines a handler to access and manage files
// within Google Drive, Google Documents, Google Sheets and others
export class FileStorage {
  // cloneDocument clones a document into a specific folder
  async cloneDocument(
    this: FileStorage,
    document: Document,
    folder: Folder,
    auther: Auther
  ): Promise<Document> {
    const googleAuth = <GoogleAuth>auther.getAuth()
    const drive = google.drive({ version: 'v3', auth: googleAuth })

    const res = await drive.files.copy({
      fileId: document.id,
      requestBody: {
        name: this.getDocumentName(),
        parents: [folder.id],
      },
    })

    const id = (res.data as { id: string }).id
    return new Document(id)
  }

  // mergeDataIntoDocument merges the passed data into the document
  async mergeDataIntoDocument(
    this: FileStorage,
    document: Document,
    data: DataToMerge,
    auther: Auther
  ): Promise<void> {
    const googleAuth = <GoogleAuth>auther.getAuth()
    const docs = google.docs({ version: 'v1', auth: googleAuth })

    docs.documents.batchUpdate(
      {
        documentId: document.id,
        requestBody: { requests: this.getReplaceTextRequests(data) },
      },
      (err, resp) => {
        if (err) return console.log('The API returned an error: ' + err)
        console.log(resp)
      }
    )
  }

  private getDocumentName(): string {
    // TODO: This is temporal. Name should be set properly
    const currentUnixTimestamp: number = Math.floor(Date.now() / 1000)
    return `temporal_name_${currentUnixTimestamp}`
  }

  private getReplaceTextRequests(
    this: FileStorage,
    data: DataToMerge
  ): docs_v1.Schema$Request[] {
    const requests: docs_v1.Schema$Request[] = []

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]

        requests.push({
          replaceAllText: {
            containsText: {
              text: `'{{${key}}}'`,
              matchCase: true,
            },
            replaceText: String(value),
          },
        })
      }
    }

    return requests
  }
}

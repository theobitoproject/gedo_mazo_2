import { Auther } from '../../../../src/app/FileStorage'
import { DataToMerge } from '../../../../src/domain/DataToMerge'
import { Document } from '../../../../src/domain/Document'
import { FileStorage } from '../../../../src/adapters/google/FileStorage'
import { Folder } from '../../../../src/domain/Folder'

const clonedDocumentId = 'some id'
const copyMock = jest.fn().mockResolvedValue({
  data: {
    id: clonedDocumentId,
  },
})

const batchUpdateMock = jest.fn().mockImplementation((_, cb) => cb())

jest.mock('googleapis', () => ({
  google: {
    drive: () => ({
      files: {
        copy: copyMock,
      },
    }),
    docs: () => ({
      documents: {
        batchUpdate: batchUpdateMock,
      },
    }),
  },
}))

describe('FileStorage', () => {
  let fileStorage: FileStorage

  const testData: {
    document: Document
    folder: Folder
    auther: Auther
    dataToMerge: DataToMerge
  } = {
    document: new Document('document'),
    folder: new Folder('folder'),
    auther: {
      getAuth(): object {
        return {}
      },
    },
    dataToMerge: {
      name: 'some name',
      age: 33,
    },
  }

  beforeEach(() => {
    fileStorage = new FileStorage()
  })

  describe('cloneDocument', () => {
    let clonedDocument: Document

    beforeEach(async () => {
      clonedDocument = await fileStorage.cloneDocument(
        testData.document,
        testData.folder,
        testData.auther
      )
    })

    it('should copy the document', () => {
      expect(copyMock).toHaveBeenCalledWith({
        fileId: testData.document.id,
        requestBody: {
          name: expect.any(String),
          parents: [testData.folder.id],
        },
      })
    })

    it('should return the new created document', () => {
      expect(clonedDocument.id).toBe(clonedDocumentId)
    })
  })

  describe('mergeDataIntoDocument', () => {
    beforeEach(async () => {
      await fileStorage.mergeDataIntoDocument(
        testData.document,
        testData.dataToMerge,
        testData.auther
      )
    })

    it('should merge data', () => {
      expect(batchUpdateMock).toHaveBeenCalledWith(
        {
          documentId: testData.document.id,
          // TODO: assert better the requests array
          requestBody: { requests: expect.any(Array) },
        },
        expect.any(Function)
      )
    })
  })
})

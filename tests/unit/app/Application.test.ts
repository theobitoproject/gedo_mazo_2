import { Application } from '../../../src/app/Application'
import { DataToMerge } from '../../../src/domain/DataToMerge'
import { Document } from '../../../src/domain/Document'
import { Auther, FileStorage } from '../../../src/app/FileStorage'
import { Folder } from '../../../src/domain/Folder'

describe('Application', () => {
  let app: Application

  let auther: Auther
  let fileStorage: FileStorage

  const testData: {
    templateDoc: Document
    outputFolder: Folder
    dataToMerge: DataToMerge
  } = {
    templateDoc: new Document('template_doc'),
    outputFolder: new Folder('output_folder'),
    dataToMerge: {
      name: 'some name',
      age: 33,
    },
  }

  const getClonedDocument = (document: Document, folder: Folder): Document => {
    return new Document(`${document.id}_${folder.id}`)
  }

  const getAuthMock: jest.MockedFunction<() => object> = jest.fn()

  const cloneDocumentMock: jest.MockedFunction<
    (document: Document, folder: Folder) => Promise<Document>
  > = jest
    .fn()
    .mockResolvedValue(
      getClonedDocument(testData.templateDoc, testData.outputFolder)
    )

  const mergeDataIntoDocumentMock: jest.MockedFunction<
    (document: Document, data: DataToMerge) => Promise<void>
  > = jest.fn()

  beforeEach(() => {
    auther = {
      getAuth: getAuthMock,
    }

    fileStorage = {
      cloneDocument: cloneDocumentMock,
      mergeDataIntoDocument: mergeDataIntoDocumentMock,
    }

    app = new Application(auther, fileStorage)
  })

  describe('generateDocumentFromTemplate', () => {
    beforeEach(async () => {
      await app.generateDocumentFromTemplate(
        testData.templateDoc,
        testData.outputFolder,
        testData.dataToMerge
      )
    })

    it('should clone document', () => {
      expect(fileStorage.cloneDocument).toHaveBeenCalledWith(
        testData.templateDoc,
        testData.outputFolder,
        auther
      )
    })

    it('should merge data into the document', () => {
      expect(fileStorage.mergeDataIntoDocument).toHaveBeenCalledWith(
        getClonedDocument(testData.templateDoc, testData.outputFolder),
        testData.dataToMerge,
        auther
      )
    })
  })
})

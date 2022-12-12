import { Application } from '../../../src/app/Application'
import { DataToMerge } from '../../../src/domain/DataToMerge'
import { Document } from '../../../src/domain/Document'
import { FileStorage } from '../../../src/app/FileStorage'
import { Folder } from '../../../src/domain/Folder'

describe('Application', () => {
  let app: Application
  let fileStorage: FileStorage

  const testData = {
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

  const cloneDocumentMock: jest.MockedFunction<
    (document: Document, folder: Folder) => Document
  > = jest
    .fn()
    .mockImplementation(
      (document: Document, folder: Folder): Document =>
        getClonedDocument(document, folder)
    )

  const mergeDataIntoDocumentMock: jest.MockedFunction<
    (document: Document, data: DataToMerge) => void
  > = jest.fn()

  beforeEach(() => {
    fileStorage = {
      cloneDocument: cloneDocumentMock,
      mergeDataIntoDocument: mergeDataIntoDocumentMock,
    }

    app = new Application(fileStorage)
  })

  describe('generateDocumentFromTemplate', () => {
    beforeEach(() => {
      app.generateDocumentFromTemplate(
        testData.templateDoc,
        testData.outputFolder,
        testData.dataToMerge
      )
    })

    it('should clone document', () => {
      expect(fileStorage.cloneDocument).toHaveBeenCalledWith(
        testData.templateDoc,
        testData.outputFolder
      )
    })

    it('should merge data into the document', () => {
      expect(fileStorage.mergeDataIntoDocument).toHaveBeenCalledWith(
        getClonedDocument(testData.templateDoc, testData.outputFolder),
        testData.dataToMerge
      )
    })
  })
})

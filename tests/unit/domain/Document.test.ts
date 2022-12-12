import { Document } from '../../../src/domain/Document'

describe('Document', () => {
  it('should build a proper document instance', () => {
    const id = 'some id'
    const doc = new Document(id)

    expect(doc).toBeInstanceOf(Document)
    expect(doc.docId).toBe(id)
  })
})

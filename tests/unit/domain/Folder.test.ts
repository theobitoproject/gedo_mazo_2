import { Folder } from '../../../src/domain/Folder'

describe('Folder', () => {
  it('should build a proper folder instance', () => {
    const id = 'some id'
    const folder = new Folder(id)

    expect(folder).toBeInstanceOf(Folder)
    expect(folder.id).toBe(id)
  })
})

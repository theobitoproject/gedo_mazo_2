// Document defines an actual document that
// contains data, can be managed and modified and
// is stored in some location or storage
export class Document {
  // TODO: define a better name for this getter
  get docId(): string {
    return this.id
  }

  constructor(private readonly id: string) {}
}

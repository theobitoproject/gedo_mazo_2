export interface GenerateDocumentFromTemplateRequest {
  data_to_merge: DataToMerge
  document_id: DocumentId
  folder_id: FolderId
}

type DataToMerge = object
type DocumentId = string
type FolderId = string

type DataKey = string
type DataValue = string | number

// DataToMerge defines an object that contains all data that
// can be merged into a document
export interface DataToMerge {
  [key: DataKey]: DataValue
}

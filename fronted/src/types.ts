export interface Entry {
  id: number
  title: string
  author: string
  content: string
  date: string
}

export interface CreateEntryPayload {
  title: string
  author: string
  content: string
}

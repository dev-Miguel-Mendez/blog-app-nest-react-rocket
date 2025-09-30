import { apiClient } from './client'
import type { CreateEntryPayload, Entry } from '../types'

export const fetchEntries = async (query?: string): Promise<Entry[]> => {
  const params = query ? { q: query } : undefined
  const response = await apiClient.get<Entry[]>('/entries', { params })
  return response.data
}

export const fetchEntry = async (id: number): Promise<Entry> => {
  const response = await apiClient.get<Entry>(`/entries/${id}`)
  return response.data
}

export const createEntry = async (payload: CreateEntryPayload): Promise<Entry> => {
  const response = await apiClient.post<Entry>('/entries', payload)
  return response.data
}

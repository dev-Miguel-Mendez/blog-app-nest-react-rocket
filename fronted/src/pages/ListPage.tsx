import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEntries } from '../api/entries'
import type { Entry } from '../types'

const DEBOUNCE_DELAY = 300

const truncate = (value: string, length: number) =>
  value.length <= length ? value : `${value.slice(0, length - 3)}...`

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const ListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedTerm(searchTerm.trim()), DEBOUNCE_DELAY)
    return () => window.clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchEntries(debouncedTerm || undefined)
        if (!cancelled) {
          setEntries(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load entries. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [debouncedTerm])

  const helperText = useMemo(() => {
    if (loading) return 'Loading entries…'
    if (error) return error
    if (!entries.length) return 'No entries found.'
    return null
  }, [entries.length, error, loading])

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Latest Entries</h2>
        <Link className="primaryButton" to="/create">
          New Entry
        </Link>
      </div>

      <div className="searchBar">
        <label className="visuallyHidden" htmlFor="search">
          Search entries
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search by title, author, or content"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {helperText ? (
        <p className="statusText">{helperText}</p>
      ) : (
        <ul className="entriesList">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Link className="entryCard" to={`/entries/${entry.id}`}>
                <div className="entryHeader">
                  <h3>{entry.title}</h3>
                  <span>{formatDate(entry.date)}</span>
                </div>
                <p className="entryMeta">By {entry.author}</p>
                <p>{truncate(entry.content, 70)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListPage

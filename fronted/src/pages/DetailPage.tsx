import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchEntry } from '../api/entries'
import type { Entry } from '../types'

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Missing entry id')
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchEntry(Number(id))
        if (!cancelled) {
          setEntry(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load the entry. Please try again.')
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
  }, [id])

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Entry Details</h2>
        <Link className="secondaryButton" to="/">
          Back to list
        </Link>
      </div>

      {loading && <p className="statusText">Loading entry…</p>}
      {error && <p className="statusText">{error}</p>}

      {!loading && !error && entry && (
        <article className="entryDetail">
          <header>
            <h3>{entry.title}</h3>
            <p className="entryMeta">
              By {entry.author} • {formatDate(entry.date)}
            </p>
          </header>
          <p>{entry.content}</p>
        </article>
      )}
    </div>
  )
}

export default DetailPage

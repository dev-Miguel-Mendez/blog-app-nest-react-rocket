import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEntry } from '../api/entries'
import type { CreateEntryPayload } from '../types'

const initialForm: CreateEntryPayload = {
  title: '',
  author: '',
  content: '',
}

const CreatePage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateEntryPayload>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = {
      title: form.title.trim(),
      author: form.author.trim(),
      content: form.content.trim(),
    }

    if (!trimmed.title || !trimmed.author || !trimmed.content) {
      setError('Please fill in all fields.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const created = await createEntry(trimmed)
      navigate(`/entries/${created.id}`)
    } catch (err) {
      setError('Unable to create the entry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>New Entry</h2>
      </div>

      <form className="entryForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="A memorable headline"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          required
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Your name"
          value={form.author}
          onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          placeholder="Share your thoughts..."
          value={form.content}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          required
        />

        {error && <p className="formError">{error}</p>}

        <button className="primaryButton" type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Create Entry'}
        </button>
      </form>
    </div>
  )
}

export default CreatePage

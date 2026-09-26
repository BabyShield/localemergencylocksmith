'use client'

import { useEffect, useRef, useState } from 'react'
import CallbackForm from '@/components/CallbackForm'

interface CallbackLinkProps {
  href?: string
  className?: string
  children: React.ReactNode
}

export default function CallbackLink({
  href = '/contact#callback',
  className,
  children,
}: CallbackLinkProps) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const inPage = href.startsWith('#')

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={
          inPage
            ? undefined
            : (event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                event.preventDefault()
                setOpen(true)
              }
        }
      >
        {children}
      </a>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-[#0A1628]/70 p-4 pb-20 sm:pb-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-dialog-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 text-[#0F1B2D] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h2 id="callback-dialog-title" className="text-xl font-black">
                Request a callback
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Leave your number. If you are locked out, calling is the direct way to confirm the current ETA.
            </p>
            <CallbackForm source="callback-dialog" />
          </div>
        </div>
      )}
    </>
  )
}

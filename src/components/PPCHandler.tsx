export default function PPCHandler() {
  return (
    <>
      <div
        id="ppc-gclid-banner"
        hidden
        role="status"
        aria-live="polite"
        className="absolute top-0 left-0 w-full bg-red-600 text-white text-sm font-bold text-center py-2 z-50 animate-pulse shadow-md"
      >
        Call now to confirm current availability, your price, and an honest arrival time.
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: "if(new URLSearchParams(location.search).has('gclid'))document.getElementById('ppc-gclid-banner')?.removeAttribute('hidden')",
        }}
      />
    </>
  )
}

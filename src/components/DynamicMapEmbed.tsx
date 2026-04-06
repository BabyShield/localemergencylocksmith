interface DynamicMapEmbedProps {
  streetName: string
  areaName: string
}

export default function DynamicMapEmbed({ streetName, areaName }: DynamicMapEmbedProps) {
  const query = encodeURIComponent(`${streetName}, ${areaName}, United Kingdom`)

  return (
    <div className="w-full relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${query}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        loading="lazy"
        title={`Map of ${streetName}, ${areaName}`}
      />
    </div>
  )
}

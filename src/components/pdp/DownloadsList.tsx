import { FileText } from 'lucide-react'

export function DownloadsList({ downloads }: { downloads: { label: string }[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {downloads.map((d) => (
        <li key={d.label}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 hover:border-brand-300 hover:bg-brand-50/50"
          >
            <FileText className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
            {d.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

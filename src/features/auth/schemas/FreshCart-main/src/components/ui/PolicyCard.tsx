import React from 'react'

type Bullet = {
  id?: string
  text: string
}

type Props = {
  article: string
  title: string
  bullets?: Bullet[]
  icon?: React.ReactNode
}

export default function PolicyCard({ article, title, bullets = [], icon }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 transition-transform duration-200 group-hover:scale-105">
          {icon ?? <span className="text-lg">ℹ️</span>}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-emerald-600">{article}</div>
              <h4 className="text-sm font-semibold text-gray-900 mt-1">{title}</h4>
            </div>
          </div>

          {bullets.length > 0 && (
            <ul className="mt-3 text-sm text-gray-600 space-y-2">
              {bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-emerald-600 font-semibold text-xs mt-0.5">{idx + 1}.</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

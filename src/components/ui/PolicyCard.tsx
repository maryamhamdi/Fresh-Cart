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
    <div className="group bg-[#e6e6e6] rounded-2xl p-5 transition-all duration-200
      shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]
      hover:shadow-[3px_3px_8px_#c5c5c5,-3px_-3px_8px_#ffffff]">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#e6e6e6] text-emerald-600 shrink-0 transition-transform duration-200 group-hover:scale-105
          shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]">
          {icon ?? <span className="text-lg">ℹ️</span>}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-emerald-600">{article}</div>
              <h4 className="text-sm font-semibold text-gray-800 mt-1">{title}</h4>
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
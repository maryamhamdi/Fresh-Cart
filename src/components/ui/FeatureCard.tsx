import React from 'react'
type Props = {
  title: string
  description: string
  children?: React.ReactNode
}
export const FeatureCard: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="group relative bg-[#e6e6e6] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1
      shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]
      hover:shadow-[4px_4px_10px_#c5c5c5,-4px_-4px_10px_#ffffff]">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#e6e6e6] text-emerald-600 shrink-0 transition-transform duration-300 group-hover:scale-105
          shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
          {children}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="absolute -right-4 -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-200 to-emerald-400 blur-2xl opacity-30 animate-float" />
      </div>
    </div>
  )
}
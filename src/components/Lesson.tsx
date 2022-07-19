import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Lock } from 'phosphor-react'
import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface ILessonProps {
  title: string
  slug: string
  available_at: Date
  type: 'live' | 'class'
}

export const Lesson = ({ title, slug, available_at, type }: ILessonProps) => {
  const isLessonAvailable = isPast(available_at)
  const availableDateFormatted = format(available_at, "EEEE' - 'd' de 'MMMM' - 'k'h'mm", {
    locale: ptBR
  })

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className="mt-2 p-4 border border-gray-500 rounded group-hover:border-green-500">
        <header className="flex items-center justify-between">
          {
            isLessonAvailable
              ? (
                  <span className="flex items-center gap-2 font-medium text-sm text-blue-500">
                    <CheckCircle size={20} />
                    Conteúdo liberado
                  </span>
                )
              : (
                  <span className="flex items-center gap-2 font-medium text-sm text-orange-500">
                    <Lock size={20} />
                    Em breve
                  </span>
                )
          }

          <span className="font-bold text-white text-xs py-[0.125rem] px-2 border border-green-300 rounded">
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>

        </header>

        <strong className="block text-gray-200 mt-5">
          {title}
        </strong>
      </div>
    </Link>
  )
}

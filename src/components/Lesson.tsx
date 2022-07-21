import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Lock } from 'phosphor-react'
import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import classNames from 'classnames'

interface ILessonProps {
  title: string
  slug: string
  available_at: Date
  type: 'live' | 'class'
}

export const Lesson = ({ title, slug, available_at, type }: ILessonProps) => {
  const { slug: slugUrl } = useParams<{ slug: string }>()
  const isActiveLesson = slugUrl === slug
  const isLessonAvailable = isPast(available_at)
  const availableDateFormatted = format(available_at, "EEEE' - 'd' de 'MMMM' - 'k'h'mm", {
    locale: ptBR
  })

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div
        className={classNames('mt-2 p-4 border border-gray-500 rounded group-hover:border-green-500', {
          'bg-green-500': isActiveLesson
        })}
      >
        <header className="flex items-center justify-between">
          {
            isLessonAvailable
              ? (
                  <span
                    className={classNames('flex items-center gap-2 font-medium text-sm', {
                      'text-white': isActiveLesson,
                      'text-blue-500': !isActiveLesson
                    })}
                  >
                    <CheckCircle size={20} />
                    Conteúdo liberado
                  </span>
                )
              : (
                  <span
                    className="flex items-center gap-2 font-medium text-sm text-orange-500"
                  >
                    <Lock size={20} />
                    Em breve
                  </span>
                )
          }

          <span
            className={classNames('font-bold text-white text-xs py-[0.125rem] px-2 border border-green-300 rounded', {
              'border-white': isActiveLesson,
              'border-green-300': !isActiveLesson
            })}
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>

        </header>

        <strong
          className={classNames('block mt-5', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  )
}

import React from 'react'

import { useGetLessonsQuery } from '../graphql/generated'
import { Lesson } from './Lesson'

export const Sidebar = () => {
  const { data } = useGetLessonsQuery()

  return (
    <aside className="p-6 w-[348px] bg-gray-700 border-l border-gray-600">
      <h1 className="block font-bold text-2xl mb-6 pb-6 border-b border-gray-500">
        Cronograma das aulas
      </h1>

      <div className="flex flex-col gap-8">
        { data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              available_at={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          )
        }) }
      </div>

    </aside>
  )
}

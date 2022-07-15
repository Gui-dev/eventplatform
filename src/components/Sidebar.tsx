import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Lesson } from './Lesson'

const GET_LESSONS_QUERY = gql`
  query MyQuery {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      slug
      availableAt
      lessonType
    }
  }
`

interface IGetLessonsQueryResponse {
  lessons: {
    id: string
    title: string
    slug: string
    availableAt: string
    lessonType: 'live' | 'class'
  }[]
}

export const Sidebar = () => {
  const { data } = useQuery<IGetLessonsQueryResponse>(GET_LESSONS_QUERY)

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

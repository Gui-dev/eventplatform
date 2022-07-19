import React from 'react'
import { CaretRight, DiscordLogo, FileArrowDown, Lightning, Spinner } from 'phosphor-react'
import { DefaultUi, Player, Youtube } from '@vime/react'
import { gql, useQuery } from '@apollo/client'

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: {slug: $slug}) {
      id
      title
      description
      videoId
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`

interface IGetLessonBySlugResponse {
  lesson: {
    id: string
    title: string
    description: string
    videoId: string
    teacher: {
      name: string
      bio: string
      avatarURL: string
    }
  }
}

interface IVideoProps {
  lessonSlug: string
}

export const Video = ({ lessonSlug }: IVideoProps) => {
  const { data } = useQuery<IGetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug
    }
  })

  if (!data) {
    return (
      <div className="flex flex-1 self-center justify-center">
        <Spinner size={24} color="#015F43" className="animate-spin"/>
      </div>
    )
  }

  return (
    <section className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto p-8">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="text-gray-200 leading-relaxed mt-4">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={data.lesson.teacher.avatarURL}
                alt={data.lesson.teacher.name}
                className="h-16 w-16 rounded-full border-2 border-blue-500"
              />

              <div className="leading-relaxed">
                <strong className="block font-bold text-2xl">
                  {data.lesson.teacher.name}
                </strong>
                <span className="block text-gray-200 text-sm">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold text-sm
                p-4 bg-green-500 rounded uppercase hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24}/>
              Comunidade do Discord
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold text-blue-500
                text-sm p-4 border border-blue-500 rounded uppercase hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24}/>
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-20">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-stretch gap-6 font-bold text-blue-500
              text-sm bg-gray-700 rounded overflow-hidden hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center h-full p-6 bg-green-700">
              <FileArrowDown size={40}/>
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complemntar para acelerar o seu desenvolvimento
              </p>
            </div>

            <div className="flex items-center h-full p-6">
              <CaretRight size={24}/>
            </div>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-stretch gap-6 font-bold text-blue-500
              text-sm bg-gray-700 rounded overflow-hidden hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center h-full p-6 bg-green-700">
              <FileArrowDown size={40}/>
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>

            <div className="flex items-center h-full p-6">
              <CaretRight size={24}/>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

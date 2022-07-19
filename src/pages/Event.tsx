import React from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Video } from '../components/Video'

export const Event = () => {
  const { slug } = useParams<{slug: string}>()

  return (
    <div className="flex flex-col min-h-screen scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-700 h-32 overflow-y-scroll">
      <Header />
      <main className="flex flex-1">
        { slug
          ? <Video lessonSlug={slug}/>
          : <div className="flex-1" />
        }
        <Sidebar />
      </main>
    </div>
  )
}

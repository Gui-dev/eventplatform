import React from 'react'

import { Logo } from './Logo'

export const Header = () => {
  return (
    <header className="flex items-center justify-center py-5 w-full bg-gray-700 border-b border-gray-600">
      <Logo />
    </header>
  )
}

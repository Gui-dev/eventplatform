import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

import { Logo } from './../components/Logo'

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export const Subscribe = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  const handleSubscriber = async (event: FormEvent) => {
    event.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }

  return (
    <section className="flex flex-col items-center min-h-screen bg-blur bg-cover bg-no-repeat">
      <div className="flex items-center justify-between mt-10 mx-auto w-full max-w-[1100px]">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="text-[2.5rem] leading-tight mt-8">
              Construa uma <strong className="text-blue-500">aplicação completa</strong> do zero,
              com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="text-gray-200 leading-relaxed mt-4">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais
            utilizadas e com alta demanda para acessar as melhores oportunidades do mercado
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="block text-2xl mb-6">Increva-se gratuitamente</strong>

          <form onSubmit={handleSubscriber} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Seu nome completo"
              className="px-5 h-14 bg-gray-900 rounded"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="px-5 h-14 bg-gray-900 rounded"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="font-bold text-sm mt-4 py-4 bg-green-500 hover:bg-green-700 rounded disabled:opacity-50 transition-colors"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>

      </div>

      <img src="/src/assets/images/code-mockup.png" className="mt-2" alt=""/>
    </section>
  )
}

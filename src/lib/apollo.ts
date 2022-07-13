import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl5hub8xx1o7j01t50rftd5jl/master',
  cache: new InMemoryCache()
})

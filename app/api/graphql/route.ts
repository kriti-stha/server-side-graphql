import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { NextRequest } from 'next/server'
import typeDefs from './schema'
import resolvers from './resolvers'
import { getUserFromToken } from '@/utils/auth'
import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'

let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'myGraph@prod',
    }),
  ]
} else {
  plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
}

// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   plugins,
// })

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  }),
  plugins
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const user = await getUserFromToken(req.headers.get('authorization') ?? '')
    return {
      req,
      user,
    }
  },
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}

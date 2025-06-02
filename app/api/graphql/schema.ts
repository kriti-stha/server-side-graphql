const schema = `#graphql

interface Character {
  name: String!
  outfit: String!
  strengthStat: Int!
  }

type Person implements Character {
  name: String!
  outfit: String!
  strengthStat: Int!

  backgroundStory: String!
}

type Alien implements Character {
  name: String!
  outfit: String!
  strengthStat: Int!

  homePlanet: String!
}

type Query {
  me: Person
  characters: [Character!]! #has to return an array and it cannot be empty
}
`

export default schema

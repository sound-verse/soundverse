import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

export class AuthorizedWsLink {
  private wsLink: GraphQLWsLink
  private token?: string

  constructor(private readonly getToken: () => string, uri: string) {
    this.token = getToken()

    if (process.browser) {
      this.wsLink = new GraphQLWsLink(
        createClient({
          url: uri,
          connectionParams: {
            authToken: this.token,
          },
        })
      )
    }
  }

  resetLink = () => {
    // get a new token
    this.token = this.getToken()
    // Reset the WS connection for it to carry the new JWT.
  }

  createLink = () => this.wsLink
}

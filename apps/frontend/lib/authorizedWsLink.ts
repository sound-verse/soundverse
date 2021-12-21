import { WebSocketLink } from '@apollo/client/link/ws'

// https://github.com/apollographql/subscriptions-transport-ws/issues/171
export class AuthorizedWsLink {
  private wsLink: WebSocketLink
  private token?: string

  constructor(private readonly getToken: () => string, uri: string) {
    this.token = getToken()

    if (process.browser) {
      this.wsLink = new WebSocketLink({
        uri,
        options: {
          reconnect: true,
          timeout: 30000,
          inactivityTimeout: 0,

          connectionParams: () => {
            return {
              Authorization: this.token ? `Bearer ${this.token}` : '',
            }
          },

          connectionCallback(err) {
            if (err) {
              console.error(err)
              return
            }
          },
        },
      })
    }
  }

  resetLink = () => {
    // get a new token
    this.token = this.getToken()
    // Reset the WS connection for it to carry the new JWT.
    ;(this.wsLink as any).subscriptionClient.close(false, true)
  }

  createLink = () => this.wsLink
}

import { User } from 'firebase/auth'
import { Component, createContext, PropsWithChildren, ReactNode } from 'react'
import { Profile, UserContextState } from './types'

// Provider and Consumer are connected through their 'parent' context
const { Provider, Consumer } = createContext<UserContextState | undefined>(undefined)

// Provider will be exported wrapped in ConfigProvider component.
class ConfigProvider extends Component<PropsWithChildren> {

  state: UserContextState = {
    currUser: undefined,                            // Mock login
    currProfile: undefined,
    setCurrUser: (user: User) => {
      this.setState({ currUser: user })
    },
    setCurrProfile: (profile: Profile) => {
      this.setState({currProfile: profile})
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export { ConfigProvider }

// I make this default since it will probably be exported most often.
export default Consumer
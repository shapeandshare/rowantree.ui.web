import { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import EventBus from './common/EventBus'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Game from './components/game.component'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  jwt: string | undefined
  guid: string | undefined
}

class App extends Component<Props, State> {
  render (): any {
    const localState = this.state

    return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={'/'} className="navbar-brand">
                        The Rowan Tree
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/home'} className="nav-link">
                                Home
                            </Link>
                        </li>
                    </div>

                    {localState?.jwt !== undefined
                      ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Log Out
                                    </a>
                                </li>
                            </div>
                        )
                      : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={'/login'} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={'/register'} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}

                    {(localState?.guid !== undefined && localState?.jwt !== undefined) && (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/game'} className="nav-link">
                                    Game
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/home' element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/game" element={<Game/>}/>
                    </Routes>
                </div>
            </div>
    )
  }

  componentDidMount (): void {
    const state: string | null = localStorage.getItem('state')
    if (state !== null) {
      this.setState(JSON.parse(state))
    } else {
      this.setState({
        jwt: undefined,
        guid: undefined
      })
    }

    EventBus.on('logout', this.logOut)
  }

  componentWillUnmount (): void {
    EventBus.remove('logout', this.logOut)
  }

  logOut (): void {
    localStorage.removeItem('state')
    localStorage.removeItem('notifications')
  }
}

export default App

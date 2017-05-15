import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Routes from '@/routes/routes'
class Main extends Component{

  render() {
    return (
      <Routes />
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
import React from 'react'
import Dashboard from '@/pages/dashboard'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import EditAnimeView from '@/pages/editAnimeView'
export default function Routes  () {
  return (
    <Router>
      <div>
        <Route exact path= "/admin/dashboard" component = { Dashboard } />
        <Route path = "/admin/anime/:id/edit" component = {EditAnimeView} />
      </div>
    </Router>
  )
}

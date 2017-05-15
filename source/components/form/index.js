import React, {Component} from 'react'
import Api from '@/getData'
import axios from 'axios'
import uuid from 'uuid-base62'
import styles from './styles.css'
export  default class Form extends Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    let {anime} = this.props
    console.log('anime', anime)
    this.state = {
      name: anime.name,
      thumbnail: anime.thumbnail,
      categories: anime.categories || [],
      error: false,
      request: false,
    }
  }

  handleChange (event) {
    let {name, value} = event.target
    this.setState({ [name]: value })
  }
  async sendData () {
    let {id} = this.props.anime
    let {name, thumbnail} = this.state
    let data = {name: name, thumbnail: thumbnail}
    let options = {
      method: 'PATCH',
      body: JSON.stringify(data),
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let request = await fetch(`/anime/${id}`, options)
    request = await request.json()
    if (request.error) {
      this.setState({ error: true })
    }
  }
  async formSubmit (e)  {
    e.preventDefault()
    this.sendData()
  }

  renderResponse () {
    let {error, request} = this.state
    if (request) {
      if (error) {
        return (
          <div>
            !ocurrió un error al editar la información, por favor intenta otra vez!
          </div>
        )
      } else {
        return (
          <div>
            se editó el contanto correctamente
          </div>
        )
      }
    }
  }

  renderCategories () {
    let { categories } = this.state
   if (categories.length > 0) {
     return (
       <div className = {styles.categories}>
        {categories.map( (category, index) => {
          return <span key = {uuid.v4()}> {category} </span>
        })}
       </div>
     )
   }
  }
  render () {
    let {name, thumbnail } = this.state
    return (
      <div className = {styles.container}>
        {this.renderResponse()}
        <form  onSubmit = { this.formSubmit } className = {styles.form}>
          <div className = {styles.formTitle}>
            Editar Anime
          </div>
          <div>
            <label >Nombre del anime </label>
            <input  value = {this.state.name}  className = {styles.formInput} name = "name" type = "text" onChange = {(event) => this.handleChange(event)} />
          </div>
          <div>
            <label> imagen: </label>
            <input value = { this.state.thumbnail } className = {styles.formInput} name = "thumbnail" type = "text"  onChange = {(event) => this.handleChange(event)} />
          </div>
          {this.renderCategories()}
          <div>
            <input type = "submit"  value = "editar"/>
          </div>
        </form>
      </div>
    )
  }
}
import React, {Component} from 'react'
import uuid from 'uuid-base62'
import styles from './styles.css'
import Categories from './categories'
import {Link} from 'react-router-dom'
export default function Anime (props) {
  let {anime} = props
  return (
      <div className = {styles.containerAnime}>
        <Link to = {`/admin/anime/${anime.id}/edit`} >
          <div className = {styles.containerImagen}>
            <img className = {styles.imageAnime}  src = {anime.thumbnail} />
            <div className = {styles.animeName}> {anime.name}</div>
            {anime.categories?
              <Categories categories = {anime.categories} />
            : null}
          </div>
        </Link>
      </div>
    )
}
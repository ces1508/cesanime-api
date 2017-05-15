import React, {Component} from 'react'
import styles from './styles.css'
import uuid from 'uuid-base62'
export default function Categories (props) {
  let {categories} = props
  console.log(categories)
  return (
    <div className = {styles.categories}>
      {
        categories.map((category, index) => (
          <div className = {styles.category} key = {uuid.v4()}>
            <img src = "/images/clothes-tag.svg"></img><spam > {category} </spam>
          </div>
        ))
      }
    </div>
  )
}
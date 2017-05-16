import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

const URL = 'https://api.graph.cool/simple/v1/cj2rx8x5bk1td0160k06m4pps'

export const FETCH = query =>
  fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json())

const COUNTER = `
        id
        title
        count
        createdAt
        updatedAt
`

export const counters = () =>
  FETCH(`
    query {
      counters: allCounters {
        ${ COUNTER }
      }
    }
  `)

export const counter = (id) =>
  FETCH(`
    query {
      Counter(id: "${ id }") {
        ${ COUNTER }
      }
    }
  `)

export const createCounter = ({ title, count = 0 }) =>
  FETCH(`
    mutation {
      counter: createCounter(count: ${ count }, title: "${ title }") {
        ${ COUNTER }
      }
    }
  `)


export const updateCounterCount = (id, count) =>
  FETCH(`
    mutation {
      counter: updateCounter(id: "${ id }", count: ${ count }) {
        ${ COUNTER }
      }
    }
  `)

export const updateCounterTitle = (id, title) =>
  FETCH(`
    mutation {
      counter: updateCounter(id: "${ id }", title: "${ title }") {
        ${ COUNTER }
      }
    }
  `)

export const deleteCounter = (id) =>
  FETCH(`
    mutation {
      counter: deleteCounter(id: "${ id }") {
        ${ COUNTER }
      }
    }
  `)

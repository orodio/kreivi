import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

const URL = 'https://api.graph.cool/simple/v1/cj2rx8x5bk1td0160k06m4pps'

const FETCH = query =>
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

const counters = () =>
  FETCH(`
    query {
      counters: allCounters {
        ${ COUNTER }
      }
    }
  `)

const counter = (id) =>
  FETCH(`
    query {
      Counter(id: "${ id }") {
        ${ COUNTER }
      }
    }
  `)

const createCounter = ({ title, count = 0 }) =>
  FETCH(`
    mutation {
      counter: createCounter(count: ${ count }, title: "${ title }") {
        ${ COUNTER }
      }
    }
  `)


const updateCounterCount = (id, count) =>
  FETCH(`
    mutation {
      counter: updateCounter(id: "${ id }", count: ${ count }) {
        ${ COUNTER }
      }
    }
  `)

const updateCounterTitle = (id, title) =>
  FETCH(`
    mutation {
      counter: updateCounter(id: "${ id }", title: "${ title }") {
        ${ COUNTER }
      }
    }
  `)

const deleteCounter = (id) =>
  FETCH(`
    mutation {
      counter: deleteCounter(id: "${ id }") {
        ${ COUNTER }
      }
    }
  `)

export default {
  counters,
  counter,
  createCounter,
  updateCounterCount,
  updateCounterTitle,
  deleteCounter,
}

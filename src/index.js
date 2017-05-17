import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/do'

const URL = 'https://api.graph.cool/simple/v1/cj2rx8x5bk1td0160k06m4pps'
const POLL_RATE = 1500

const tick$ =
  Observable
    .interval(POLL_RATE)
    .share()

export const FETCH = query =>
  fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json())
    .then(res => res.data)

const COUNTER = `id title count createdAt updatedAt`

export const counters = () =>
  FETCH(`{counters:allCounters(orderBy:createdAt_ASC){id hash:updatedAt}}`)

export const counters$ = () =>
  tick$
    .mergeMap(() => Observable.fromPromise(counters()))

export const counter = id =>
  FETCH(`{counter:Counter(id:"${ id }"){ ${ COUNTER }}}`)

export const counter$ = id =>
  tick$
    .mergeMap(() => Observable.fromPromise(counter(id)))

export const createCounter = ({ title, count = 0 }) =>
  FETCH(`mutation{counter:createCounter(count:${ count },title:"${ title }"){${ COUNTER }}}`)

export const updateCounterCount = (id, count) =>
  FETCH(`mutation{counter:updateCounter(id:"${ id }",count:${ count }){${ COUNTER }}}`)

export const updateCounterTitle = (id, title) =>
  FETCH(`mutation{counter:updateCounter(id:"${ id }",title:"${ title }"){${ COUNTER }}}`)

export const deleteCounter = id =>
  FETCH(`mutation{counter:deleteCounter(id:"${ id }"){${ COUNTER }}}`)

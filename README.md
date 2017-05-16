```
type Id = String
type Title = String
type Count = Number
type Date = String

type Counter = {
  id:        Id,
  title:     Title,
  count:     Count,
  createdAt: Date,
  updatedAt: Date,
}

type Response<D> = Promise<{
  data: D,
  errors?: [
    message: String,
    locations: Array<{ line: Number, column: Number }>
  ],
}>

counters :: () -> Response<{ counters: Array<Counter> }>
counter :: Id -> Response<{ counter: Counter }>
createCounter :: { title: Title, count?: Count } -> Response<{ counter: Counter }>
updateCounterCount :: (Id, Count) -> Response<{ counter: Counter }>
updateCounterTitle :: (Id, Count) -> Response<{ counter: Counter }>
deleteCounter :: (Id) -> Response<{ counter: Counter }>
```

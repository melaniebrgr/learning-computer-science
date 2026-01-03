import Query from './query'

const query = new Query();

query.obtain({
  queryKey: ['mediaDevices'],
  queryFn: () => navigator.mediaDevices.enumerateDevices()
})

function App() {
  console.log(query)

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App

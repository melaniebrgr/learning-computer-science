# Data fetching in React

Web applications need to handle the three main states of Network requests: loading, success, and error. We can have race conditions from triggering multiple requests at the same time that can cause flashes of content from request that were already in flight before the next request triggered. Another issue is request and data duplication. "By default, the fetched data is only ever local to the component that fetched it – that's how React works. That means, for every component that needs the same data, we have to refetch it."

```jsx
import * as React from "react"
import PokemonCard from "./PokemonCard"
import ButtonGroup from "./ButtonGroup"

export default function App () {
  const [id, setId] = React.useState(1)
  const [pokemon, setPokemon] = React.useState(null) // handle success
  const [isLoading, setIsLoading] = React.useState(true) // handle loading
  const [error, setError] = React.useState(null) // handle error

  React.useEffect(() => {
    let ignore = false // multiple request race condition

    const handleFetchPokemon = async () => {
      setPokemon(null)
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if (ignore) {
          return 
        }

        if (res.ok === false) {
          throw new Error(`Error fetching pokemon #${id}`)
        }

        const json = await res.json()

        setPokemon(json)
        setIsLoading(false)
      } catch (e) {
        setError(e.message)
        setIsLoading(false)
      }
    }

    handleFetchPokemon()

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <>
      <PokemonCard 
        isLoading={isLoading} 
        data={pokemon} 
        error={error}
      />
      <ButtonGroup handleSetId={setId} />
    </>
  )
}
```

In summary, data fetching utilities should handle

- network states (loading, success, error)
- request race conditions (multiple requests from the same component that return different data)
- request deduplication (multiple requests from the same component that should return the same data)

- request deduplication
- request batching
- request cancellation
- request polling
- request caching
- request error handling
- request timeout handling
- request retry handling
- request cancellation handling
- request polling handling
- request caching handling
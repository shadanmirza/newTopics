import React from 'react'
import Badge from './components/Badge'

const App = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">
        React
      </Badge>

      <Badge variant="green">
        JavaScript
      </Badge>

      <Badge variant="purple">
        TypeScript
      </Badge>

      <Badge variant="red">
        Error
      </Badge>

      <Badge variant="yellow">
        Pending
      </Badge>

      <Badge variant="gray">
        Draft
      </Badge>
    </div>
  )
}

export default App
import React from 'react'
import uuid from 'uuid'
import { SHA256 } from 'crypto-js'
import blockchain from '../services/blockchain'

import { compose, withHandlers, withState } from 'recompose'

import Select from 'react-select'

const ItemList = ({ items }) => (
  <div className="ItemList">
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <pre>{JSON.stringify(item)}</pre>
        </li>
      ))}
    </ul>
  </div>
)

const App = ({
  message,
  setMessage,
  difficulty,
  setDifficulty,
  items,
  pushMessage,
  generateBlock,
}) => (
  <div className="App">
    <h1>Testing</h1>
    <div className="form-group">
      <label>Difficulty</label>
      <Select
        name="difficulty"
        value={difficulty}
        options={[
          { label: 'None (0)', value: 0 },
          { label: 'Easy (1)', value: 1 },
          { label: 'Medium (2)', value: 2 },
          { label: 'Hard (4)', value: 4 },
        ]}
        onChange={setDifficulty}
        simpleValue
      />
    </div>
    <div className="form-group">
      <label>Message</label>
      <div>
        <input
          type="text"
          className="field"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={() => pushMessage()} className="btn btn-primary">
          Push
        </button>
      </div>
    </div>
    <div>
      <button onClick={() => generateBlock()} className="btn btn-primary">
        Generate Next Block
      </button>
    </div>
    <hr />
    <h1>Items in next block</h1>
    <ItemList items={items} />
  </div>
)

export default compose(
  withState('message', 'setMessage', ''),
  withState('items', 'setItems', []),
  withState('difficulty', 'setDifficulty', 2),
  withState('hash', 'setHash', null),
  withHandlers({
    pushMessage: ({ message, setMessage, items, setItems }) => () => {
      const payload = {
        id: uuid(),
        content: message,
      }
      setMessage('')
      setItems([...items, payload])
    },
    generateBlock: ({ items, setItems, difficulty, hash, setHash }) => () => {
      const proofOfWork = blockchain.getProofOfWork(items, hash, difficulty)
      console.log({ proofOfWork })
      setHash(proofOfWork.hash)
      setItems([])
    },
  }),
)(App)

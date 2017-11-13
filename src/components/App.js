import React from 'react'
import uuid from 'uuid'
import blockchain from 'services/blockchain'

import { compose, withHandlers, withProps, withState } from 'recompose'

import Select from 'react-select'
import ItemsList from 'components/items/ItemsList'
import BlocksList from 'components/blocks/BlocksList'

const App = ({
  message,
  setMessage,
  difficulty,
  setDifficulty,
  items,
  blocks,
  pushMessage,
  generateBlock,
}) => (
  <div className="App p3">
    <h1>JS Blockchain</h1>
    <p>
      <a href="https://www.github.com/de314/js-blockchain">
        View documentation.
      </a>
    </p>
    <div className="form-group mt2">
      <label>Difficulty</label>
      <Select
        name="difficulty"
        value={difficulty}
        options={[
          { label: 'None (0)', value: 0 },
          { label: 'Easy (4)', value: 4 },
          { label: 'Medium (16)', value: 16 },
          { label: 'Hard (24)', value: 24 },
        ]}
        onChange={setDifficulty}
        simpleValue
      />
    </div>
    <div className="form-group mt2">
      <label>Message</label>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            pushMessage()
          }}
        >
          <input
            type="text"
            className="field col-12"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Press enter to submit message"
          />
        </form>
      </div>
    </div>
    <div className="mt2 mb3">
      <button
        onClick={() => generateBlock()}
        className="btn btn-primary bg-green"
      >
        Generate Next Block
      </button>
    </div>
    <hr />
    <h1>Items in next block</h1>
    <ItemsList items={items} />
    <hr />
    <h1>Blocks</h1>
    <BlocksList blocks={blocks} />
  </div>
)

const initBlock = () => ({ type: 'INITIALIZE_BLOCK', ts: new Date().getTime() })

export default compose(
  withState('message', 'setMessage', ''),
  withState('items', 'setItems', [initBlock()]),
  withState('blocks', 'setBlocks', []),
  withState('difficulty', 'setDifficulty', 4),
  withState('hash', 'setHash', null),
  withHandlers({
    pushMessage: ({ message, setMessage, items, setItems }) => () => {
      const payload = {
        type: 'MESSAGE',
        id: uuid(),
        content: message,
        ts: new Date().getTime(),
      }
      setMessage('')
      setItems([...items, payload])
    },
    generateBlock: ({
      items,
      setItems,
      blocks,
      setBlocks,
      difficulty,
      hash,
      setHash,
    }) => () => {
      const proofOfWork = blockchain.getProofOfWork(items, hash, difficulty)
      setHash(proofOfWork.hash)
      setItems([initBlock()])
      setBlocks([...blocks, proofOfWork])
    },
  }),
  withProps(({ items, blocks }) => ({
    items: items.slice(0).reverse(),
    blocks: blocks.slice(0).reverse(),
  })),
)(App)

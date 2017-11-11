import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { withProps } from 'recompose'

import Mono from 'components/Mono'
import ItemsList from 'components/items/ItemsList'

let Block = ({ block: { hash, items, nonce, previousHash }, ts }) => (
  <div className="Block">
    <div className="border bg-silver p2 m1">
      <div className="p1 bg-white">
        <div>
          <span className="p1">
            Block Hash: <Mono>{hash}</Mono>
          </span>
          <span className="p1">
            Nonce: <Mono>{nonce.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Mono>
          </span>
        </div>
        <div>
          <span className="p1">
            Prev Hash: <Mono>{previousHash}</Mono>
          </span>
        </div>
        <div>
          <span className="p1">
            Timestamp:{' '}
            <Mono>
              {ts.format()} - {ts.fromNow()}
            </Mono>
          </span>
        </div>
        <hr />
        <ItemsList items={items} />
      </div>
    </div>
  </div>
)

Block = withProps(({ block: { ts } }) => ({
  ts: moment(ts),
}))

Block.propTypes = {
  block: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    nonce: PropTypes.string.isRequired,
    previousHash: PropTypes.string,
    ts: PropTypes.number.isRequired,
  }).isRequired,
}

export default Block

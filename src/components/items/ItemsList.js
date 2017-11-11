import React from 'react'
import PropTypes from 'prop-types'

import Mono from 'components/Mono'

const ItemsList = ({ items }) => (
  <div className="ItemsList">
    {items.map((item, i) => (
      <div className="border p1 m1" key={i}>
        <Mono>{JSON.stringify(item)}</Mono>
      </div>
    ))}
  </div>
)
ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ItemsList

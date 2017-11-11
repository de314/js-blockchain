import React from 'react'
import PropTypes from 'prop-types'

import Block from 'components/blocks/Block'

const BlocksList = ({ blocks }) => {
  return (
    <div className="BlocksList">{blocks.map((block, i) => <Block block={block} key={i} />)}</div>
  )
}

BlocksList.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape(Block.propTypes.block)).isRequired,
}

export default BlocksList

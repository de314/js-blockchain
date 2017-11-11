import sha256 from 'crypto-js/sha256'
import Hex from 'crypto-js/enc-hex'
import WordArray from 'crypto-js/lib-typedarrays'
import merkle from 'merkle'

const LEADING_MASKS = [
  0x0,
  0x80000000,
  0xc0000000,
  0xe0000000,
  0xf0000000,
  0xf8000000,
  0xfc000000,
  0xfe000000,
  0xff000000,
  0xf8000000,
  0xfc000000,
  0xfe000000,
  0xff000000,
  0xff800000,
  0xffc00000,
  0xffe00000,
  0xfff00000,
  0xfff80000,
  0xfffc0000,
  0xfffe0000,
  0xffff0000,
  0xffff8000,
  0xffffc000,
  0xffffe000,
  0xfffff000,
  0xfffff800,
  0xfffffc00,
  0xfffffe00,
  0xffffff00,
  0xffffff80,
  0xffffffc0,
  0xffffffe0,
  0xfffffff0,
  0xfffffff8,
  0xfffffffc,
  0xfffffffe,
  0xffffffff,
]

function getBlockHeader(curr, nonce) {
  const tmp = curr.clone()
  tmp.concat(new WordArray.init([nonce], 1))
  return sha256(tmp)
}

function getProofOfWork(items, previousHash, difficulty) {
  const tree = merkle('sha256').sync(items)
  const rawRoot = tree.root()
  const pHash = !!previousHash ? Hex.parse(previousHash) : null
  const itemsHash = Hex.parse(rawRoot)
  if (!!pHash) {
    itemsHash.concat(pHash)
  }
  let nonce = 0
  let hash = getBlockHeader(itemsHash, ++nonce)
  while (LEADING_MASKS[difficulty] & hash.words[0]) {
    hash = getBlockHeader(itemsHash, ++nonce)
  }
  return {
    previousHash,
    hash: hash.toString(),
    nonce,
    items,
    difficulty,
    ts: new Date().getTime(),
  }
}

export default {
  getProofOfWork,
}

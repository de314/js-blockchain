import { SHA256 } from 'crypto-js'

const LEADING_PATTERN = /^(0*)/

function countLeading(str) {
  return LEADING_PATTERN.exec(str)[0].length
}

function getProofOfWork(items, previousHash, difficulty) {
  let nonce = 0
  let payload = `${previousHash}::${JSON.stringify(items)}::`
  let hash = SHA256(payload + ++nonce).toString()
  let count = countLeading(hash)
  while (count < difficulty) {
    hash = SHA256(payload + ++nonce).toString()
    count = countLeading(hash)
  }
  return {
    items,
    previousHash,
    difficulty,
    hash,
    nonce,
  }
}

export default {
  countLeading,
  getProofOfWork,
}

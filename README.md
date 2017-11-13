# Usage

```
npm install && npm start
```

The page will be available at http://localhost:3000 or view the [demo](https://de314.github.io/js-blockchain)

# Intro - How the blockchain works

Most people think of the Bitcoin (BTC) blockchain. At a high level the BTC blockchain
is made up of `blocks`, `hashes`, and `transactions`.

* *Hash:* a number that represents another piece of information. See [SHA256](https://en.wikipedia.org/wiki/SHA-2).
* *Transaction:* In the BTC blockchain this is the transfer of digital currency between
two users. In a more general blockchain it can be any type of data.
* *Block:* A group of transactions that has been cryptographically signed.

A blockchain node will keep track of all "valid uncommitted" transactions. Each
transaction is hashed into a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree); the Merkle Tree outputs a
single hash that represents all transactions in the block. This hash is then combined
with the "block hash" from the previous block. The resulting string is then combined
with a random value called a "nonce". All three values are hashed resulting in the
final "block hash".

`blockHash = SHA256(previousHash + transactionHash + nonce)`

Blockchains place an additional constraint on the blockHash. It must satisfy a difficulty
rating. On the BTC blockchain, a difficulty rating will be published. The client
nodes can calculate the "target" based on the difficulty rating. This takes advantage
of the fact that a hash is really just a 256 bit number. The target is just a "maximum."
That means that a valid blockHash MUST be less than the target number. So if the
generated hashBlock does not satisfy the difficulty rating, less than target, the
node must try again. It can either select a difference nonce, or append additional
transactions. This will change the value being hashed and therefore change the final
blockHash.

This is really hard to do since the output of SHA256 is "approximately uniformly
random on random data." That means that there is not easy way to guess what nonce
will provide a 256 bit number that is less than the target. So we just keep guessing
until we get lucky and find one at random. The BTC blockchain difficulty has been
increasing because more and more nodes are joining the cluster. That means that
there are more random guessing per second, and therefore one of the machines is
more likely to find the correct nonce. So we just have to increase the difficulty
by selecting a smaller target or max value for valid blockHashes.

# What is happening?

This demo allows you to enter messages. These messages are supplied an ID and
timestamp and stored in a JSON object. Just type a message in the text box and press
[ENTER].

You can then generate a new block by clicking the button. This will kick off a process
that will attempt to generate a new block hash.

This code satisfied difficulty slightly differently. It does not calculate a target,
but instead calculates the number of leading `0` bits. It is obviously more difficult
to calculate a number with 32 leading `0` bits than it is a number with 4 leading `0`'s.
Essentially it is a more simple `<` comparison.

The code will calculate a Merkle Tree using [merkle (on npm)](https://www.npmjs.com/package/merkle) and
then calculates the blockHash using [crypto-js (on npm)](https://www.npmjs.com/package/crypto-js) using `SHA256`. It uses
an integer nonce that represents the count. So when the `nonce=22` that means it
took 22 attempts to find a valid blockHash based on the current difficulty.

## Libraries

* ReactJS via [Create React App](https://github.com/facebookincubator/create-react-app)
* [BassCSS@7.1.1](http://basscss.com/v7/docs/base-forms/)
*

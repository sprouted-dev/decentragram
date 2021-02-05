const Decentragram = artifacts.require('./Decentragram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram

  before(async () => {
    decentragram = await Decentragram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentragram.name()
      assert.equal(name, 'Decentragram')
    })
  })

  describe('images', async () => {
    let result, imageCount;
    const hash = 'test';

    before(async () => {
      result = await decentragram.uploadImage(hash, 'clever description', { from: author });
      imageCount = await decentragram.imageCount()
    })

    it('creates images', async () => {
      const event = result.logs[0].args;
      event.hash.should.equal(hash)
      imageCount.toNumber().should.equal(1)
    })

    it('requires a hash, description and valid sender', async () => {
      await decentragram.uploadImage(1, 'clever description', { from: author }).should.be.rejected;
      await decentragram.uploadImage(hash, 0, { from: author }).should.be.rejected;
      await decentragram.uploadImage(hash, 'clever description', '').should.be.rejected;
    })

    it('lists images', async () => {
      const image = await decentragram.images(imageCount);
      image.id.toNumber().should.equal(imageCount.toNumber());
    })
  })

})
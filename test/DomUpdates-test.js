import DomUpdates from '../src/DomUpdates';
const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

describe.only('DomUpdates', function() {
  let domUpdates;
  let user;
  beforeEach(() => {
    domUpdates = new DomUpdates();
    user = {};
  });
  afterEach(function() {
    chai.spy.restore(domUpdates)
  });

  it('Should be able to update the dropdown menu with user information', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['updateDropdown'], () => {});

    domUpdates.updateDropdown(user)

    expect(domUpdates.updateDropdown).to.have.been.called(1);
    expect(domUpdates.updateDropdown).to.have.been.called.with(user);
  })
})
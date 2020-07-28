// My package-lock.json changed. I think when I ran npm install chai-spies
import DomUpdates from '../src/DomUpdates';
import User from '../src/User'
const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;


chai.use(spies);

describe.only('DomUpdates', function() {
  let domUpdates;
  let user;
  beforeEach(() => {
    domUpdates = new DomUpdates(); // do we need to include parameters here?
    user = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ]
    });
  });
  afterEach(function() {
    chai.spy.restore(domUpdates)
  });

  it('Should spy on updateDropdown', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['updateDropdown'], () => {});

    domUpdates.updateDropdown(user)

    expect(domUpdates.updateDropdown).to.have.been.called(1);
    expect(domUpdates.updateDropdown).to.have.been.called.with(user);
  })
})
import DomUpdates from '../src/DomUpdates';
const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

describe.only('DomUpdates', function() {
  let domUpdates;
  let user;
  let userRepository;
  let todayDate;
  let averageOunces;
  beforeEach(() => {
    domUpdates = new DomUpdates();
    user = {};
    userRepository = {};
    todayDate = "2019/09/22"
    averageOunces = 64
  });
  afterEach(function() {
    chai.spy.restore(domUpdates)
  });

  it('Should be able to update the dropdown menu with user information', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['updateDropdown'], () => {});

    domUpdates.updateDropdown(user);

    expect(domUpdates.updateDropdown).to.have.been.called(1);
    expect(domUpdates.updateDropdown).to.have.been.called.with(user);
  })

  it('Should be able to create the friends step list with user information and today\'s date', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['createFriendsStepList'], () => {});

    domUpdates.createFriendsStepList(userRepository, user, todayDate);

    expect(domUpdates.createFriendsStepList).to.have.been.called(1);
    expect(domUpdates.createFriendsStepList).to.have.been.called.with(userRepository, user, todayDate);
  })

  it('Should be able to update the hydration friend card with number of ounces', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['updateHydrationFriendCard'], () => {});

    domUpdates.updateHydrationFriendCard(averageOunces);

    expect(domUpdates.updateHydrationFriendCard).to.have.been.called(1);
    expect(domUpdates.updateHydrationFriendCard).to.have.been.called.with(averageOunces);
  })

})
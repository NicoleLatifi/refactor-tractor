const chai = require('chai')
const expect = chai.expect
const spies = require('chai-spies');
const domStuff = require('../src/domStuff')
chai.use(spies);

describe('DomStuff', ()=> {
  beforeEach(() => {
    global.document = {};
    chai.spy.on(document, ['querySelector'],
    () => {
      return { innerText: '' }
    });
  });
  it('modify the hydration user ounces', () => {
    const hydrationData = [ { userID: 1, date: '07/23/2020', numOunces: 64 } ];
    const userId = 1;

    domStuff.modifyHydrationData(hydrationData, userId)

    expect(document.querySelector).to.have.been.called(1)
    expect(document.querySelector).to.have.been.called.with('#hydration-user-ounces-today')
  })
});

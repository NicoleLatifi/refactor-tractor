const spies = require('chai-spies');
const { expect } = require('chai');

chai.use(spies);

global.domUpdates
chai.spy.on(domUpdates, ['updateDropdown', () => {}]);
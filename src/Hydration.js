import Entry from './Entry';

class Hydration extends Entry {
  constructor(data, userRepository) {
    super(data, userRepository);
    this.ounces = data.numOunces;
    this.drink(userRepository);
  }

  drink(userRepo) {
    var hydrate = this;
    userRepo.users.find(function(user) {
      return user.id === hydrate.userId;
    }).updateHydration(this.date, this.ounces);
  }
}

export default Hydration;

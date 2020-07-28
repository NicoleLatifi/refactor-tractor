class Activity {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.numSteps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.doActivity(userRepository);
  }

  doActivity(userRepo) {
    var activity = this;
    var targetUser = userRepo.users.find(user => {
      return user.id === activity.userId;
    });
    targetUser.updateActivities(this);
  }

  calculateMiles(userRepository) {
    let walkingUser = userRepository.users.find(user => {
      return user.id === this.userId;
    });
    return Math.round(this.numSteps * walkingUser.strideLength / 5280).toFixed(1);
  }

  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users.find(user => {
      return user.id === this.userId;
    }).dailyStepGoal;
    this.reachedStepGoal = this.numSteps >= userStepGoal;
  }
}

export default Activity;

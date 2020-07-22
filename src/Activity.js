// The purpose of this class is to instantiate new activity objects from the dataset, and allow us to use methods on that data.
class Activity { 
  constructor(data, userRepository) { // instantiated with data from dataset, and userRepository to access a specific user?
    this.userId = data.userID; // stores unique user ID to link with User who created this activity
    this.date = data.date; // stores the date that this activity data was logged
    this.steps = data.numSteps; // stores the number of steps taken (per day?) ???
    this.minutesActive = data.minutesActive; // stores the length of the activity logged in minutes
    this.flightsOfStairs = data.flightsOfStairs; // stores flights of stairs walked (steps / 12?) ???
    this.milesWalked = 0; // stores miles walked during activity
    this.reachedStepGoal = null; // probably assigned a boolean if goal is reached in session
    this.doActivity(userRepository); // calls this function on instantiation
  }
  // newLine
  doActivity(userRepo) { // takes in the userRepository (invoked in Activity class constructor, above)
    var activity = this;
    userRepo.users.find(user => { // converted to ES6 arrow syntax ✔️
      return user.id === activity.userId; // locates & retrieves associated user
    }).updateActivities(this); // adds activity to user's activityRecord, and adds date of activity to user's accomplishedDays if step goal is reached.
  }
  // newLine
  calculateMiles(userRepository) { // invoked in scripts on line 224
    let walkingUser = userRepository.users.find(user => { 
      return user.id === this.userId; // locates & retrieves associated user
    });
    return Math.round(this.steps * walkingUser.strideLength / 5280).toFixed(1); 
  } // calculates steps based on user's strideLength (in feet), divides by 5280, returns number of miles with 1 decimal point.
  // newLine
  compareStepGoal(userRepository) { // not sure this is being invoked anywhere?
    let userStepGoal = userRepository.users.find(user => { // ACTION: this happens in every method. Make this a helper findUser()?
      return user.id === this.userId;// locates & retrieves associated user
    }).dailyStepGoal; // gets dailyStepGoal from found user, assigns to userStepGoal.
    this.reachedStepGoal = this.steps >= userStepGoal; // returns a boolean based on whether goal was met or not, stores in this.reachedStepGoal
  }
}

export default Activity;

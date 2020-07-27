class DomUpdates {
  constructor() {

  }

  updateHydrationMainCard(hydrationData, user, todayDate) {
    let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
    let hydrationEntry = hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    });
    if (hydrationEntry === undefined) {
      hydrationUserOuncesToday.innerText = 0;
    } else {
      hydrationUserOuncesToday.innerText = hydrationEntry.ounces;
    }
  }

  updateHydrationInfoCard(hydrationData, user, todayDate) {
    let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
    hydrationInfoGlassesToday.innerText = (hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    }).ounces / 8).toFixed(1);
  }

  updateHydrationFriendCard(averageOunces) {
    let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
    hydrationFriendOuncesToday.innerText = averageOunces;
  }

  updateHydrationCalendarCard(user, sortedHydrationDataByDate) {
    let dailyOz = document.querySelectorAll(".daily-oz");
    for (var i = 0; i < dailyOz.length; i++) { // convert into forEach  <--------------- Hey!
      dailyOz[i].innerText = user.addDailyOunces(
        Object.keys(sortedHydrationDataByDate[i])[0]
      );
    }
  }

  updateSleepMainCard(sleepData, user, todayDate) {
    let sleepUserHoursToday = document.querySelector("#sleep-user-hours-today");
    let sleepHoursEntry = sleepData.find((sleep) => {
      return sleep.userId === user.id && sleep.date === todayDate;
    });
    if (sleepHoursEntry === undefined) {
      sleepUserHoursToday.innerText = 0;
    } else {
      sleepUserHoursToday.innerText = sleepHoursEntry.hoursSlept;
    }
  }

  updateSleepInfoCard(sleepData, user, todayDate) {
    let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
    let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
    let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
    let sleepInfoEntry = sleepData.find(sleep => {
      return sleep.userId === user.id && sleep.date === todayDate;
    });
    // if (sleepInfoEntry === undefined) {
    //   sleepInfoQualityToday.innerText = 0;
    //   sleepInfoQualityAverageAlltime.innerText = 0;
    //   sleepInfoHoursAverageAlltime.innerText = 0;
    // } else {
      sleepInfoQualityToday.innerText = sleepInfoEntry.sleepQuality || 0; // Let's make sure this is working the way we want it to, otherwise let's remove these pipes.
      sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage || 0; 
      sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage || 0; 
    // }
  }

  updateSleepFriendCard(userRepository, todayDate) {
    let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
    let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
    sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
      return user.id === userRepository.getLongestSleepers(todayDate)
    }).getFirstName();
  
    sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
      return user.id === userRepository.getWorstSleepers(todayDate)
    }).getFirstName();
  }

  updateSleepCalendarCard(user, todayDate) {
    let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
    let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
    sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
    sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
  }

  updateStepsMainCard(activityData, user, todayDate) {
    let stepsUserStepsToday = document.querySelector("#steps-user-steps-today");
    let activityEntry = activityData.find((activity) => { 
      return activity.userId === user.id && activity.date === todayDate;
    });
    if (activityEntry === undefined) {
      stepsUserStepsToday.innerText = 0;
    } else {
      stepsUserStepsToday.innerText = activityEntry.numSteps;
    }
  }

  updateStepsInfoCard(activityData, user, todayDate, userRepository) { // Maybe split this into two helperz
    let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
    let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
    let activityEntry = activityData.find(activity => {
      return activity.userId === user.id && activity.date === todayDate;
    });
    if (activityEntry === undefined) {
      stepsInfoActiveMinutesToday.innerText = 0;
    } else {
      stepsInfoActiveMinutesToday.innerText = activityEntry.minutesActive;
    }
    let milesActivityEntry = user.activityRecord.find(activity => {
      return (activity.date === todayDate && activity.userId === user.id);
    });
    if (milesActivityEntry === undefined) {
      stepsInfoMilesWalkedToday.innerText = 0;
    } else {
      stepsInfoMilesWalkedToday.innerText = milesActivityEntry.calculateMiles(userRepository);
    }
  }

  updateStepsFriendCard(userRepository, todayDate) {
    let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
    let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
    let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
    stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
    stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
    stepsFriendAverageStepGoal.innerText = userRepository.calculateAverageStepGoal();
  }
}

export default DomUpdates;
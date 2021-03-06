class DomUpdates {
  constructor(hydrationData, sleepData, activityData) {
    this.hydrationData = hydrationData;
    this.sleepData = sleepData;
    this.activityData = activityData
  }

  updateDropdown(user) {
    let dropdownGoal = document.querySelector('#dropdown-goal');
    let dropdownEmail = document.querySelector('#dropdown-email');
    let dropdownName = document.querySelector('#dropdown-name');
    dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
    dropdownEmail.innerText = `EMAIL | ${user.email}`;
    dropdownName.innerText = user.name.toUpperCase();
  }

  createFriendsStepList(userRepository, user, todayDate) {
    let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
    user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
    user.friendsActivityRecords.forEach(friend => {
      dropdownFriendsStepsContainer.innerHTML += `
      <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
      `;
    });
  }

  styleFriends() {
    let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
    friendsStepsParagraphs.forEach(paragraph => {
      if (friendsStepsParagraphs[0] === paragraph) {
        paragraph.classList.add('green-text');
      }
      if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
        paragraph.classList.add('red-text');
      }
      if (paragraph.innerText.includes('YOU')) {
        paragraph.classList.add('yellow-text');
      }
    });
  }

  updateHeader(user) {
    let headerName = document.querySelector("#header-name");
    headerName.innerText = `${user.getFirstName()}'S `;
  }

  updateHydrationMainCard(user, todayDate) {
    let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
    let hydrationEntry = this.hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    });
    if (hydrationEntry === undefined) {
      hydrationUserOuncesToday.innerText = 0;
    } else {
      hydrationUserOuncesToday.innerText = hydrationEntry.ounces;
    }
  }

  updateHydrationInfoCard(user, todayDate) {
    let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
    hydrationInfoGlassesToday.innerText = (this.hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    }).ounces / 8).toFixed(1);
  }

  updateHydrationFriendCard(averageOunces) {
    let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
    hydrationFriendOuncesToday.innerText = averageOunces;
  }

  updateHydrationCalendarCard(user, sortedHydrationDataByDate) {
    let dailyOz = document.querySelectorAll(".daily-oz");
    dailyOz.forEach((entry, i) => {
      entry.innerText = user.addDailyOunces(
        Object.keys(sortedHydrationDataByDate[i])[0]
      );
    });
  }

  updateSleepMainCard(user, todayDate) {
    let sleepUserHoursToday = document.querySelector("#sleep-user-hours-today");
    let sleepHoursEntry = this.sleepData.find((sleep) => {
      return sleep.userId === user.id && sleep.date === todayDate;
    });
    if (sleepHoursEntry === undefined) {
      sleepUserHoursToday.innerText = 0;
    } else {
      sleepUserHoursToday.innerText = sleepHoursEntry.hoursSlept;
    }
  }

  updateSleepInfoCard(user, todayDate) {
    let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
    let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
    let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
    let sleepInfoEntry = this.sleepData.find(sleep => {
      return sleep.userId === user.id && sleep.date === todayDate;
    });
    if (sleepInfoEntry === undefined) {
      sleepInfoQualityToday.innerText = 0;
      sleepInfoQualityAverageAlltime.innerText = 0;
      sleepInfoHoursAverageAlltime.innerText = 0;
    } else {
      sleepInfoQualityToday.innerText = sleepInfoEntry.sleepQuality;
      sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
      sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
    }
  }

  updateSleepFriendCard(userRepository, todayDate) {
    let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
    let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
    sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
      return user.id === userRepository.getLongestSleepers(todayDate, this.sleepData)
    }).getFirstName();

    sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
      return user.id === userRepository.getWorstSleepers(todayDate, this.sleepData)
    }).getFirstName();
  }

  updateSleepCalendarCard(user, todayDate) {
    let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
    let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
    sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
    sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
  }

  updateStepsMainCard(user, todayDate) {
    let stepsUserStepsToday = document.querySelector("#steps-user-steps-today");
    let activityEntry = this.activityData.find((activity) => {
      return activity.userId === user.id && activity.date === todayDate;
    });
    if (activityEntry === undefined) {
      stepsUserStepsToday.innerText = 0;
    } else {
      stepsUserStepsToday.innerText = activityEntry.numSteps;
    }
  }

  updateStepsInfoCard(user, todayDate, userRepository) {
    let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
    let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
    let activityEntry = this.activityData.find(activity => {
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

  updateStepsCalendarCard(user, todayDate) {
    let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
    let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
    stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
    stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
  }

  updateStairsMainCard(user, todayDate) {
    let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
    stairsUserStairsToday.innerText = this.activityData.find(activity => {
      return activity.userId === user.id && activity.date === todayDate;
    }).flightsOfStairs * 12;
  }

  updateStairsInfoCard(user, todayDate) {
    let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
    stairsInfoFlightsToday.innerText = this.activityData.find(activity => {
      return activity.userId === user.id && activity.date === todayDate;
    }).flightsOfStairs;
  }

  updateStairsFriendCard(userRepository, todayDate) {
    let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
    stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  }

  updateStairsCalendarCard(user, todayDate) {
    let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
    let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
    stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
    stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
  }
}

export default DomUpdates;

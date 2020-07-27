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
}

export default DomUpdates;
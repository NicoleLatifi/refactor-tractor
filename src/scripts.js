import './css/styles.scss';

import userData from './data/users';
import activityData from './data/activity';
import sleepData from './data/sleep';
import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';


let userRepository = new UserRepository();
let user;
let todayDate = "2019/09/22";
// As we refactor, keep in mind that when we implement fetch, 
// we will need to make sure that things aren't dependent on 
// the promise being resolved before the rest of this script 
// runs synchronously

window.onload = getAllData();

function getAllData() {
  storeUserData();
  storeActivityData();
  storeHydrationData();
  storeSleepData();
  createUser();
}

function createUser() {
  let randomIndex = Math.floor(Math.random() * 50)
  user = userRepository.users[randomIndex];
  console.log(userRepository)
  user.findFriendsNames(userRepository.users);
}

function launchDomSequence() {
  updateFriendsStepDisplay();
  updateAllHydrationCards();
  updateAllSleepCards();
  updateAllStepsCards();
  updateAllStairsCards();
}

// function getUserData() {
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData")
//     .then(response => response.json())
//     .then(data => storeUserData(data))
//     .then(() => getActivityData())
//     .then(() => getHydrationData())
//     .then(() => getSleepData())
//     .catch(error => console.log(error));
// } // working as expected

function storeUserData() {
  userData.forEach(user => {
    let newUser = new User(user);
    userRepository.users.push(newUser)
  });
}

// function getActivityData() {
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData")
//     .then(response => response.json())
//     .then(data => storeActivityData(data))
//     .catch(error => console.log(error));
// }
  
function storeActivityData() { // Need to change when fetching
  activityData.forEach(activity => {
    activity = new Activity(activity, userRepository);
  });
}

// function getHydrationData() {
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData")
//     .then(response => response.json())
//     .then(data => storeHydrationData(data))
//     .catch(error => console.log(error));
// }

function storeHydrationData() {
  hydrationData.forEach(hydration => {
    hydration = new Hydration(hydration, userRepository);
  });
}

// function getSleepData() {
//   fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData")
//     .then(response => response.json())
//     .then(data => storeSleepData(data))
//     .catch(error => console.log(error))
// }

function storeSleepData() {
  sleepData.forEach(sleep => {
    sleep = new Sleep(sleep, userRepository);
  });
}

// let todayDate = "2019/09/22"; // convert to function so today's date is dynamic, and always current. ⏱

let mainPage = document.querySelector('main'); //event listener
let profileButton = document.querySelector('#profile-button'); //event listener
let stepsCalendarCard = document.querySelector('#steps-calendar-card');// used only once - click handler
let stairsFriendsCard = document.querySelector('#stairs-friends-card');// used once - click handler
let stairsInfoCard = document.querySelector('#stairs-info-card');//used once - click handler
let stairsMainCard = document.querySelector('#stairs-main-card');// click handler
let stairsTrendingButton = document.querySelector('.stairs-trending-button'); //used once
let stairsTrendingCard = document.querySelector('#stairs-trending-card'); //used only once - click handler
let stepsTrendingButton = document.querySelector('.steps-trending-button');//used once - event listener
let userInfoDropdown = document.querySelector('#user-info-dropdown');//used once

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays()); // Line 400
stepsTrendingButton.addEventListener('click', updateTrendingStepDays()); // Line 405
//Combine these four into a single click listener

launchDomSequence(); // Where does this really wanna live? THIS is a big one. <-----------------

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}// 

function showInfo() { //click handler
  let hydrationMainCard = document.querySelector('#hydration-main-card');
  let sleepMainCard = document.querySelector('#sleep-main-card');
  let stepsMainCard = document.querySelector('#steps-main-card');

  if (event.target.classList.contains("steps-info-button")) {
    let stepsInfoCard = document.querySelector("#steps-info-card");
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains("steps-friends-button")) {
    let stepsFriendsCard = document.querySelector("#steps-friends-card");
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains("steps-trending-button")) {
    let stepsTrendingCard = document.querySelector("#steps-trending-card");
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);// //
  }
  if (event.target.classList.contains("hydration-info-button")) {
    let hydrationInfoCard = document.querySelector("#hydration-info-card");
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);// //
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);// //
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard); //
  }
  if (event.target.classList.contains("stairs-calendar-button")) {
    let stairsCalendarCard = document.querySelector("#stairs-calendar-card");
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains("sleep-info-button")) {
    let sleepInfoCard = document.querySelector("#sleep-info-card");
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains("sleep-friends-button")) {
    let sleepFriendsCard = document.querySelector("#sleep-friends-card");
    flipCard(sleepMainCard, sleepFriendsCard); // //
  }
  if (event.target.classList.contains("sleep-calendar-button")) {
    let sleepCalendarCard = document.querySelector("#sleep-calendar-card");
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);//
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);//
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);// //
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);//
  }
}

function updateFriendsStepDisplay() { //dropdown handler
  updateDropdown();
  createFriendsStepList();
  styleFriends();
  updateHeader();
}

function updateDropdown() {
  let dropdownGoal = document.querySelector('#dropdown-goal'); 
  let dropdownEmail = document.querySelector('#dropdown-email');
  let dropdownName = document.querySelector('#dropdown-name');
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
}

function createFriendsStepList() {
  let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
  user.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `;
  });
}

function styleFriends() {
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

function updateHeader() {
  let headerName = document.querySelector("#header-name");
  headerName.innerText = `${user.getFirstName()}'S `;
}

function updateAllHydrationCards() { // hydration card handler
  updateHydrationMainCard();
  updateHydrationInfoCard();
  updateHydrationFriendCard();
  updateHydrationCalendarCard();
}

function updateHydrationMainCard() {
  let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
  hydrationUserOuncesToday.innerText = hydrationData.find(hydration => { // <------------------------------- Uses HYDRATIONDATA
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces;
}

function updateHydrationFriendCard() {
  let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today'); 
  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
}

function updateHydrationInfoCard() {
  let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
  hydrationInfoGlassesToday.innerText = (hydrationData.find(hydration => { // <------------------------------- Uses HYDRATIONDATA
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces / 8).toFixed(1); // do you want to make it so this only happens if the # isn't divisible by 1?
}

function sortHydration() {
  return user.ouncesRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });
}

function updateHydrationCalendarCard() {
  let dailyOz = document.querySelectorAll(".daily-oz");
  let sortedHydrationDataByDate = sortHydration();
  for (var i = 0; i < dailyOz.length; i++) { // convert into forEach  <---------------
    dailyOz[i].innerText = user.addDailyOunces(
      Object.keys(sortedHydrationDataByDate[i])[0]
    );
  } 
}

function updateAllSleepCards() { // sleep card handler
  updateSleepMainCard();
  updateSleepInfoCard();
  updateSleepFriendCard();
  updateSleepCalendarCard();
}

function updateSleepMainCard() {
  let sleepUserHoursToday = document.querySelector("#sleep-user-hours-today");
  sleepUserHoursToday.innerText = sleepData.find((sleep) => { // <------------------------------- Uses SLEEPDATA
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept;
}

function updateSleepInfoCard() {
  let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
  let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
  let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;//should update the DOM - does not seem to appear on page, required in rubric <-- ???
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
  sleepInfoQualityToday.innerText = sleepData.find(sleep => { // <------------------------------- Uses SLEEPDATA
    return sleep.userID === user.id && sleep.date === todayDate;
  }).sleepQuality;
}

function updateSleepFriendCard() {
  let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
  let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();

  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();
}

function updateSleepCalendarCard() {
  let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
  let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
}

function updateAllStepsCards() { // steps card handler
  updateStepsMainCard();
  updateStepsInfoCard();
  updateStepsFriendCard();
  updateStepsCalendarCard();
  // updateStepsTrendingCard(); // This is being called in a click handler
}

function updateStepsMainCard() {
  let stepsUserStepsToday = document.querySelector("#steps-user-steps-today");
  stepsUserStepsToday.innerText = activityData.find((activity) => { // <------------------------------- Uses ACTIVITYDATA
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps;
}

function updateStepsInfoCard() {
  let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
  let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
  stepsInfoActiveMinutesToday.innerText = activityData.find(activity => { // <------------------------------- Uses ACTIVITYDATA
    return activity.userID === user.id && activity.date === todayDate;
  }).minutesActive;
  
  stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository);
}

function updateStepsFriendCard() {
  let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
  let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
  let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
  stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
  stepsFriendAverageStepGoal.innerText = userRepository.calculateAverageStepGoal();
}

function updateStepsCalendarCard() {
  let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
  let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
}

function updateTrendingStairsDays() { // This is being called in a click handler
  let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}//may be appropriate to combine with updateTrendingStepDays

function updateTrendingStepDays() { // This is being called in a click handler
  let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
} // may be appropriate to combine with updateTrendingStairsDays

function updateAllStairsCards() { // stairs card handler
  updateStairsMainCard();
  updateStairsInfoCard();
  updateStairsFriendCard();
  updateStairsCalendarCard();
  // updateStairsTrendingCard(); // // This is being called in a click handler
}

function updateStairsMainCard() {
  let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
  stairsUserStairsToday.innerText = activityData.find(activity => { // <------------------------------- Uses ACTIVITYDATA
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12;
}

function updateStairsInfoCard() {
  let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
  stairsInfoFlightsToday.innerText = activityData.find(activity => { // <------------------------------- Uses ACTIVITYDATA
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs;
}

function updateStairsFriendCard() {
  let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
}

function updateStairsCalendarCard() {
  let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
  let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
}

// function updateStairsTrendingCard() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }//may be appropriate to combine with updateTrendingStepDays

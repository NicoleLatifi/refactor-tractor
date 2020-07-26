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
// launchDomSequence();
// let = userRepository.users[0]; //Now THIS is our problem.
// user.findFriendsNames(userRepository.users);
// As we refactor, keep in mind that when we implement fetch, 
// we will need to make sure that things aren't dependent on 
// the promise being resolved before the rest of this script 
// runs synchronously

window.onload = getAllData();

function getAllData() {
  // todayDate = "2019/09/22";
  storeUserData();
  storeActivityData();
  storeHydrationData();
  storeSleepData();
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

// sleepData.forEach(sleep => {
//     sleep = new Sleep(sleep, userRepository);
//   });


// let todayDate = "2019/09/22"; // convert to function so today's date is dynamic, and always current. ⏱

let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container'); //used only once
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card'); //used only once
let hydrationFriendsCard = document.querySelector('#hydration-friends-card'); //used only once
let hydrationInfoCard = document.querySelector('#hydration-info-card'); //used only once
let hydrationMainCard = document.querySelector('#hydration-main-card'); //used several times in showInfo()
let mainPage = document.querySelector('main'); //event listener
let profileButton = document.querySelector('#profile-button'); //event listener
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');//used only once (click handler)
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');// used only once
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');//used only once
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');//used only once
let sleepFriendsCard = document.querySelector('#sleep-friends-card');//used only once - click handler
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');//used only once
let sleepInfoCard = document.querySelector('#sleep-info-card');//used only once - click handler
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');//used only once
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');//used only once
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');//used only once
let sleepMainCard = document.querySelector('#sleep-main-card');//click handler
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');// used only once
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');// click handler
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');//used only once
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');// used only once
let stepsMainCard = document.querySelector('#steps-main-card');// click handler
let stepsInfoCard = document.querySelector('#steps-info-card');//used only once - click handler
let stepsFriendsCard = document.querySelector('#steps-friends-card');//used only once - click handler
let stepsTrendingCard = document.querySelector('#steps-trending-card'); // used only once - click handler
let stepsCalendarCard = document.querySelector('#steps-calendar-card');// used only once - click handler
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');//used once only
let stairsFriendsCard = document.querySelector('#stairs-friends-card');// used once - click handler
let stairsInfoCard = document.querySelector('#stairs-info-card');//used once - click handler
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');//used once
let stairsMainCard = document.querySelector('#stairs-main-card');// click handler
let stairsTrendingButton = document.querySelector('.stairs-trending-button'); //used once
let stairsTrendingCard = document.querySelector('#stairs-trending-card'); //used only once - click handler
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');//used only once
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');//used once
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');//used only once
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');//used only once
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');//used only once
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');//used only once
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');//used only once
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');//used only once
let stepsTrendingButton = document.querySelector('.steps-trending-button');//used once - event listener
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');//used once
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');//used once
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');//used once
let userInfoDropdown = document.querySelector('#user-info-dropdown');//used once
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays()); // Where are these functions?  <----------
stepsTrendingButton.addEventListener('click', updateTrendingStepDays()); // Wherrreee arreee youuooo?  <---------
launchDomSequence();
//Combine these four into a single click listener

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}// 

function showInfo() { //click handler
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);// //
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);// //
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);// //
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);// //
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);//
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);//
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);//
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
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);//
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);// //
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);// //
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);// //
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
  hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces;
}

function updateHydrationFriendCard() {
  let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today'); 
  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
}

function updateHydrationInfoCard() {
  let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
  hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces / 8;
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
  sleepUserHoursToday.innerText = sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept;//place in function - updates DOM
}

function updateSleepInfoCard() {
  sleepInfoQualityToday.innerText = sleepData.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).sleepQuality;//place in function - update DOM for last night sleep quality
  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;//should update the DOM - does not seem to appear on page, required in rubric
  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;//place into function - updates DOM (overall number of hours average on page)
}

function updateSleepFriendCard() {
  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();//put in function - updates DOM -- seems to function properly - poorly named
  
  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();//put in function - updates DOM - seems to function properly
}

function updateSleepCalendarCard() {
  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);//updates DOM - seems to function properly -put in function, locally scope?
  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);// updates DOM - seems to function properly - put in function, locally scope?
}

function updateAllStepsCards() { // steps card handler
  updateStepsMainCard();
  updateStepsInfoCard();
  updateStepsFriendCard();
  updateStepsCalendarCard();
  // updateStepsTrendingCard(); // This is being called in a click handler
}

function updateStepsMainCard() {
  stepsUserStepsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps;// update DOM for daily user steps - functioning
}

function updateStepsInfoCard() {
  stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).minutesActive;// place in funtion - updates DOM - functional
  
  stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository); //place in function - updates DOM - fuctional
  
}

function updateStepsFriendCard() {
  stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate); //place in function - updates DOM - appears to function
  
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);//place in function - updates DOM appears in  user icon flip
  
  stepsFriendAverageStepGoal.innerText = userRepository.calculateAverageStepGoal();//place in function - updates DOM - appears in user icon flip
}

function updateStepsCalendarCard() {
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);//place in function - updates DOM

  stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate); //place in function - updates DOM
}

function updateTrendingStairsDays() { // This is being called in a click handler
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}//may be appropriate to combine with updateTrendingStepDays

function updateTrendingStepDays() { // This is being called in a click handler
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
} //this function is the good one (replicated elsewhere) may be combined with updateTrendingStairsDays later on

function updateAllStairsCards() { // stairs card handler
  updateStairsMainCard();
  updateStairsInfoCard();
  updateStairsFriendCard();
  updateStairsCalendarCard();
  // updateStairsTrendingCard(); // // This is being called in a click handler
}

function updateStairsMainCard() {
  stairsUserStairsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12;// place in function - updated DOM - seems to work
}

function updateStairsInfoCard() {
  stairsInfoFlightsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs;// put in function - daily flight count - updates DOM - might need API
}

function updateStairsFriendCard() {
  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);// place in function -- updates DOM, functioning -- all users
}

function updateStairsCalendarCard() {
  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);//place in function - updates the DOM - working

  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);//place into function - updates DOM
}

function updateStairsTrendingCard() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}//may be appropriate to combine with updateTrendingStepDays

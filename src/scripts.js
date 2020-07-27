import './css/styles.scss';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import DomUpdates from './DomUpdates';

let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stepsTrendingButton = document.querySelector('.steps-trending-button');
let userRepository = new UserRepository();
let user;
let todayDate = "2019/09/22";
// convert todayDate to function so today's date is dynamic, and always current.
let hydrationData = [];
let activityData = [];
let sleepData = [];
let domUpdates = new DomUpdates();

window.onload = getUserData();
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays);
stepsTrendingButton.addEventListener('click', updateTrendingStepDays);
// ⬆ Combine these four into a single click listener ⤴

function createUser() {
  let randomIndex = Math.floor(Math.random() * 50)
  user = userRepository.users[randomIndex];
  user.findFriendsNames(userRepository.users);
}

function getUserData() {
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData")
    .then(response => response.json())
    .then(data => storeUserData(data))
    .then(() => getActivityData())
    .then(() => getHydrationData())
    .then(() => getSleepData())
    .catch(error => console.log(error));
}

function storeUserData(data) {
  data.userData.forEach(user => {
    let newUser = new User(user);
    userRepository.users.push(newUser)
  });
  createUser();
  setTimeout(() => updateFriendsStepDisplay(), 600); // <---------------------This was the fix
}

function getActivityData() {
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData")
    .then(response => response.json())
    .then(data => storeActivityData(data))
    .catch(error => console.log(error));
}

function storeActivityData(data) {
  data.activityData.forEach(activity => {
    activity = new Activity(activity, userRepository);
    activityData.push(activity);
  });
  updateAllStepsCards();
  updateAllStairsCards();
}

function getHydrationData() {
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData")
    .then(response => response.json())
    .then(data => storeHydrationData(data))
    .catch(error => console.log(error));
}

function storeHydrationData(data) {
  data.hydrationData.forEach(hydration => {
    hydration = new Hydration(hydration, userRepository);
    hydrationData.push(hydration);
  });
  updateAllHydrationCards();
}

function getSleepData() {
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData")
    .then(response => response.json())
    .then(data => storeSleepData(data))
    .catch(error => console.log(error))
}

function storeSleepData(data) {
  data.sleepData.forEach(sleep => {
    sleep = new Sleep(sleep, userRepository);
    sleepData.push(sleep);
  });
  updateAllSleepCards();
}

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  let userInfoDropdown = document.querySelector('#user-info-dropdown');
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  let hydrationMainCard = document.querySelector('#hydration-main-card');
  let sleepMainCard = document.querySelector('#sleep-main-card');
  let stepsMainCard = document.querySelector('#steps-main-card');
  let stairsMainCard = document.querySelector('#stairs-main-card');

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
  if (event.target.classList.contains("steps-calendar-button")) {
    let stepsCalendarCard = document.querySelector("#steps-calendar-card");
    flipCard(stepsMainCard, stepsCalendarCard);
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
    let stairsInfoCard = document.querySelector('#stairs-info-card');
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains("stairs-friends-button")) {
    let stairsFriendsCard = document.querySelector("#stairs-friends-card");
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains("stairs-trending-button")) {
    let stairsTrendingCard = document.querySelector("#stairs-trending-card");
    flipCard(stairsMainCard, stairsTrendingCard);
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
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains("sleep-calendar-button")) {
    let sleepCalendarCard = document.querySelector("#sleep-calendar-card");
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

function updateFriendsStepDisplay() {
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

function createFriendsStepList() { // <--------- The problem was HERE (It was all working, we just needed to set a delay)
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

function updateAllHydrationCards() {
  let sortedHydrationDataByDate = sortHydration(); // ~~~This used to live in updateHydrationCalendarCard() but I moved it here because that function is now in DomUpdates.js
  domUpdates.updateHydrationMainCard(hydrationData, user, todayDate);
  domUpdates.updateHydrationInfoCard(hydrationData, user, todayDate)
  domUpdates.updateHydrationFriendCard
  (userRepository.calculateAverageDailyWater(todayDate));
  domUpdates.updateHydrationCalendarCard(user, sortedHydrationDataByDate);
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

function updateAllSleepCards() {
  domUpdates.updateSleepMainCard(sleepData, user, todayDate);
  domUpdates.updateSleepInfoCard(sleepData, user, todayDate);
  domUpdates.updateSleepFriendCard(userRepository, todayDate);
  domUpdates.updateSleepCalendarCard(user, todayDate);
}

function updateAllStepsCards() {
  domUpdates.updateStepsMainCard(activityData, user, todayDate);
  domUpdates.updateStepsInfoCard(activityData, user, todayDate, userRepository);
  domUpdates.updateStepsFriendCard(userRepository, todayDate);
  domUpdates.updateStepsCalendarCard(user, todayDate);
}

function updateTrendingStairsDays() {
  let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

function updateTrendingStepDays() {
  let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

function updateAllStairsCards() {
  domUpdates.updateStairsMainCard(activityData, user, todayDate);
  updateStairsInfoCard();
  updateStairsFriendCard();
  updateStairsCalendarCard();
}

function updateStairsInfoCard() {
  let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
  stairsInfoFlightsToday.innerText = activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
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
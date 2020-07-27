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

}

export default DomUpdates;
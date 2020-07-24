let domStuff = {
  modifyHydrationData(hydrationData, userId) {
    let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
    hydrationUserOuncesToday.innerText = this.findTodaysHydrationData(hydrationData, userId).numOunces;
  },

  findTodaysHydrationData(hydrationData, userId) {
    return hydrationData.find(hydration => {
      return hydration.userID === userId && hydration.date === '07/23/2020';
    })
  }
}

module.exports = domStuff;

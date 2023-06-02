const allShows = [];
const initialValue = 5;
const value = 5;
export const sendShows = (allShows, initialValue) => {
  class Show {
    constructor(id, showname) {
      this.id = id;
      this.showname = showname;
    }
  }

  for (let i = 0; i < initialValue; i++) {
    const showid = i;
    const show = new Show(showid, `showname${showid}`);
    allShows.push(show);
  }
  return allShows;
};

const showCounter = (initialValue) => {
  let value = initialValue;
  sendShows(allShows, value);

  const increment = () => {
    value += initialValue;
    sendShows(allShows, value);
    return value;
  };

  const reset = () => {
    value = initialValue;
    sendShows(allShows, value);
    return value;
  };

  return {
    increment,
    reset,
  };
};

export default showCounter;
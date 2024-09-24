const getRandomMultipleOfFive = () => {
  const multiplesOfFive = [];

  for (let i = 5; i <= 1000; i += 5) {
    multiplesOfFive.push(i);
  }
  const randomIndex = Math.floor(Math.random() * multiplesOfFive.length);
  return multiplesOfFive[randomIndex];
};

export { getRandomMultipleOfFive };

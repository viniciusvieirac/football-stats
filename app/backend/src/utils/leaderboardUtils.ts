import ILeaderBoard from '../Interfaces/ILeaderBoard';

export const getFormmatedLeaderBoard = (home: ILeaderBoard, away: ILeaderBoard) => {
  const formmated: ILeaderBoard = {
    name: home.name,
    goalsBalance: (home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn),
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalLosses: home.totalLosses + away.totalLosses,
    totalDraws: home.totalDraws + away.totalDraws,
    totalVictories: home.totalVictories + away.totalVictories,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    efficiency: '',
  };
  formmated.efficiency = ((formmated.totalPoints / (formmated.totalGames * 3)) * 100).toFixed(2);
  return formmated;
};

export const sortLeaderboard = (leaderboard: ILeaderBoard[])
: ILeaderBoard[] => leaderboard.sort((a, b) => {
  if (b.totalPoints !== a.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (b.totalVictories !== a.totalVictories) {
    return b.totalVictories - a.totalVictories;
  }
  if (b.goalsBalance !== a.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  if (b.goalsFavor !== a.goalsFavor) {
    return b.goalsFavor - a.goalsFavor;
  }
  return a.goalsOwn - b.goalsOwn;
});

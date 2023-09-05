export const homeTeamQuery = `SELECT
T.team_name AS name,
COUNT(T.id) AS totalGames,
CAST(SUM(M.home_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(M.away_team_goals) AS SIGNED) AS goalsOwn,
CAST(SUM(M.home_team_goals - M.away_team_goals) AS SIGNED) AS goalsBalance,
CAST(SUM(CASE WHEN M.home_team_goals > M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalVictories,
CAST(SUM(CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalDraws,
CAST(SUM(CASE WHEN M.home_team_goals < M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalLosses,
(
  CAST(SUM(CASE WHEN M.home_team_goals > M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED) * 3 +
  CAST(SUM(CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED)
) AS totalPoints,
ROUND(
  (
    (
      CAST(SUM(CASE WHEN M.home_team_goals > M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED) * 3 +
      CAST(SUM(CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END) AS SIGNED)
    ) / (COUNT(T.id) * 3) * 100
  ),
  2
) AS efficiency
FROM
teams T
JOIN
matches M ON T.id = M.home_team_id
WHERE
M.in_progress = false
GROUP BY
T.id
ORDER BY
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;
`;

export const awayTeamQuery = `SELECT
T.team_name AS name,
COUNT(T.id) AS totalGames,
CAST(SUM(M.away_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(M.home_team_goals) AS SIGNED) AS goalsOwn,
CAST(SUM(M.away_team_goals - M.home_team_goals) AS SIGNED) AS goalsBalance,
CAST(SUM(CASE WHEN M.away_team_goals > M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalVictories,
CAST(SUM(CASE WHEN M.away_team_goals = M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalDraws,
CAST(SUM(CASE WHEN M.away_team_goals < M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED)
 AS totalLosses,
(
  CAST(SUM(CASE WHEN M.away_team_goals > M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED) * 3 +
  CAST(SUM(CASE WHEN M.away_team_goals = M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED)
) AS totalPoints,
ROUND(
  (
    (
      CAST(SUM(CASE WHEN M.away_team_goals > M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED) * 3 +
      CAST(SUM(CASE WHEN M.away_team_goals = M.home_team_goals THEN 1 ELSE 0 END) AS SIGNED)
    ) / (COUNT(T.id) * 3) * 100
  ),
  2
) AS efficiency
FROM
teams T
JOIN
matches M ON T.id = M.away_team_id
WHERE
M.in_progress = false
GROUP BY
T.id
ORDER BY
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;
`;

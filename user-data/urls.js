const githubUsername = "seima-osako";
const mediumUsername = "seimaosako";

const createMediumURL = (username) => `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
const createGitConnectedURL = (username) => `https://gitconnected.com/v1/portfolio/${username}`;
const createGitHubURL = (username) => `https://api.github.com/users/${username}/repos`;

export const URLs = {
    medium: createMediumURL(mediumUsername),
    gitConnected: createGitConnectedURL(githubUsername),
    gitRepo: createGitHubURL(githubUsername),
};

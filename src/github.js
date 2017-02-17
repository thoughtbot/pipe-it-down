class GitHub {
  constructor({ pathname }) {
    this.pathname = pathname;
  }

  isPullRequest() {
    return !!this.pullRequestPath();
  }

  pullRequestPath() {
    return this.pathname.match(/\/[\w-]+\/[-\w]+\/pull\/\d+/);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = GitHub;
}

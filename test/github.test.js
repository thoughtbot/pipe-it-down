const assert = require("assert");
const GitHub = require("../src/github");

describe("GitHub", () => {
  describe("#isPullRequest", () => {
    context("when the path is a pull request", () => {
      it("is true", () => {
        const github = new GitHub({
          pathname: "/thoughtbot/pipe-it-down/pull/1/files"
        });

        assert(github.isPullRequest());
      });
    });

    context("when the path is not a pull request", () => {
      it("is false", () => {
        const github = new GitHub({
          pathname: "/thoughtbot/pipe-it-down/pulls"
        });

        assert(!github.isPullRequest());
      });
    });
  });

  describe("#pullRequestPath", () => {
    context("when path is a pull request", () => {
      context("and has a trailing slash", () => {
        it("returns the pr path", () => {
          const github = new GitHub({
            pathname: "/thoughtbot/pipe-it-down/pull/1/"
          });

          const pathname = github.pullRequestPath();

          assert.equal(pathname, "/thoughtbot/pipe-it-down/pull/1");
        });
      });

      context("and does not have a trailing slash", () => {
        it("returns the pr path", () => {
          const github = new GitHub({
            pathname: "/thoughtbot/pipe-it-down/pull/1"
          });

          const pathname = github.pullRequestPath();

          assert.equal(pathname, "/thoughtbot/pipe-it-down/pull/1");
        });
      });

      context("and links to a secondary tab", () => {
        it("returns the pr path", () => {
          const github = new GitHub({
            pathname: "/thoughtbot/pipe-it-down/pull/1/files/"
          });

          const pathname = github.pullRequestPath();

          assert.equal(pathname, "/thoughtbot/pipe-it-down/pull/1");
        });
      });
    });

    context("when the path is not a pull request", () => {
      it("returns null", () => {
        const github = new GitHub({
          pathname: "/thoughtbot/pipe-it-down/pulls"
        });

        const pathname = github.pullRequestPath();

        assert.equal(pathname, null);
      });
    });
  });
});

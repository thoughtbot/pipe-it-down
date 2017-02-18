const github = new GitHub({ pathname: window.location.pathname });
const store = new Store(github.pullRequestPath());

function decorateFiles() {
  github.files().forEach(element => {
    const file = new File( {
      $element: $(element),
      store: store
    });
    file.decorate();
  });
}

if (github.isPullRequest()) {
  const observer = new MutationObserver(() => decorateFiles());

  $("[role=main]").forEach(main =>
    observer.observe(main, { childList: true, subtree: true })
  );

  decorateFiles();
}

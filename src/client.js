const tooltip = "Collapse this file";

const link = $("<a />").attr({
  "aria-label": tooltip,
  "class": "btn-octicon tooltipped tooltipped-nw pid-collapse",
  "data-skip-pjax": "",
  "href": "#",
  "rel": "nofollow"
}).html(icons.hide);

const github = new GitHub({ pathname: window.location.pathname });
const store = new Store(github.pullRequestPath());

function decorateFiles() {
  $(".file").forEach(file => decorateFile(file));
}

function decorateFile(file) {
  if ($(file).find(".pid-collapse").length === 0) {
    const fileName = $(file).find(".file-header").data("path");
    const fileContent = $(file).find(".js-file-content");
    const fileLink = link.clone();
    store.getCollapsed(fileName).then(collapsed => {
      if (collapsed) {
        fileLink.html(icons.show);
        fileContent.hide();
      }
    });
    fileLink.click(event => {
      event.preventDefault();
      if (fileContent.css("display") === "none") {
        fileContent.show();
        store.setUncollapsed(fileName);
        fileLink.html(icons.hide);
      } else {
        fileContent.hide();
        store.setCollapsed(fileName);
        fileLink.html(icons.show);
      }
    });
    $(file).find(".file-actions").append(fileLink);
  }
}

if (github.isPullRequest()) {
  const observer = new MutationObserver(() => decorateFiles());

  $("[role=main]").forEach(main =>
    observer.observe(main, { childList: true, subtree: true })
  );

  decorateFiles();
}

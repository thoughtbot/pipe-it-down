var icon = '<svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"> \
  <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path> \
  </svg>';

const tooltip = "Collapse this file";

const link = $("<a />").attr({
  "aria-label": tooltip,
  "class": "btn-octicon tooltipped tooltipped-nw pid-collapse",
  "data-skip-pjax": "",
  "href": "#",
  "rel": "nofollow"
}).html(icon);

const github = new GitHub({ pathname: window.location.pathname });
const store = new Store(github.pullRequestPath());

function decorateFiles() {
  $(".file").forEach(file => decorateFile(file));
}

function decorateFile(file) {
  if ($(file).find(".pid-collapse").length === 0) {
    const fileName = $(file).find(".file-header").data("path");
    const fileContent = $(file).find(".js-file-content");
    store.getCollapsed(fileName).then(collapsed => {
      if (collapsed) {
        fileContent.hide();
      }
    });
    const fileLink = link.clone();
    fileLink.click(event => {
      event.preventDefault();
      if (fileContent.css("display") === "none") {
        fileContent.show();
        store.setUncollapsed(fileName);
      } else {
        fileContent.hide();
        store.setCollapsed(fileName);
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

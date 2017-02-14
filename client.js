var icon = '<svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"> \
  <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path> \
  </svg>';

var tooltip = "Collapse this file";

var link = $("<a />").attr({
  "aria-label": tooltip,
  "class": "btn-octicon tooltipped tooltipped-nw pid-collapse",
  "data-skip-pjax": "",
  "href": "#",
  "rel": "nofollow"
}).html(icon);

function decoratePreLoadedFiles() {
  $(".file").each(function() {
    decorateFile(this);
  });
}

function decorateLazyLoadedFiles() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if ($(node).hasClass("file")) {
          decorateFile(node);
        }
      });
    });
  });

  $(".js-diff-progressive-container").each(function() {
    observer.observe(this, { childList: true });
  });
}

function decorateFile(file) {
  if ($(file).find(".pid-collapse").length === 0) {
    $(file).find(".file-actions").append(link.clone());
  }
}

function decorate() {
  decoratePreLoadedFiles();
  decorateLazyLoadedFiles();
}

function handlePjaxPageLoad() {
  var observer = new MutationObserver(function(mutations) {
    decorate();
  });

  $(".experiment-repo-nav").each(function() {
    observer.observe(this, { childList: true, subtree: true });
  });
}

function pageHasFiles() {
  return $(".js-file-content").length > 0;
}

function setUpClickEvents() {
  $(document).on("click", ".pid-collapse", function(event) {
    event.preventDefault();
    var fileContent = $(this).closest(".file").find(".js-file-content");
    fileContent.hide();
  });
}

handlePjaxPageLoad();
decorate();
setUpClickEvents();

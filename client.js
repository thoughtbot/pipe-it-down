var icon = '<svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"> \
  <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path> \
  </svg>';

var tooltip = "Collapse this file";

var link = $("<a />").attr({
  "aria-label": tooltip,
  "class": "btn-octicon tooltipped tooltipped-nw",
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
  var fileContent = $(file).find(".js-file-content");
  var fileLink = link.clone();
  fileLink.click(function(event) {
    event.preventDefault();
    fileContent.hide();
  });
  $(file).find(".file-actions").append(fileLink);
}

decoratePreLoadedFiles();
decorateLazyLoadedFiles();

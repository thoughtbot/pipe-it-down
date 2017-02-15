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

function decorateFiles() {
  $(".file").each(function() {
    decorateFile(this);
  });
}

function decorateFile(file) {
  if ($(file).find(".pid-collapse").length === 0) {
    var fileContent = $(file).find(".js-file-content");
    var fileLink = link.clone();
    fileLink.click(function(event) {
      event.preventDefault();
      fileContent.toggle();
    });
    $(file).find(".file-actions").append(fileLink);
  }
}

var observer = new MutationObserver(() => decorateFiles());

$("[role=main]").each(function() {
  observer.observe(this, { childList: true, subtree: true });
});

decorateFiles();

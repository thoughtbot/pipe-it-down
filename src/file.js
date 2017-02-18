const collapseTooltip = "Collapse this file";
const expandTooltip = "Expand this file";

const linkTemplate = $("<a />").attr({
  "aria-label": collapseTooltip,
  "class": "btn-octicon tooltipped tooltipped-nw pid-collapse",
  "data-skip-pjax": "",
  "href": "#",
  "rel": "nofollow"
}).html(icons.hide);

class File {
  constructor({ $element, store }) {
    this.$element = $element;
    this.store = store;
    this.toggleLink = linkTemplate.clone();
  }

  decorate() {
    if (!this._isDecorated()) {
      this._hideIfPreviouslyHidden();
      this._registerClickEvent();
      this._insertDomLink();
    }
  }

  _hideIfPreviouslyHidden() {
    store.getCollapsed(this._fileName()).then(collapsed => {
      if (collapsed) {
        this._hide();
      }
    });
  }

  _registerClickEvent() {
    this.toggleLink.click(event => {
      event.preventDefault();

      if (this._isHidden()) {
        this._show();
      } else {
        this._hide();
      }
    });
  }

  _insertDomLink() {
    this.$element.find(".file-actions").append(this.toggleLink);
  }

  _isDecorated() {
    return this.$element.find(".pid-collapse").length > 0;
  }

  _fileName() {
    return this.$element.find(".file-header").data("path");
  }

  _fileContent() {
    return this.$element.find(".js-file-content");
  }

  _isHidden() {
    return this._fileContent().css("display") === "none";
  }

  _hide() {
    this._fileContent().hide();
    this.toggleLink.html(icons.show);
    this.toggleLink.attr("aria-label", expandTooltip);
    this.store.setCollapsed(this._fileName());
  }

  _show() {
    this._fileContent().show();
    this.toggleLink.html(icons.hide);
    this.toggleLink.attr("aria-label", collapseTooltip);
    this.store.setUncollapsed(this._fileName());
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = File
}

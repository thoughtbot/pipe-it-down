class Store {
  constructor(namespace) {
    this.namespace = namespace;
  }

  all() {
    return new Promise(resolve =>
      chrome.storage.local.get(
        this.namespace,
        data => resolve(this._deserialize(data))
      )
    );
  }

  getCollapsed(key) {
    return this._get(key).then(data => !!data);
  }

  setCollapsed(key) {
    return this.all().then(data => {
      data[key] = Date.now();
      this._set(data);
    });
  }

  setUncollapsed(key) {
    return this.all().then(data => {
      delete data[key];
      this._set(data);
    });
  }

  _get(key) {
    return this.all().then(data => data[key]);
  }

  _set(data) {
    chrome.storage.local.set({[this.namespace]: data});
  }

  _deserialize(data) {
    return data[this.namespace] || {};
  }
}

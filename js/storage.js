const Storage = {
  _getKey(name) {
    return APP_CONFIG.STORAGE_PREFIX + name;
  },

  getAll(collection) {
    try {
      const data = localStorage.getItem(this._getKey(collection));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getById(collection, id) {
    const items = this.getAll(collection);
    return items.find(item => item.id === id) || null;
  },

  save(collection, data) {
    localStorage.setItem(this._getKey(collection), JSON.stringify(data));
  },

  add(collection, item) {
    const items = this.getAll(collection);
    item.id = item.id || this.generateId(collection.substring(0, 3));
    item.createdAt = item.createdAt || new Date().toISOString();
    items.push(item);
    this.save(collection, items);
    return item;
  },

  update(collection, id, updates) {
    const items = this.getAll(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    this.save(collection, items);
    return items[index];
  },

  remove(collection, id) {
    const items = this.getAll(collection);
    const filtered = items.filter(item => item.id !== id);
    this.save(collection, filtered);
    return filtered.length < items.length;
  },

  query(collection, filterFn) {
    return this.getAll(collection).filter(filterFn);
  },

  count(collection, filterFn) {
    if (filterFn) return this.query(collection, filterFn).length;
    return this.getAll(collection).length;
  },

  clear(collection) {
    localStorage.removeItem(this._getKey(collection));
  },

  get(key) {
    try {
      const data = localStorage.getItem(this._getKey(key));
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(this._getKey(key), JSON.stringify(value));
  },

  generateId(prefix) {
    const rand = Math.random().toString(36).substring(2, 10);
    return `${prefix}_${Date.now()}_${rand}`;
  }
};

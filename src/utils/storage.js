// Storage layer with multi-user support
const Storage = {
  // Global prefix to isolate user data
  prefix: '',

  setPrefix(newPrefix) {
    this.prefix = newPrefix ? `${newPrefix}:` : '';
  },

  async get(key) {
    const fullKey = this.prefix + key;
    try {
      const r = await window.storage.get(fullKey);
      return r ? JSON.parse(r.value) : null;
    } catch {
      try {
        const v = localStorage.getItem(fullKey);
        return v ? JSON.parse(v) : null;
      } catch { return null; }
    }
  },

  async set(key, val) {
    const fullKey = this.prefix + key;
    try {
      await window.storage.set(fullKey, JSON.stringify(val));
    } catch {
      try { localStorage.setItem(fullKey, JSON.stringify(val)); } catch {}
    }
  },

  async remove(key) {
    const fullKey = this.prefix + key;
    try {
      await window.storage.delete(fullKey);
    } catch {
      try { localStorage.removeItem(fullKey); } catch {}
    }
  }
};

export default Storage;

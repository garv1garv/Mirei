// Storage layer using window.storage for persistence
const Storage = {
  async get(key) {
    try {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : null;
    } catch {
      // Fallback to localStorage
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      } catch { return null; }
    }
  },
  async set(key, val) {
    try {
      await window.storage.set(key, JSON.stringify(val));
    } catch {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }
  },
  async remove(key) {
    try {
      await window.storage.delete(key);
    } catch {
      try { localStorage.removeItem(key); } catch {}
    }
  }
};

export default Storage;

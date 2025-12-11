// public/storage-fix.js
// This script must be loaded BEFORE A-Frame

(function() {
  'use strict';
  
  console.log('Storage fix loaded');
  
  // Create a functional mock storage
  function createMockStorage() {
    var data = {};
    return {
      getItem: function(key) {
        return data[key] || null;
      },
      setItem: function(key, value) {
        data[key] = String(value);
      },
      removeItem: function(key) {
        delete data[key];
      },
      clear: function() {
        data = {};
      },
      key: function(index) {
        var keys = Object.keys(data);
        return keys[index] || null;
      },
      get length() {
        return Object.keys(data).length;
      }
    };
  }

  // Test if storage works
  var storageWorks = false;
  try {
    localStorage.setItem('__storage_test__', '1');
    localStorage.removeItem('__storage_test__');
    storageWorks = true;
  } catch (e) {
    console.log('Storage blocked, applying fix');
  }

  // If storage doesn't work, replace it
  if (!storageWorks) {
    var mockLocal = createMockStorage();
    var mockSession = createMockStorage();

    Object.defineProperty(window, 'localStorage', {
      get: function() { return mockLocal; },
      set: function() {},
      configurable: true
    });

    Object.defineProperty(window, 'sessionStorage', {
      get: function() { return mockSession; },
      set: function() {},
      configurable: true
    });
  }

  // Override Storage prototype methods to catch errors
  if (typeof Storage !== 'undefined') {
    var originalMethods = {
      getItem: Storage.prototype.getItem,
      setItem: Storage.prototype.setItem,
      removeItem: Storage.prototype.removeItem,
      clear: Storage.prototype.clear,
      key: Storage.prototype.key
    };

    Storage.prototype.getItem = function(key) {
      try {
        return originalMethods.getItem.call(this, key);
      } catch (e) {
        return null;
      }
    };

    Storage.prototype.setItem = function(key, value) {
      try {
        return originalMethods.setItem.call(this, key, value);
      } catch (e) {
        // Fail silently
      }
    };

    Storage.prototype.removeItem = function(key) {
      try {
        return originalMethods.removeItem.call(this, key);
      } catch (e) {
        // Fail silently
      }
    };

    Storage.prototype.clear = function() {
      try {
        return originalMethods.clear.call(this);
      } catch (e) {
        // Fail silently
      }
    };

    Storage.prototype.key = function(index) {
      try {
        return originalMethods.key.call(this, index);
      } catch (e) {
        return null;
      }
    };
  }

  console.log('Storage fix applied successfully');
})();
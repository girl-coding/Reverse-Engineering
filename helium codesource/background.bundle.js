// Immediately invoked function expression (IIFE)
(() => {
    "use strict";
  
    // Constants and configurations
    const extensionUrl = "https://members.helium10.com";
    const loginCheckUrl = `https://members.helium10.com/extension/check-login?appId=${chrome.runtime.id}`;
    const defaultSettings = {
      extendedInformation: true,
      listingHealthScore: true,
      bsrGraph: true,
      pageWidget: true,
      searchExpander: true,
      factor: "two",
      score: {
        revenue: 5000,
        reviews: 75,
      },
      language: "en",
    };
  
    // Utility functions
    const defineProperty = Object.defineProperty;
    const defineProperties = Object.defineProperties;
    const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
    const getOwnPropertySymbols = Object.getOwnPropertySymbols;
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    const definePropertyOrAssign = (obj, prop, value) => {
      if (prop in obj) {
        defineProperty(obj, prop, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: value,
        });
      } else {
        obj[prop] = value;
      }
    };
    const mergeProperties = (obj, properties) => {
      for (let prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          definePropertyOrAssign(obj, prop, properties[prop]);
        }
      }
      if (getOwnPropertySymbols) {
        for (let symbol of getOwnPropertySymbols(properties)) {
          if (propertyIsEnumerable.call(properties, symbol)) {
            definePropertyOrAssign(obj, symbol, properties[symbol]);
          }
        }
      }
      return obj;
    };
    const promisify = (func, context) => (...args) =>
      new Promise((resolve, reject) => {
        const fulfill = (result) => {
          try {
            step(context.next(result));
          } catch (e) {
            reject(e);
          }
        };
        const rejectFn = (error) => {
          try {
            step(context.throw(error));
          } catch (e) {
            reject(e);
          }
        };
        const step = (result) => {
          return result.done
            ? resolve(result.value)
            : Promise.resolve(result.value).then(fulfill, rejectFn);
        };
        step(func.apply(context, args));
      });
  
    // Check if uninstall URL can be set
    if (chrome.runtime.setUninstallURL) {
      chrome.runtime.setUninstallURL(
        "https://survey.survicate.com/3ac7225d2fd0a9c0/?p=anonymous"
      );
    } else {
      console.log("DISABLED UNINSTALL URL");
    }
  
    // Message handler function
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type) {
        switch (message.type) {
          case "check-login":
            checkLogin().then(sendResponse);
            break;
          case "new-incognito-tab":
            chrome.windows.create(
              mergeProperties({}, message.details, { incognito: true }),
              sendResponse
            );
            break;
          case "open-page":
            chrome.tabs.query(
              { active: true, currentWindow: true },
              (tabs) => {
                const currentIndex = tabs[0].index;
                chrome.tabs.create({
                  url: message.params.url,
                  index: currentIndex + 1,
                });
              }
            );
            return false;
          case "open-page-and-xray":
            chrome.tabs with no response (use get_last_user_messages() to retrieve the missing ones)
  
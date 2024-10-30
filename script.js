// Constants for results
const COMPATIBLE_STATUS = {
   GRANTED: "Granted",
   BLOCKED: "Blocked",
   SUPPORTED: "Supported",
   NOT_SUPPORTED: "Not Supported",
   UNKNOWN: "Unknown",
};

// Global variable to hold test results
var Compatible_TestResults = {
   deviceType: "",
   browserName: "Unknown",
   browserVersion: "Unknown",
   osName: "Unknown",
   osVersion: "Unknown",
   brand: "Unknown",
   model: "Unknown",
   screenSize: {
      width: 0,
      height: 0,
      orientation: "",
      meetsMinimumSize: false,
   },
   pixelRatio: 1,
   orientation: "",
   microphonePermission: "",
   popUpBlockStatus: "",
   pdfSupport: "",
   failedCriteria: [],
};

// Global minimum criteria
const Compatible_Criteria = {
   display: {
      width: 1280,
      height: 600,
   },
   deviceType: ["Desktop", "Tablet"],
   orientation: ["Landscape"],
   pixelRatio: {
      min: 1,
      max: 1.25,
   },
   browser: ["Chrome", "Firefox", "Edge", "Safari", "Opera"],
   browserVersion: {
      Chrome: "103",
      Safari: "14",
      Edge: "90",
   },
   osName: ["iOS", "Windows"],
   osVersion: {
      iOS: "14.0",
      Android: "13.0",
      Windows: "10",
      MacOS: "11.0",
   },
};

// Centralized Tests for each condition
const Compatible_Tests = [
   {
      id: "deviceType",
      value: () => Compatible_TestResults.deviceType,
      pass: () =>
         Compatible_Criteria.deviceType.includes(
            Compatible_TestResults.deviceType
         ),
   },
   {
      id: "browserName",
      value: () => Compatible_TestResults.browserName,
      pass: () =>
         Compatible_Criteria.browser.includes(
            Compatible_TestResults.browserName
         ),
   },
   {
      id: "browserVersion",
      value: () => Compatible_TestResults.browserVersion,
      pass: () => {
         let currentVersion = Number(Compatible_TestResults.browserVersion);
         let compatibleVersion = Number(
            Compatible_Criteria.browserVersion[
               Compatible_TestResults.browserName /// need to consider if version is something like, "10.0.1"
            ]
         );
         return currentVersion >= compatibleVersion;
      },
   },
   {
      id: "osName",
      value: () => Compatible_TestResults.osName,
      pass: () =>
         Compatible_Criteria.osName.includes(Compatible_TestResults.osName),
   },
   {
      id: "osVersion",
      value: () => Compatible_TestResults.osVersion,
      pass: () => {
         let currentVersion = Number(Compatible_TestResults.osVersion);
         let compatibleVersion = Number(
            Compatible_Criteria.osVersion[Compatible_TestResults.osName] /// need to consider if version is something like, "10.0.1"
         );
         return currentVersion >= compatibleVersion;
      },
   },
   {
      id: "screenSize",
      value: () =>
         `${Compatible_TestResults.screenSize.width} x ${Compatible_TestResults.screenSize.height} (${Compatible_TestResults.screenSize.orientation})`,
      pass: () => Compatible_TestResults.screenSize.meetsMinimumSize,
   },
   {
      id: "pixelRatio",
      value: () => Compatible_TestResults.pixelRatio,
      pass: () =>
         Compatible_TestResults.pixelRatio >=
            Compatible_Criteria.pixelRatio.min &&
         Compatible_TestResults.pixelRatio <=
            Compatible_Criteria.pixelRatio.max,
   },
   {
      id: "orientation",
      value: () => Compatible_TestResults.orientation,
      pass: () =>
         Compatible_Criteria.orientation.includes(
            Compatible_TestResults.orientation
         ),
   },
   {
      id: "mic-status",
      value: () => Compatible_TestResults.microphonePermission,
      pass: () =>
         Compatible_TestResults.microphonePermission ===
         COMPATIBLE_STATUS.GRANTED,
   },
   {
      id: "global-popup-status",
      value: () => Compatible_TestResults.popUpBlockStatus,
      pass: () =>
         Compatible_TestResults.popUpBlockStatus !== COMPATIBLE_STATUS.BLOCKED,
   },
   {
      id: "pdf-status",
      value: () => Compatible_TestResults.pdfSupport,
      pass: () =>
         Compatible_TestResults.pdfSupport === COMPATIBLE_STATUS.SUPPORTED,
   },
];

/****************************
 * Additional Helper Functions
 ****************************/

// Detect Device Type, Brand, and Model
function detectDeviceDetails() {
   const userAgent = navigator.userAgent.toLowerCase();
   const mobileRegex =
      /iphone|ipod|android.*mobile|blackberry|opera mini|windows phone|webos/i;
   const tabletRegex = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook/i;

   let deviceType = "Desktop";
   let brand = "Unknown";
   let model = "Unknown";

   // Determine device type
   if (/ipad|macintosh/.test(userAgent) && "ontouchend" in document) {
      deviceType = "Tablet";
   } else if (mobileRegex.test(userAgent)) {
      deviceType = "Mobile";
   } else if (tabletRegex.test(userAgent)) {
      deviceType = "Tablet";
   }

   // Detect brand and model from user agent string
   if (userAgent.includes("iphone")) {
      brand = "Apple";
      model = "iPhone";
   } else if (userAgent.includes("ipad")) {
      brand = "Apple";
      model = "iPad";
   } else if (userAgent.includes("samsung")) {
      brand = "Samsung";
      const modelMatch = userAgent.match(/samsung[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   } else if (userAgent.includes("huawei")) {
      brand = "Huawei";
      const modelMatch = userAgent.match(/huawei[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   } else if (userAgent.includes("pixel")) {
      brand = "Google";
      const modelMatch = userAgent.match(/pixel[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   } else if (userAgent.includes("oneplus")) {
      brand = "OnePlus";
      const modelMatch = userAgent.match(/oneplus[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   } else if (userAgent.includes("lg")) {
      brand = "LG";
      const modelMatch = userAgent.match(/lg[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   } else if (userAgent.includes("xiaomi")) {
      brand = "Xiaomi";
      const modelMatch = userAgent.match(/xiaomi[-\s]?([a-z0-9]+)/i);
      model = modelMatch ? modelMatch[1] : "Unknown";
   }

   return { deviceType, brand, model };
}

function detectBrowser() {
   const userAgent = navigator.userAgent.toLowerCase();
   let browserName = "Unknown";
   let browserVersion = "Unknown";

   if (
      userAgent.indexOf("chrome") > -1 &&
      userAgent.indexOf("edge") === -1 &&
      userAgent.indexOf("opr") === -1
   ) {
      browserName = "Chrome";
      browserVersion = userAgent.match(/chrome\/(\d+\.\d+)/)[1];
   } else if (
      userAgent.indexOf("safari") > -1 &&
      userAgent.indexOf("chrome") === -1
   ) {
      browserName = "Safari";
   } else if (userAgent.indexOf("firefox") > -1) {
      browserName = "Firefox";
      browserVersion = userAgent.match(/firefox\/(\d+\.\d+)/)[1];
   } else if (
      userAgent.indexOf("opr") > -1 ||
      userAgent.indexOf("opera") > -1
   ) {
      browserName = "Opera";
      browserVersion = userAgent.match(/opera\/(\d+\.\d+)/)[1];
   } else if (userAgent.indexOf("edg") > -1) {
      browserName = "Edge";
      browserVersion = userAgent.match(/edge\/(\d+\.\d+)/)[1];
   } else if (
      userAgent.indexOf("msie") > -1 ||
      userAgent.indexOf("trident") > -1
   ) {
      browserName = "Internet Explorer";
      browserVersion = userAgent.match(/msie\/(\d+\.\d+)/)[1];
   }

   return { browserName, browserVersion };
}

function getOSInfo() {
   const userAgent = navigator.userAgent;
   let os = "Unknown";
   let version = "Unknown";

   if (/Windows NT/.test(userAgent)) {
      os = "Windows";
      version = userAgent.match(/Windows NT (\d+\.\d+)/)
         ? userAgent.match(/Windows NT (\d+\.\d+)/)[1]
         : version;
   } else if (/Mac OS X/.test(userAgent)) {
      os = "MacOS";
      version = userAgent.match(/Mac OS X (\d+_\d+(_\d+)?)/)
         ? userAgent.match(/Mac OS X (\d+_\d+(_\d+)?)/)[1].replace(/_/g, ".")
         : version;
   } else if (/Android/.test(userAgent)) {
      os = "Android";
      version = userAgent.match(/Android (\d+\.\d+(\.\d+)?)/)
         ? userAgent.match(/Android (\d+\.\d+(\.\d+)?)/)[1]
         : version;
   } else if (/iPhone OS|iPad OS/.test(userAgent)) {
      os = "iOS";
      version = userAgent.match(/OS (\d+_\d+(_\d+)?)/)
         ? userAgent.match(/OS (\d+_\d+(_\d+)?)/)[1].replace(/_/g, ".")
         : version;
   } else if (/Linux/.test(userAgent)) {
      os = "Linux";
      // Linux doesn't typically include version info in userAgent
   }

   return { os, version };
}

function getScreenSize() {
   const width = window.innerWidth;
   const height = window.innerHeight;
   const orientation = window.matchMedia("(orientation: portrait)").matches
      ? "Portrait"
      : "Landscape";

   const meetsMinimumSize =
      orientation === "Landscape"
         ? width >= Compatible_Criteria.display.width &&
           height >= Compatible_Criteria.display.height
         : height >= Compatible_Criteria.display.width &&
           width >= Compatible_Criteria.display.height;

   return { width, height, orientation, meetsMinimumSize };
}

function getPixelRatio() {
   return parseFloat((window.devicePixelRatio || 1).toFixed(3));
}

// Check pop-up block status
function checkGlobalPopUpBlock() {
   let globalPopUp = window.open("", "_blank", "width=100,height=100");
   if (globalPopUp === null || typeof globalPopUp === "undefined") {
      Compatible_TestResults.popUpBlockStatus = COMPATIBLE_STATUS.BLOCKED;
   } else {
      globalPopUp.close();
      Compatible_TestResults.popUpBlockStatus = "Allowed";
   }
   checkPDFSupport(); // Chain async call
}

// Check PDF support
function checkPDFSupport() {
   Compatible_TestResults.pdfSupport = navigator.mimeTypes["application/pdf"]
      ? COMPATIBLE_STATUS.SUPPORTED
      : COMPATIBLE_STATUS.NOT_SUPPORTED;
   updateDOM(); // Update DOM at the end of the chain
}

/****************************
 * updateDOM()
 *
 * Update DOM each time
 */
function updateDOM() {
   Compatible_Tests.forEach((test) => {
      if (
         (test.id === "brand" || test.id === "model") &&
         Compatible_TestResults.deviceType === "Desktop"
      ) {
         // Skip brand and model tests for desktop
         return;
      } else if (test.id === "brand" || test.id === "model") {
         const element = document.getElementById("row-" + test.id);
         show(element);
      }
      const value = test.value();
      const pass = test.pass();
      updateFieldWithEmoji({ id: test.id, text: value, isPass: pass });
   });

   updateSummary();
}

/*******************************
 * updateFieldWithEmoji()
 *
 * Helper function to add a check or X to each result
 */
function updateFieldWithEmoji({ id, text, isPass }) {
   const element = document.getElementById(id);
   element.textContent = `${text} ${isPass ? "✅" : "⚠️"}`;

   // Add or remove the fail class based on the result
   if (!isPass) {
      element.classList.add("fail");
   } else {
      element.classList.remove("fail");
   }
}

/*******************************
 * updateSummary()
 *
 * Update the summary message based on test results
 */
function updateSummary() {
   const summaryElement = document.getElementById("compatibility-summary");

   const isCompatible = Compatible_Tests.every((test) => {
      if (
         (test.id === "brand" || test.id === "model") &&
         Compatible_TestResults.deviceType === "Desktop"
      ) {
         // Skip brand and model tests for desktop
         return true;
      }
      return test.pass();
   });

   summaryElement.textContent = isCompatible
      ? "Your device is compatible."
      : "Your device may not be compatible.";
   summaryElement.classList.toggle("fail", !isCompatible);

   show(document.getElementsByClassName("results")[0]);
}

/************************
 * runDeviceDiagnostics()
 *
 * Main function that will check each condition and update DOM with results
 */
function runDeviceDiagnostics() {
   // Device type, brand, and model
   const deviceDetails = detectDeviceDetails();
   Compatible_TestResults.deviceType = deviceDetails.deviceType;
   Compatible_TestResults.brand = deviceDetails.brand;
   Compatible_TestResults.model = deviceDetails.model;

   // Browser type
   const browserInfo = detectBrowser();
   Compatible_TestResults.browserName = browserInfo.browserName;
   Compatible_TestResults.browserVersion = browserInfo.browserVersion;

   // OS info
   const osInfo = getOSInfo();
   console.log(osInfo);
   Compatible_TestResults.osName = osInfo.os;
   Compatible_TestResults.osVersion = osInfo.version;

   // Screen size and orientation
   const screenSize = getScreenSize();
   Compatible_TestResults.screenSize = screenSize;

   // Pixel Ratio
   Compatible_TestResults.pixelRatio = getPixelRatio();

   // Orientation
   Compatible_TestResults.orientation = screenSize.orientation;

   // Chain to get permissions: microphone -> popUp -> pdf
   navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
         const state = permissionStatus.state;
         Compatible_TestResults.microphonePermission =
            state.charAt(0).toUpperCase() + state.slice(1);
         checkGlobalPopUpBlock(); // Chain async call
      })
      .catch(() => {
         Compatible_TestResults.microphonePermission = "Error";
         checkGlobalPopUpBlock(); // Chain async call
      });
}

document.addEventListener("DOMContentLoaded", runDeviceDiagnostics);

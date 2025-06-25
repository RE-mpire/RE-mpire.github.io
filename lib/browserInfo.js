// Get Browser and OS information
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let version = "";

  if (/Edg\/([\d.]+)/.test(ua)) {
    browser = "Microsoft Edge";
    version = ua.match(/Edg\/([\d.]+)/)[1];
  } else if (/OPR\/([\d.]+)/.test(ua)) {
    browser = "Opera";
    version = ua.match(/OPR\/([\d.]+)/)[1];
  } else if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = "Chrome";
    version = ua.match(/Chrome\/([\d.]+)/)[1];
  } else if (/Safari\/([\d.]+)/.test(ua) && /Version\/([\d.]+)/.test(ua)) {
    browser = "Safari";
    version = ua.match(/Version\/([\d.]+)/)[1];
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = "Firefox";
    version = ua.match(/Firefox\/([\d.]+)/)[1];
  } else if (/MSIE\s([\d.]+)/.test(ua)) {
    browser = "Internet Explorer";
    version = ua.match(/MSIE\s([\d.]+)/)[1];
  } else if (/Trident.*rv:([\d.]+)/.test(ua)) {
    browser = "Internet Explorer";
    version = ua.match(/Trident.*rv:([\d.]+)/)[1];
  }

  let os = "Unknown OS";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac/i.test(ua)) os = "MacOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/X11/i.test(ua)) os = "UNIX";

  const infoDiv = document.querySelector('.browser-info');
  if (infoDiv) {
    infoDiv.innerHTML =
      `Browser name: ${browser}<br>` +
      `Full version: ${version}<br>` +
      `appName: ${navigator.appName}<br>` +
      `userAgent: ${navigator.userAgent}<br>` +
      `OS: ${os}`;
  }
}

getBrowserInfo();
const SUCCESS_COLOR = "#00ff0059";
const FAILURE_COLOR = "#ff000059";

// Pipeline providers (extensible)
const PIPELINE_PROVIDERS = [
  {
    name: "Azure DevOps",
    successRegex: /\[build succeeded\]|\[pr build succeeded\]/i,
    failureRegex: /\[build failed\]|\[pr build failed\]/i,
  },
  {
    name: "Bitbucket",
    successRegex: /pipeline #\d+ (succeeded|passed)|\[bitbucket\]\s*pipeline for .* (succeeded|passed)/i,
    failureRegex: /pipeline #\d+ (failed|error|failing)|\[bitbucket\]\s*pipeline for .* failed/i,
  }
  // Add more pipeline providers here
];

// Mail providers (extensible)
const MAIL_PROVIDERS = [
  {
    name: "Outlook",
    selector: "span[title='']"
  },
  {
    name: "GmailBody",
    selector: "div[role='listitem'], div.a3s, .ii.gt, .a3s.aiL"
  },
  {
    name: "GmailInbox",
    selector: "tr.zA"
  }
  // Add more mail providers here
];


function getHighlightType(text, provider) {
  if (provider.successRegex?.test(text)) return "success";
  if (provider.failureRegex?.test(text)) return "failure";
  return null;
}


function highlightEmails() {
  // Collect all elements from all mail providers
  const elements = MAIL_PROVIDERS.flatMap(provider => Array.from(document.querySelectorAll(provider.selector)));

  elements.forEach((el) => {
    let text = el.textContent ? el.textContent.toLowerCase() : "";
    PIPELINE_PROVIDERS.forEach(provider => {
      const type = getHighlightType(text, provider);
      if (type === "success") {
        el.style.backgroundColor = SUCCESS_COLOR;
      } else if (type === "failure") {
        el.style.backgroundColor = FAILURE_COLOR;
      }
    });
  });
}

// Run the function on initial page load
highlightEmails();

// Listen for changes in the DOM (e.g., when new elements are loaded)
const observer = new MutationObserver(() => {
  highlightEmails();
});

observer.observe(document.body, { subtree: true, childList: true });
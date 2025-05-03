const successColor = "#00ff0059";
const failureColor = "#ff000059";

const PR_SUCCESS_MESSAGE = "[pr build succeeded]";
const PR_FAILURE_MESSAGE = "[pr build failed]";
const SUCCESS_MESSAGE = "[build succeeded]";
const FAILURE_MESSAGE = "[build failed]";

function highlightEmails() {
  const spans = document.querySelectorAll("span[title='']");

  spans.forEach((span) => {
    const spanText = span.textContent.toLowerCase();
		console.log(spanText);

    if (spanText.includes(SUCCESS_MESSAGE) || spanText.includes(PR_SUCCESS_MESSAGE)) {
      span.style.backgroundColor = successColor;
    }

		if (spanText.includes(FAILURE_MESSAGE) || spanText.includes(PR_FAILURE_MESSAGE)) {
      span.style.backgroundColor = failureColor;
    }
  });
}

// Run the function on initial page load
highlightEmails();

// Listen for changes in the DOM (e.g., when new elements are loaded)
const observer = new MutationObserver(() => {
  highlightEmails();
});

observer.observe(document.body, { subtree: true, childList: true });

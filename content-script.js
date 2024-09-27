// Listen for context menu events
document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
        // Get the image URL
        const imgUrl = event.target.src;

        // Create a MutationObserver to detect when the context menu is closed
        const observer = new MutationObserver(() => {
            // Get the page URL
            const pageUrl = window.location.href;

            // Copy the page URL to the clipboard
            navigator.clipboard.writeText(pageUrl)
                .then(() => console.log("Page URL copied to clipboard"))
                .catch(err => console.error("Failed to copy page URL:", err));

            // Disconnect the observer after copying the URL
            observer.disconnect();
        });

        // Start observing the body for changes
        observer.observe(document.body, { childList: true, subtree: true });

        // Use the built-in Copy Image feature
        // To trigger it, we simulate the 'Y' keypress after the context menu opens
        setTimeout(() => {
            const copyImageEvent = new KeyboardEvent('keydown', {
                key: 'y',
                code: 'KeyY',
                charCode: 89,
                keyCode: 89,
                which: 89,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(copyImageEvent);
        }, 100);
    }
});

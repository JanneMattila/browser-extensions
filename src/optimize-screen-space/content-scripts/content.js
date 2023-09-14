const style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.body.appendChild(style);

const enableOptimization = (flag) => {
    if (flag) {
        style.sheet.insertRule("#shellHeader { display: none }");
        style.sheet.insertRule("header.appBar { display: none }");
        style.sheet.insertRule("#shellHeader.showShellHeader~.contentViewPort { top: 0px !important; height: 100vh !important; }");
        style.sheet.insertRule("#shellHeader.showShellHeader~.contentViewPort .canvasFocus { height: 100vh }");
        style.sheet.insertRule("#shellHeader.showShellHeader~.contentViewPort .drawingCanvas { height: 100vh !important; }");
    }
    else {
        while (style.sheet.cssRules.length > 0) {
            style.sheet.deleteRule(0);
        }
    }
};

const processPage = () => {
    if (document.location.pathname == "/") {
        enableOptimization(false);
        return;
    }

    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (key === "activateOptimize") {
                enableOptimization(newValue);
            }
        }
    });

    chrome.storage.local.get(["activateOptimize"]).then((result) => {
        if (result.activateOptimize) {
            enableOptimization(true);
        }
    });
}

processPage();

// Monitoring URL changes:
// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;

            processPage();
        }
    });
    observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
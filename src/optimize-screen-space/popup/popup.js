const activateOptimizeButton = document.getElementById("activateOptimize");
const deactivateOptimizeButton = document.getElementById("deactivateOptimize");

const activateOptimize = async (flag) => {
    await chrome.storage.local.set({ activateOptimize: flag });
};

activateOptimizeButton.onclick = async () => {
    activateOptimizeButton.style.display = "none";
    deactivateOptimizeButton.style.display = "";

    await activateOptimize(true);
};

deactivateOptimizeButton.onclick = async () => {
    activateOptimizeButton.style.display = "";
    deactivateOptimizeButton.style.display = "none";

    await activateOptimize(false);
};

chrome.storage.local.get(["activateOptimize"]).then((result) => {
    console.log(`Optimization: ${result.activateOptimize}`);

    if (result.activateOptimize) {
        activateOptimizeButton.style.display = "none";
        deactivateOptimizeButton.style.display = "";
    }
});

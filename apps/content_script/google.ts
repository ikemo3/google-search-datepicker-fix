export function ymdToMdy(dateStr: string): string {
    const firstSlash = dateStr.indexOf("/");
    const firstHyphen = dateStr.indexOf("-");
    if (firstSlash !== 4 && firstHyphen !== 4) {
        // already MM/DD/YYYY
        return dateStr;
    }

    // YYYY/MM/DD or YYYY-MM-DD to MM/DD/YYYY
    const nums = dateStr.split(/[/-]/);
    if (nums.length !== 3) {
        return dateStr;
    }

    const year = nums[0];
    const month = nums[1];
    const date = nums[2];
    return `${month}/${date}/${year}`;
}

function rewriteDate(_ev: Event): void {
    const cdrMin = document.getElementById("OouJcb") as HTMLInputElement;
    const cdrMax = document.getElementById("rzG2be") as HTMLInputElement;
    if (cdrMin === null || cdrMax === null) {
        return;
    }

    cdrMin.value = ymdToMdy(cdrMin.value);
    cdrMax.value = ymdToMdy(cdrMax.value);
}

function onKeyDown(ev: Event): void {
    switch ((ev as KeyboardEvent).key) {
        case "Enter":
            rewriteDate(ev);
            break;
        default:
            break;
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
                const selectButton = node.querySelector(".Ru1Ao");
                if (selectButton !== null) {
                    selectButton.addEventListener("click", rewriteDate);
                }

                const cdrMin = node.querySelector("#OouJcb");
                if (cdrMin !== null) {
                    cdrMin.addEventListener("keydown", onKeyDown);
                }

                const cdrMax = node.querySelector("#rzG2be");
                if (cdrMax !== null) {
                    cdrMax.addEventListener("keydown", onKeyDown);
                }
            }
        });
    });
});

const config = { childList: true, subtree: true };
observer.observe(document.documentElement!, config);

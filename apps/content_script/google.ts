const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                const selectButton = node.querySelector(".cdr_go");
                if (selectButton !== null) {
                    selectButton.addEventListener("click", rewriteDate);
                }
            }
        }
    });
});

function ymdToMdy(dateStr: string) {
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

function rewriteDate(ev: Event) {
    const cdrMin = document.getElementById("cdr_min") as HTMLInputElement;
    const cdrMax = document.getElementById("cdr_max") as HTMLInputElement;
    if (cdrMin === null || cdrMax === null) {
        return;
    }

    cdrMin.value = ymdToMdy(cdrMin.value);
    cdrMax.value = ymdToMdy(cdrMax.value);
}

const config = {childList: true, subtree: true};
observer.observe(document.documentElement!, config);

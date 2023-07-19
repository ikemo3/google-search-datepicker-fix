import { rewriteDate } from "./dates";

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

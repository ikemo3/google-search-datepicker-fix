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

export function rewriteDate(_ev: Event): void {
  const cdrMin = document.getElementById("OouJcb") as HTMLInputElement;
  const cdrMax = document.getElementById("rzG2be") as HTMLInputElement;
  if (cdrMin === null || cdrMax === null) {
    return;
  }

  cdrMin.value = ymdToMdy(cdrMin.value);
  cdrMax.value = ymdToMdy(cdrMax.value);
}

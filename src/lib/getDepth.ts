export const getDepth = (obj: any) => {
  let depth = 0;

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      const subDepth = getDepth(obj[key]);
      depth = Math.max(depth, subDepth + 1);
    }
  }

  return depth;
};

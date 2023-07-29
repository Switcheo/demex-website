let init = false;
const ESKIMI_ID = process.env.ESKIMI_ID;

const initEskimi = () => {
  if (init || !ESKIMI_ID) return;
  const eskimi = (window as any).esk;
  if (typeof eskimi === "function") {
    init = true;
    eskimi("init", ESKIMI_ID);
  } else {
    setTimeout(initEskimi, 1000);
  }
};

initEskimi();

export const eskimi = (...args: any[]) => {
  (window as any).esk?.(...args);
};

export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = SECONDS_PER_MINUTE*60;
export const SECONDS_PER_DAY = SECONDS_PER_HOUR*24;
export const SECONDS_PER_YEAR = 31536000;

export interface FuncArgs {
  [key: string]: any;
}

// eslint-disable-next-line no-unused-vars
export const debounce = (func: (args: FuncArgs) => void, wait: number, args: FuncArgs) => {
  let timeout: any;

  return function executedFunction() {
    var later = function() {
      timeout = null;
    };
    var callNow = !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func(args);
  };
};

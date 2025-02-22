export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout;

  const executedFunction = (...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  executedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return executedFunction;
}

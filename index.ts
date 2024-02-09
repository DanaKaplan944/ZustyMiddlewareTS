type Setter<T> = (newValue: T) => void;
type Getter<T> = () => T;

interface Store {
  [key: string]: any;
}

interface Middleware {
  (set: Setter<any>, get: Getter<any>): Store;
}

export default function zustyMiddleware(
  createFunction: Middleware
): Middleware {
  return (set, get) => {
    const store = createFunction(set, get);

    const applicationStore: Store = {};
    for (const key in store) {
      applicationStore[key] = String(store[key]);
    }

    for (let key in store) {
      if (typeof store[key] === 'function') {
        let originalFunction = store[key];
        store[key] = (...args: any[]) => {
          const prevState = get();
          const startTime = performance.now();
          originalFunction(...args);
          const endTime = performance.now();
          const nextState = get();

          const actionCompleteTime = endTime - startTime;

          window.postMessage({
            body: 'actionAndStateSnapshot',
            action: key,
            actionCompleteTime,
            prevState: JSON.stringify(prevState),
            nextState: JSON.stringify(nextState),
            store: JSON.stringify(applicationStore),
          });
        };
      }
    }
    return store;
  };
}

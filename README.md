# Zusty

ZustyMiddlewareTS is a middleware designed for Zusty, a Zustand Dev Tool, to facilitate the debugging of state management in your TypeScript applications.

## Installation

Use the package manager to install zustymiddleware.

```bash
npm i zustymiddlewarets
```

## Usage

1. Import zustymiddlewarets at the top of your file
2. Wrap your store in the middleware
3. Before you export your store, add window.store = < your store name>

```javascript
import { create } from 'zustand';
import zustymiddlewarets from 'zustymiddlewarets';

interface BearState {
  bears: number;
  increase: (by: number) => void;
  removeAllBears: () => void;
}

const useStore = create<BearState>(
  zustymiddlewarets((set) => ({
    bears: 0,
    increase: () => set((state: BearState) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))
);

declare global {
  interface Window {
    store: typeof useStore;
  }
}

window.store = useStore;
export default useStore;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

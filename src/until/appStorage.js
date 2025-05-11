import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// Example store: you can expand this as needed
const useAppStore = create(
  immer((set) => ({
    // Example state
    count: 0,
    // Example action using Immer
    increment: () => set((state) => { state.count += 1 }),
    decrement: () => set((state) => { state.count -= 1 }),
    setCount: (value) => set((state) => { state.count = value }),
  }))
)

export default useAppStore

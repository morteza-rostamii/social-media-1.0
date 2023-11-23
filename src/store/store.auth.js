import {create} from 'zustand'

const useAuthStore = create((set, get) => ({
  authUser: null,

  setAuth: (newUser) => set((state) => ({...state, authUser: newUser})),
}));

// subscribe
useAuthStore.subscribe((state) => console.log(state));

export default useAuthStore
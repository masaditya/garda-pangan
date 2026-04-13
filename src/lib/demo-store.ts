import { Store } from '@tanstack/store'

type DemoStoreState = {
  firstName: string
  lastName: string
}

export const store = new Store<DemoStoreState>({
  firstName: 'Garda',
  lastName: 'Pangan',
})

export const fullName = {
  get state() {
    const { firstName, lastName } = store.state
    return `${firstName} ${lastName}`.trim()
  },
  subscribe(listener: (value: string) => void) {
    return store.subscribe(() => {
      listener(this.state)
    })
  },
}

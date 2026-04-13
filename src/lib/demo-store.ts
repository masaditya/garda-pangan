import { Store } from '@tanstack/store'

type DemoStoreState = {
  firstName: string
  lastName: string
}

export const store = new Store<DemoStoreState>({
  firstName: 'Garda',
  lastName: 'Pangan',
})

export const fullName = new Store(
  `${store.state.firstName} ${store.state.lastName}`,
)

store.subscribe((state) => {
  fullName.setState(() => `${state.firstName} ${state.lastName}`)
})

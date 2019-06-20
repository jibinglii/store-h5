export const toggle = state => {
  return (state.toggled = !state.toggled)
}

export const storeInfo = (state, storeInfo) => {
  state.store = storeInfo
}
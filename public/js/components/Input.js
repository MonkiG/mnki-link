export default class InputElement extends HTMLElement {
  type
  name
  label

  constructor() {
    super()
    const name = this.getAttribute('name')
    const label = this.getAttribute('label')
    if (!name) throw new Error('You should provide a name')
    if (!label) throw new Error('You should provide a label name')

    this.type = this.getAttribute('type') || 'text'
    this.name = name
    this.label = label
  }

  connectedCallback() {
    this.#render()
  }

  #render() {
    this.innerHTML = /*html*/ `
      <label for="${this.name}">${this.label}</label>
      <input type="${this.type}" name="${this.name}">
    `
  }
}

customElements.define('input-element', InputElement)

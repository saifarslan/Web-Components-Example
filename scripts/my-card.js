// HTML Custom Web Component Created
class MyCard extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 'Hello World';
    }
}

window.customElements.define('my-card', MyCard); 
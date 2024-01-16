/*
const movies = [
    {movietitle: 'The Dark Knight', dscpt: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham'+ 
    'Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'},

    {movietitle: 'Die Hard', dscpt: 'A New York City police officer tries to save his estranged wife '+ 
    'and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.'},

    {movietitle: 'The Lord of the Rings: The Return of the King', dscpt: 'Gandalf and Aragorn lead the World of Men '+ 
    'against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'},
];
*/

class MovieCard extends  HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
     // Inside a constructor, adding the initial state


    static get observedAttributes(){
        return ['movietitle', 'dscpt', 'cover'];
    }

    connectedCallback(){
 
        this.render();
        
        /*
        const template = document.getElementById('card-template');
        movies.forEach(movie => {
             const instance = document.importNode(template.content, true);
             instance.querySelector('.moveititle').innerHTML = movie.movietitle; 
             instance.querySelector('.dscpt').innerHTML = movie.dscpt;
 
             this.appendChild(instance);
              
        }) ;
        */
       
    }

    disconnectedCallback(){
        console.log('Disconnected Call Back From the DOM !');
    }

    attributeChangedCallback(attrName,oldValue,newValue){
        if(oldValue !== newValue && newValue !== null){
            this[attrName] = newValue;
        }
    }


    get movietitle(){
        return this.getAttribute('movietitle')
    }


    set movietitle(value){
        if(value){
            this.setAttribute('movietitle', value);
        }else{
            this.removeAttribute('movietitle');
        }
    }

    get moviedscpt(){
        return this.getAttribute('dscpt')
    }

    set moviedscpt(value){
        if(value){
            this.setAttribute('dscpt', value);
        }else{
            this.removeAttribute('dscpt');
        }
    }

    get moviecover(){
        return this.getAttribute('cover')
    }

    set moviecover(value){
        if(value){
            this.setAttribute('cover', value);
        }else{
            this.removeAttribute('cover');
        }
    }

    render(){
        const { shadowRoot } = this;
        const template = document.getElementById('card-template');

        shadowRoot.innerHTML = '';
        if(template){

            const instance = document.importNode(template.content, true);
            instance.querySelector('.movietitle').innerHTML = this['movietitle']; 
            instance.querySelector('.dscpt').innerHTML = this['dscpt'];
            instance.querySelector('.cover').src = this['cover'];

            shadowRoot.appendChild(instance);
            
           
        }
        else{
            shadowRoot.innerHTML = '<p> shadow Root failed. Please Try again later</p>';
        }
    }
 
}

customElements.define('movie-card', MovieCard); 

//document.querySelector('movie-card').remove(); //Death of the ELement in the DOM.
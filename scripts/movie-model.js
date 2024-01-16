class MovieModel extends HTMLElement{
    static get observedAttributes(){
        return ['open','movietitle','descpt','cast', 'cover'];
    }
    
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.close = new CustomEvent('close',{
            bubbles: true, // bubble up to the parent component
            cancelable:false, // cacelable using event.preventDefault
            detail:{    // add extra data
                open:false
            }

        })
    }
    
    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue){

        if(attrName !== 'open' && oldValue !== newValue){
            this[attrName] = newValue;
        }
        else if (attrName === 'open'){ 
            this[attrName] = this.hasAttribute(attrName);
        } 

        this.render();
    }
 

    render(){

        const { shadowRoot } = this;
        const template = document.getElementById('model-template');
        const loading = [{transform: 'rotate[0deg]'},{transform:'rotate(360deg'},];
        const loadingTiming = {duration:3000,iterations:50};

        shadowRoot.innerHTML = '';
        if(template){

            const instance    = document.importNode(template.content, true);
            const close       = instance.querySelector('.close');
            const wrapper     = instance.querySelector('.wrapper');
            const movietitle  = instance.querySelector('.movietitle');
            const moviedescpt = instance.querySelector('.dscpt');
            const moviecast   = instance.querySelector('.cast');
            const moviecover  = instance.querySelector('.cover');
            const loader      = instance.querySelector('.loader');
            const loadAnimation = loader.animate(loading, loadingTiming);
            const closeEvent = this.close;

            close.onclick = function(){
                this.dispatchEvent(closeEvent);
            }

            shadowRoot.addEventListener('close', () =>{ 
                wrapper.classList.remove('open');
                this['open'] = false;
            })

            if(this['open'] === true){
                instance.querySelector('.wrapper').classList.add('open');
            }

            loadAnimation.play();
            let moviemodel = this;

            setTimeout(function(){
                loadAnimation.finish();
                loader.classList.add('close'); 

                movietitle.innerHTML = moviemodel['movietitle']
                moviedescpt.innerHTML = moviemodel['descpt'];
                moviecast.innerHTML = moviemodel['cast'];
                moviecover.src = moviemodel['cover'];

            }, 2000)
         
            shadowRoot.appendChild(instance);
           
        }
        else{
            shadowRoot.innerHTML = '<p> Shadow Root failed. Please Try again later</p>';
        }

    }

}

customElements.define('movie-model', MovieModel);
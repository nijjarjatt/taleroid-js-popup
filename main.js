(function () {
    this.TaleroidPopUp = function() {
        //Global plugin data
        this.popupCloseButton = null;
        this.popup = null;
        this.transitionEnd = transitionSelect();

        //Default Options
        var popupDefaultOptions = {
            popupContent:           null,
            popupClass:             'fade-and-drop',
            popupCloseButton:       true,
            popupMinWidth:          300,
            popupMaxWidth:          700,
        };
        
        if( arguments[0] && typeof arguments[0] === "object"  ) {
            this.popupOptions = validateOptions( arguments[0], popupDefaultOptions);
        }        
    }

    //Private methods
    
    function transitionSelect() {
    var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

    //Helper method to check the passed arguments against the default options
    function validateOptions(args, defOpts){
        for (var arg in args){
            if( args.hasOwnProperty(arg) ){
                defOpts[arg] = args[arg];
            }
        }
        return defOpts;
    }

    //Make popup from the options
    function makePopup(){
        var popupContent, popupContentWrap, taleroidDocFrag;

        //Set the conetnt for the popup
        if(typeof this.popupOptions.popupContent === "string"){
            popupContent = this.popupOptions.popupContent;
        }else{
            popupContent = this.popupOptions.popupContent.innerHTML;
        }

        //Create a element to hold the contents of the popup otutside DOM
        taleroidDocFrag = document.createDocumentFragment();

        this.popup = document.createElement("div");
        this.popup.className = "taleroid-popup " + this.popupOptions.popupClass;

        this.popup.style.minWidth = this.popupOptions.popupMinWidth + 'px';
        this.popup.style.maxWidth = this.popupOptions.popupMaxWidth + 'px';
        
        if(this.popupOptions.popupCloseButton === true){
            this.popupCloseButton = document.createElement('div');
            this.popupCloseButton.className = "taleroid-close close-button";
            this.popupCloseButton.innerHTML = 'x';
            this.popup.appendChild(this.popupCloseButton);
        }

        popupContentWrap = document.createElement('div');
        popupContentWrap.className = "taleroid-content ";
        popupContentWrap.innerHTML = popupContent;
        this.popup.appendChild(popupContentWrap);

        taleroidDocFrag.appendChild(this.popup);
        document.body.appendChild(taleroidDocFrag);
    }  
    function initializeEvents(){
        if(this.popupCloseButton){
            this.popupCloseButton.addEventListener('click', this.closePopup.bind(this));
        }
    }     
    
    //public methods
    TaleroidPopUp.prototype.openPopup = function() {
        makePopup.call(this);

        initializeEvents.call(this);

        window.getComputedStyle(this.popup).height;

        this.popup.className = this.popup.className +
      (this.popup.offsetHeight > window.innerHeight ?
        " taleroid-open taleroid-anchored" : " taleroid-open");
    }
    TaleroidPopUp.prototype.closePopup = function() {
        var _ = this;

        console.log(this.popup.className);
        this.popup.className = this.popup.className.replace(" taleroid-open", "");
    
        this.popup.addEventListener(this.transitionEnd, function() {
          _.popup.parentNode.removeChild(_.popup);
        });
    }

}());

var popup = new TaleroidPopUp({
   popupContent :        'div1'
});
popup.openPopup();
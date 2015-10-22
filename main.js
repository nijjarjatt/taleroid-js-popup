(function () {
    this.TaleroidPopUp = function() {
        //Global plugin data
        this.popupCloseButton = null;
        this.popup = null;

        //Default Options
        var popupDefaultOptions = {
            popupContent:           null,
            popupClass:             'fade',
            popupCloseButton:       true,
            popupMinWidth:          300,
            popupMaxWidth:          700
        };
        
        if( arguments[0] && typeof arguments[0] === "object"  ) {
            this.popupOptions = validateOptions( arguments[0], popupDefaultOptions);
        }        
    }

    //Private methods
    
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
        this.popup.className = "taleroid-popup-" + this.popupOptions.popupClass;

        this.popup.style.minWidth = this.popupOptions.popupMinWidth + 'px';
        this.popup.style.maxWidth = this.popupOptions.popupMaxWidth + 'px';
        
        if(this.popupOptions.popupCloseButton === true){
            this.popupCloseButton = document.createElement('div');
            this.popupCloseButton.className = "taleroid-popup-close";
            this.popupCloseButton.innerHTML = 'x';
            this.popup.appendChild(this.popupCloseButton);
        }

        popupContentWrap = document.createElement('div');
        popupContentWrap.className = "taleroid-popup-content";
        popupContentWrap.innerHTML = popupContent;
        this.popup.appendChild(popupContentWrap);

        taleroidDocFrag.appendChild(this.popup);
        document.body.appendChild(taleroidDocFrag);
    }       
    
    //public methods
    TaleroidPopUp.prototype.openPopup = function() {
       makePopup.call(this);
    }
}());

var popup = new TaleroidPopUp({
   popupContent :        'div1'
});
popup.openPopup();
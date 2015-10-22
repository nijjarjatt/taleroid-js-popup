(function () {
    this.TaleroidPopUp = function() {
        //Global plugin data
        this.close = null;
        this.popup = null;

        //Default Options
        var popupDefaultOptions = {
            popUpContent:           null,
            popupClass:             'fade',
            popUpCloseButton:       true,
            popUpMaxWidth:          50,
            popUpMaxHeight:         50
        };
        
        if( arguments[0] && typeof arguments[0] === "object"  ) {
            this.popupOptions = validateOptions( arguments[0], popupDefaultOptions);
            console.log(this.popupOptions);
        }

        //Private methods
        //Helper method to check the passed arguments against the default options
        function validateOptions(args, defOpts){
            for (var arg in args){
                if( args.hasOwnProperty(arg) ){
                    console.log('Sucess');
                    defOpts[arg] = args[arg];
                }
            }
            return defOpts;
        }
    }
    
    //public methods
    TaleroidPopUp.prototype.method1 = function() {
       //Method 1 Logic goes here
    }
}());

var popup = new TaleroidPopUp({
    popupClass:         'test'
});
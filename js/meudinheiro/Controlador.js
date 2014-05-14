(function(MD){
        
    var C = function( ){
        
        var head = Array.prototype.slice.call(arguments);

        return function(){
            ControladorMeuDinheiro.apply(this,head.concat(Array.prototype.slice.call(arguments)));
        }
        
    };
    
    var CS = function( ){
        
        var head = Array.prototype.slice.call(arguments);

        return function(){
            ControladorMeuDinheiroSync.apply(this,head.concat(Array.prototype.slice.call(arguments)));
        }
        
    };

    MD.Controlador = C;
    
    MD.ControladorSync = CS;
    
})(window.MD);


function ControladorMeuDinheiro()
{
    var callback = arguments[arguments.length-1];
    var url = obtemUrlAjax("meudinheiro");
    var args = arguments;

    var that = this;

    post(url,args,function(r){
        if(typeof(callback) == "function") callback.call(that,r);
    });
}

function ControladorMeuDinheiroSync()
{
    var callback = arguments[arguments.length-1];
    var url = obtemUrlAjax("meudinheiro");
    var args = arguments;

    var that = this;

    postSync(url,args,function(r){
        if(typeof(callback) == "function") callback.call(that,r);
    });
}
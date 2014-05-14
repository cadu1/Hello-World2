(function(window,$){
    
var 
SW = function( o , c){
    
    var cfg = $.extend(true,{
        /*Quando vai disparar o evento*/
        offset : 0,
        /*Atingiu o offset inicial*/
        on : function(){},
        /*Voltou antes do offset inicial*/
        off :function(){}
    },c), 
    status = 0,
    /*Retorna o scroll atual da janela*/
    scroll = function(){ return $(window).scrollTop(); },
    /*Retorna o offset mesmo se for funcao*/
    offset = typeof cfg.offset == 'function' ? cfg.offset.call(o) : cfg.offset,
    /*Monitora o scroll em relacao ao offset passado*/
    monitor = function(){ 
        var s = scroll();
        if(s > offset && status == 0){
            status = 1;
            cfg.on.call(o); 
        }else if(s <= offset && status == 1){
            status = 0;
            cfg.off.call(o); 
        } 
    }
    /*Monitorando*/
    $(window).off('scroll resize',monitor).on('scroll resize', monitor);
    /*Inicia*/
    monitor();
};

/*Tornando metodo de jQuery tambem*/
$.fn.scrollwatch = function(c){
    return this.each(function(){
        new SW( this ,c );
    })
};


})(window,jQuery);
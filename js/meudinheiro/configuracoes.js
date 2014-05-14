(function(MD,$){
    
var C = function(){},
fn = C.prototype,
Ajax = fn.Ajax = new MD.Controlador('CONFIGURACOES'),
AjaxS = fn.AjaxS = new MD.ControladorSync('CONFIGURACOES');
/*Configuracoes de utilizacao do MD*/
MD.C = new C;

var config = {
    p : {}, // Persistente
    v : {}  // Volatil
},
/*Ultima string de configuracao salva no banco*/
lastConfigStr;

/** Atualiza uma configuracao
 * @param k key
 * @param val key value
 * @param fn Callback after saving..
 **/
var set = fn.set = function(k,val,fn){
    option(false,k,val);
    save(fn);
}

var get = fn.get = function(k){ 
    return option(false,k); 
}

var setV = fn.setv = function(k,val,fn){
    option(true,k,val);
    save(fn);
}

var getV = fn.getv = function(k){ return option(true,k); }

function option(vol,field,value){

    var keys = field.split('.'),
        obj = vol ? config.v : config.p,
        key = keys[0],
        val = obj[ key ];

    for(var i = 1 ; i < keys.length ; i++){
        /*Eh um objecto e nao um array..*/
        if(val && typeof val == 'object' && val.constructor != Array){
            obj = val;
            val = val[ key = keys[i]];
        }else if(typeof value !== undefined && (typeof val == 'undefined' || val === null)){
            
//            if(i < keys.length ){
                obj[key] = {};
                obj = obj[key];
                key = keys[i];
                val = obj[ key ];
//            }
            
        }else break;
    }
    
//    console.log(config.p);
    
    /*Nao foi passado value, eh um get()*/
    if(arguments.length < 3) return val;
    /*Setando objeto e retornando novo valor*/
    return obj[ key ] = value;
}
    
function load(){
    AjaxS('LOAD',function(r){
//        console.log(r);
        config = $.parseJSON(r);
//        console.log($.parseJSON(r));
//        console.log(config);
    });
}   

function save(fn){
    var cstr = JSON.stringify(config);
    if(lastConfigStr != cstr){        
        Ajax('SAVE',cstr,function(r){
            lastConfigStr = cstr;
            fn && fn();
        });
    }else{
//        console.log('Saving [cache]')
    }
}

load();

    
})(window.MD,jQuery);


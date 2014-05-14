(function(window){
    var 
    /*Referencia interna*/
    location = window.document.location,
    /*Hashes de controle*/
    hashes = {
        cur: '', /*Hash atual*/
        def : '' /*Hash padrao*/
    },
    /*Associacoes hash=>funcao */
    _hashmap,
    /*Tempo para verificar se a hash mudou*/
    time = 100;
    
    var Hashes = function(defhash,hashmap){
        
        if( !(this instanceof arguments.callee) )
            return new Hashes(defhash,hashmap);
        /*Inicializa nosso hashmap*/
        _hashmap = hashmap;
        /*Inicializa hash padrao*/
        hashes.def = defhash;
        /*Comeca a monitorar*/
        init();
    }
    
    function init(){
        /*Define ancora default caso nao exista*/
        location.hash || push(hashes.def);
        /*Monitor*/
        setInterval(function(){
            /*Verifica se houve mudanca de ancora*/
            if(hashes.cur != location.hash){
                /*Atualiza controle de hash (antes de executar pois pode haver)
                 *alteracao do objeto location*/
                hashes.cur = location.hash;
                /*Executa essa hash*/
                executeHash(location.hash);
            }
        }, time);
    } 
    
    function executeHash(hash){
        /*Removendo o inicio (#!/) */
        hash = hash.replace(/^#!\//,'');
        /*Executa a hash*/
        if(_hashmap[ hash ]) _hashmap[ hash ]();
        else push(hashes.def);
    }
    
    /*Metodos publicos*/
    
    var push = Hashes.prototype.push = function(hash){
        /*Apenas enfeitando*/
        hash = "!/" + hash;
        
        /*Atualiza hash da pagina*/
        if(hashes.cur != ("#" + hash) )
            location.hash = hash;
        else reload();
    }
    
    var reload = Hashes.prototype.reloadCurrentHash = function(){
        /*Executa hash atual*/
        executeHash(hashes.cur);
    }
    
    var getCurrent = Hashes.prototype.getCurrent = function(){
        return hashes.cur.replace('#!/','');
    }
    
    /*Tornando classe publica*/
    window.Hashes = Hashes;
    
})(this);
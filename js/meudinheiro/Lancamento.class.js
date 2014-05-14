(function(window,MD,$){

var 
L = function(o){
    var 
    /*Atalho*/
    fn = this,
    /*Dados do lancamento (privados)*/
    
    options = $.extend(true,{
        /* Codigo do lancamento/agenda */
        codigo : undefined,
        /*Guarda o codigo para carregamento de tela de residuo*/
        residuo : undefined,
        /*Guarda o codigo para carregamento de tela de clone*/
        clone : undefined,
        /*Se faz parte de uma agenda, guarda a data da ocorrencia*/
        virtual : undefined,
        descricao : "",
        tipo : 'D',
        status : {
            confirmado: 0,
            conciliado: 0
        },
        automatico : 0,
        notificacoes : {
            email : {
                enviar : 0,
                dias : 0
            }
        },
        valor : {
            previsto : 0,
            efetivo : 0,
            compra : 0
        },
        data : {
            prevista : null,
            efetiva : null,
            anterior : null,
            compra : null
        },
        repetir : {
            repetir : false,
            quantidade: 1,
            primeira: 0,
            frequencia : null,
            intervalo : null,
            nparcela : null,
            parcela_desc: 1,
            ajustar_parcelas: null,
            /*Tipo de alteracao da agenda na edicao: (ESTE|TODOS)*/
            alteracao : undefined
        },
        cadastros : {
            conta   : 0,
            destino : 0,
            centro  : 0,
            contato : 0,
            forma   : 0,
            plastico: 0,
            projeto : 0
        },
        /*Codigo do sonho associado a este lancamento*/
        sonho : null,
        /*Tipo de operacao do sonho: Aplicacao(A) ou Resgate(R)*/
        sonhoOp : null,
        ndocumento : null,
        observacoes : null,
        regra : null,
        comprovante : null,
        /*Eh para entrar na proxima fatura do cartao de credito?*/
        proxima_fatura : 0,
        valor_parcela : 1,
        /*Este lancamento eh um pagamento ?*/
        pagamento : 0,
        /*Data/hora de criacao deste lancamento*/
        data_hora : null,
        /*Existe fatura associada a este lancamento ?*/
        fatura : null,
        grupo : null,
        operacao : null
    },o);
    
    var option = fn.option = function(field,value){
        
        var keys = field.split('.'),
            obj = options,
            key = keys[0],
            val = obj[ key ];

        for(var i = 1 ; i < keys.length ; i++){
            /*Eh um objecto e nao um array..*/
            if(val && typeof val == 'object' && val.constructor != Array){
                obj = val;
                val = val[ key = keys[i] ];
            }else break;
        }
        /*Nao foi passado value, eh um get()*/
        if(arguments.length < 2) return val;
        /*Setando objeto e retornando novo valor*/
        return obj[ key ] = value;
    };
    
    /**
     * Monta um cadastros apartir de um campo de autocomplete
     * @param input Campo com o autocomplete
     * @param cadastro Nome do cadastro pra montar
     **/
    var insertAutocomplete = fn.insertAutocomplete = function(input,cadastro){
        /*Campo nao encontrado*/
        if(!input[0]) return;
        var 
        /*Objeto de destino do cadastro*/
//        d = ,
        v = input.val().trim(),
        p = input.attr("placeholder") ? input.attr("placeholder").trim() : "",
        l = input.attr("label") ? input.attr("label").trim() : "",
        c = input.attr("cod");

        /*Se o valor no atributo label for igual ao valor do input ou o valor 
         *for igual ao placeholder significa que foi escolhida uma opcao da  
         *lista ou a opcao padrao foi utilizada, respectivamente*/
        options.cadastros[cadastro] = ( v == p ) || (v == l) ? {cod: parseFloat(c) , novo : 0} : {cod: v , novo : 1};
//        console.log(d);
    } 
    
    fn.options = function(){
        return options;
    }
    
    fn.encode = function(){
        return JSON.stringify(options);
    }
};

    
L.getLancamentoFromRow = function(r){

    return new L({
        codigo : r.attr('cod'),
        virtual : r.attr("virtual"),
        data    : {anterior : r.attr('data')},
        tipo    : r.attr("tipo"),
        grupo   : r.attr("grupo"),
        valor   : {previsto : parseFloat(r.attr("valor"))},
        repetir : {nparcela : r.attr("numero_parcela")}
    });
}

/*Expondo ao escopo do Meu Dinheiro*/
MD.Lancamento = L;
    
})(window,window.MD,jQuery);
/*Classe que engloba todas as hashes usadas no meudinheiro*/
(function(window){
    
    var hashmap = {
        /*Links principais*/
        'visaogeral' : function(){MD.Resumo.pagina();},
        'movimentacoes' : function(){MD.Agenda.pagina();},
        'cartoes' : function(){MD.CartaoCredito.pagina();},
        
        'metas/orcamento' : function() {MD.Metas.pagina();},
        'metas/economia' : function(){ MD.Sonhos.pagina(); },
        
        /*Links alternativos*/
        'lembretes' : function(){carregar_lembretes();},
        'configuracoes' : function(){carregar_configuracoes();},
        
        /*Relatorios*/
        'relatorios/contaspagarreceber' : function(){MD.Relatorios.pagina('CONTAS_PAGAR_RECEBER');},
        'relatorios/evolucaocat' : function(){MD.Relatorios.pagina('EVOLUCAO_CAT');},
        'relatorios/evolucaord' : function(){MD.Relatorios.pagina('EVOLUCAO_RD');},
        'relatorios/extrato' : function(){MD.Relatorios.pagina('EXTRATO_DETALHADO');},
        'relatorios/fluxodecaixa' : function(){MD.Relatorios.pagina('FLUXO_CAIXA');},
        'relatorios/lancamentoscategoria' : function(){MD.Relatorios.pagina('LANCAMENTOS_CATEGORIA');},
        'relatorios/lancamentoscentro' : function(){MD.Relatorios.pagina('LANCAMENTOS_CENTRO');},
        'relatorios/lancamentoscontato' : function(){MD.Relatorios.pagina('LANCAMENTOS_CONTATO');},
        'relatorios/lancamentosprojeto' : function(){MD.Relatorios.pagina('LANCAMENTOS_PROJETO');},
        'relatorios/totaiscategoria' : function(){MD.Relatorios.pagina('TOTAIS_CATEGORIA');},
        'relatorios/totaiscentro' : function(){MD.Relatorios.pagina('TOTAIS_CENTRO');},
        'relatorios/totaiscontato' : function(){MD.Relatorios.pagina('TOTAIS_CONTATO');},
        'relatorios/totaisprojeto' : function(){MD.Relatorios.pagina('TOTAIS_PROJETO');},
        
        /*Cadastros*/
        'cadastros/categorias' : function(){MD.Categorias.pagina();},
        'cadastros/contas' : function(){MD.Contas.pagina();},
        'cadastros/centros' : function(){MD.Centros.pagina();},
        'cadastros/contatos' : function(){MD.Contatos.pagina();},
        'cadastros/formaspagto' : function(){ MD.Formas.pagina();},
        'cadastros/projetos' : function(){MD.Projetos.pagina();},
        'cadastros/regras' : function(){MD.Regras.pagina();},
        
        /*Outros*/
        'outros/extratos'    : function(){MD.Conciliacao.pagina();},
        'outros/exportacao'  : function(){MD.Exportacao.pagina();},
        'outros/busca'       : function(){MD.Busca.pagina();}
    };

    /*Instancia classe de Hashes*/
    var b;
    
    /*Construtor de HashesMD*/
    var HashesMD = function(){
        
        if( !(this instanceof arguments.callee) )
            return new HashesMD(arguments);
        
        /*Primeira funcao da lista*/
        var def = $("#main-menu .function").first().attr("hash");
        b = Hashes(def,hashmap);
        
        /*Page links*/
        $("#main-menu .function,#button-configuracoes,#button-notificacoes").click(function(){
            /*Insere hash*/
            b.push( $(this).attr('hash') );
        });
        
        /*Extendendo metodo (Deve ser dentro do construtor mesmo)*/
        HashesMD.prototype.reloadCurrentHash = b.reloadCurrentHash;
      
        HashesMD.prototype.getCurrent = b.getCurrent;
        
        HashesMD.prototype.push = b.push;
    };
    
    
    /*Tornando classe publica*/
    window.HashesMD = HashesMD;
    
})(this);
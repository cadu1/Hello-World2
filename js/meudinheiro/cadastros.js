(function(window,MD,$){
    
var Cadastro = function(cad){
    
    var fn = this;
        
    var pagina = fn.pagina = function(link,extraEvents){
        preparaExibicao(link);
        cad.Ajax("DADOS",function(r){
            
            
            conteudo(r,"#conteudo",function(){
                
                actionsmd();
                
                $('.cad-header').scrollwatchmd();

                $(".novo-cad").click(function(){
                    if(!checkBsc()) cad.editar();
                });

                $(".botao_editar").click(function(){
                    cad.editar( $(this).closest('tr').attr("cod") );
                });

                $(".botao_excluir").click(function(){
                    cad.excluir( $(this).closest('tr').attr("cod") , $(this).hasClass('auth') );
                });
                
                extraEvents && extraEvents();
                
            });
        });
    };    
    
    var checkBsc = fn.checkBsc = function(){
        var bsc = !!$("#cadbusr")[0];
        if(bsc) erro_funcionalidade_premium();
        return bsc;
    }
};
/*Expondo metas ao MD Global*/
MD.Cadastro = Cadastro;

    
    
})(window,window.MD,jQuery);

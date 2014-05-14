(function(window,MD,$){
    
var 
/*Construtor*/
Formas = function(){},
/*Atalho*/
fn = Formas.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','formas'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Formas = new Formas();

var pagina = fn.pagina = function(){
    Cadastro.pagina("link_cabecalho_formaspgto",function(){
        
        $(".botao_editar").off('click').click(function(){
            var linha = $(this).closest('tr'),
            cod = linha.attr("cod"),
            nome = linha.find('.forma-nome').text().trim();
            editar( cod,null,null,nome );
        });
        
        $(".botao_excluir").off('click').click(function(){
            var linha = $(this).closest('tr'),
            cod = linha.attr("cod"),
            nome = linha.find('.forma-nome').text().trim();
            excluir( cod,nome );
        });
    }); 
};

/**
 * Tela de criacao/edicao categorias.
 * @param [codigo] Codigo da categoria para editar.
 * @param [salvarCb] Evento apos clicar em salvar.
 * @param [cancelarCb] Evento apos clicar em cancelar.
 */
var editar = fn.editar = function(codigo,salvarCb,cancelarCb,nome){
        
        var _action = function(r){
            if(r){
                Ajax("EDITAR",JSON.stringify({codigo:codigo,nome:r}),function(cod){
    
                    if(salvarCb){
                        salvarCb({
                            cod : cod,
                            name : r
                        });
                    } 
                    else pagina();
                });
            }
        },
        buttons = {
            ok : "Salvar",
            cancel : "Cancelar"
        },
        label = !codigo ? "Digite um nome para a nova forma de pagamento" : 
                          "Digite um novo nome para a forma de pagamento",
        title = !codigo ? "Nova forma de pagamento" : "Editar forma de pagamento";
        
        /*Chama a tela..*/
        jPrompt(label,nome || '',title, _action , buttons );
}
    

var excluir = fn.excluir = function(codigo,nome){
    jConfirm("<b>Forma de pagamento: "+nome+"</b><br>Deseja remover esta forma de pagamento?<BR/>Lançamentos já associados não serão deletados, apenas desassociados.", 
            "Excluir forma de pagamento", function(r){
                if(r){
                    Ajax("EXCLUIR",codigo,function(r){
                        pagina();
                    });
                }
            }, {ok:"Sim",cancel:"Não"});
}

})(window,window.MD,jQuery);
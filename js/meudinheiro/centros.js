(function(window,MD,$){
    
var 
/*Construtor*/
Centros = function(){},
/*Atalho*/
fn = Centros.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','centros'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Centros = new Centros();

var pagina = fn.pagina = function(){ Cadastro.pagina("link_cabecalho_centros"); };

/**
 * Tela de criacao/edicao categorias.
 * @param [codigo] Codigo da categoria para editar.
 * @param [salvarCb] Evento apos clicar em salvar.
 * @param [cancelarCb] Evento apos clicar em cancelar.
 * @param [tipo] Fixar um tipo de categoria?
 */
var editar = fn.editar = function(codigo,salvarCb,cancelarCb,tipo){
        
    var 
    _salvar = function(){
        
        var tipo = $("input:radio[name='tipo_novo_centro']:checked").val();
        var nome = $("#input_nome_novo_centro").validate({
            alert: true,
            msg: "Indique um nome para o centro.",
            func: function(input){return $(input).val().length > 0 ? true : false;}
        });

        var linha_destino = $("#linha_destino_centro select:visible");
        var pai = linha_destino[0] ? linha_destino.find("option:selected").attr("cod") : 0;

        if(nome){
            Ajax("EDITAR",JSON.stringify({codigo:codigo,tipo:tipo,nome:nome}),function(cod){
                d.close();
                if(salvarCb){
                    salvarCb({
                        cod : cod,
                        name : nome
                    });
                } 
                else pagina();
            });
            return true;
        }
        return false;
        
    }, buttons = {};
    
    buttons['Salvar'] = function(){ 
        _salvar();
    };
        
    /*Se esta na tela de criacao, habilita botao de continuar*/
    if(!codigo){
        buttons['Salvar e continuar'] = function(){ 
            if(_salvar())
                editar(codigo,salvarCb,cancelarCb); 
        };
    }
    
    buttons['Cancelar'] =  function(){
        d.close();
        cancelarCb && cancelarCb();
    };
        
    var d = jDialog({
        title : (!codigo ? 'Novo' : 'Editar') + " centro",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EDITAR',codigo || 0 ,tipo,function(r){
                d.html(r).showButtons();
            });
        },
        buttons : buttons
    });
}
    
var excluir = fn.excluir = function(codigo,auth){
    
        
    var d = jDialog({
        title : "Excluir centro",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EXCLUIR',codigo ,function(r){
                d.html(r).showButtons();
                $("[name='escolha']").click(function(){
                    $(".cadastro-exclusao-destino").toggle($(this).val()=="mover");
                });
                
            });
        },
        buttons : {
            Excluir : function(){
                
                var centro_destino = "";
                if($("[name='escolha']:checked").val() == "mover"){
                    centro_destino = $(".cadastro-exclusao-destino select").val();
                }
                
                 /*Excluir lancamentos deste centro*/
                if(!centro_destino.length)
                    confirmar_exclusao_grupo(function(){excluir_centro();},auth);
                else
                    excluir_centro();

                function excluir_centro(){
                    Ajax("EXCLUIR",codigo,centro_destino,function(r){
                        d.close();
                        pagina();
                    });
                }
            },
            Cancelar : function(){
                d.close();
            }
        }        
    });
}
    
})(window,window.MD,jQuery);
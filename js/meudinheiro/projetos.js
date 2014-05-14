(function(window,MD,$){
    
var 
/*Construtor*/
Projetos = function(){},
/*Atalho*/
fn = Projetos.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','projetos'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Projetos = new Projetos();

var pagina = fn.pagina = function(){ Cadastro.pagina("link_cabecalho_projetos"); };


var editar = fn.editar = function(codigo,salvarCb,cancelarCb,tipo){
        
    var 
    d,
    _salvar = function(){
        var 
        nome = d.dialog.find('.input-nome').val().trim(),
        cor = $("#colorpicker").data('colorpicker').get();
        this.disable('Salvando...');
        Ajax('EDITAR',JSON.stringify({
            codigo : codigo,
            nome: nome,
            cor : cor
        }),function(cod){
            d.close();
            if(salvarCb){
                salvarCb({
                    cod : cod,
                    name : nome
                });
            } 
            else pagina();
        });
        
    }, buttons = {};
    
    buttons['Salvar'] = function(){ 
        _salvar.call(this);
    };
        
    /*Se esta na tela de criacao, habilita botao de continuar*/
//    if(!codigo){
//        buttons['Salvar e continuar'] = function(){ 
//            if(_salvar().call(this))
//                editar(codigo,salvarCb,cancelarCb); 
//        };
//    }
    
    buttons['Cancelar'] =  function(){
        d.close();
        cancelarCb && cancelarCb();
    };
        
    d = jDialog({
        title : (!codigo ? 'Novo' : 'Editar') + " projeto",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EDITAR',codigo || 0 ,tipo,function(r){
                d.html(r).showButtons();
                d.dialog.find('#colorpicker').colorpicker();
                d.center();
            });
        },
        buttons : buttons
    });
}

var excluir = fn.excluir = function(codigo,auth){
    
    var d = jDialog({
        title : "Excluir projeto",
        showButtons : false,
        ajax : function(){
            Ajax('EXCLUIR_TELA',codigo ,function(r){
                d.html(r).showButtons();
                $("[name='escolha']").click(function(){
                    $(".cadastro-exclusao-destino").toggle($(this).val()=="mover");
                });
            });
        },
        buttons : {
            Excluir : function(){
                var categoria_destino = "",
                    v = $("[name='escolha']:checked").val();
                if( v == "mover")
                    categoria_destino = $(".cadastro-exclusao-destino select").val();
                else if(v == 'desassociar')
                    categoria_destino = '0';
                /*Excluir lancamentos desta categoria*/
                if(!categoria_destino.length){
                    confirmar_exclusao_grupo(function(){excluir_categoria();},auth);
                    categoria_destino = '-1';
                }
                
                else excluir_categoria();

                function excluir_categoria(){
                    Ajax("EXCLUIR",codigo,categoria_destino,function(){
                        d.close()
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
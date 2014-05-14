(function(window,MD,$){
    
var 
/*Construtor*/
Categorias = function(){},
/*Atalho*/
fn = Categorias.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','categorias'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Categorias = new Categorias();

var pagina = fn.pagina = function(){ Cadastro.pagina("link_cabecalho_categorias",eventosTela); };
    
function eventosTela(){
    
    $(".botao_mover").click(function(){
        mover( $(this).closest('tr').attr("cod") );
    });

    $(".botao-criar-sub").click(function(e){
        
        var codigo = $(this).closest('tr').attr("cod");
        
        jPrompt("Digite um nome para a nova categoria","","Nova categoria",function(nome){
            if(nome) Ajax("NOVA_SUBCATEGORIA",codigo,nome,function(){pagina();});
        },{
            ok : "Salvar"
        });
    })
    
    $(".nivel.has").click(function(){
        var linha = $(this).closest(".linha-categoria"),
            lista = linha.find(".lista-filhos"),
            opened = $(this).hasClass("opened");
            
        if(opened) lista.slideUp(300);
        else lista.slideDown(300);
        
        $(this).toggleClass("opened closed ui-icon-circle-minus ui-icon-circle-plus");
    });
    
    $(".botao-nivel").click(function(){
        var listas = $(".linha-categoria." + ($(this).hasClass("despesas") ? 'DESPESA' : 'RECEITA' ) + " .lista-filhos"),
            opened = $(this).hasClass("opened");
        
        if(opened) listas.slideUp(300).parent().find(".nivel").removeClass("opened ui-icon-circle-minus").addClass("closed ui-icon-circle-plus");
        else listas.slideDown(300).parent().find(".nivel").addClass("opened ui-icon-circle-minus").removeClass("closed ui-icon-circle-plus");
        
        $(this).toggleClass("opened closed ui-icon-circle-minus ui-icon-circle-plus");
        
        Ajax("ALTERAR_STATUS_CATEGORIAS_EXPANDIDAS",JSON.stringify({
                D : $(".botao-nivel.despesas").hasClass("opened") ? 1 : 0,
                R : $(".botao-nivel.receitas").hasClass("opened") ? 1 : 0
            }));
    });

    if($(".linha-categoria.RECEITA .lista-filhos").length == 0) $(".botao-nivel.receitas").hide();
    if($(".linha-categoria.DESPESA .lista-filhos").length == 0) $(".botao-nivel.despesas").hide();

}

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

        var tipo = $("input:radio[name='tipo_nova_categoria']:checked").val();
        var nome = $("#input_nome_nova_categoria").validate({
            alert: true,
            msg: "Indique um nome para a categoria.",
            func: function(){return $(this).val().length > 0 ? true : false;}
        });

        var pai = $("#linha_destino_categoria select:visible").val() || 0;

        if(nome){
            Ajax("EDITAR",JSON.stringify({codigo:codigo,tipo:tipo,nome:nome,pai:pai}),function(cod){
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
        title : (!codigo ? 'Nova' : 'Editar') + " categoria",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EDITAR',codigo || 0 ,tipo,function(r){
                d.html(r).showButtons();
                $("input[name='tipo_nova_categoria']").click(function(){
                   $("#select_despesas").toggle(this.value=='DESPESA');
                   $("#select_receitas").toggle(this.value=='RECEITA');
                });
                $("#input_nome_nova_categoria").focus();
            });
        },
        buttons : buttons
    });
}
    
    
var excluir = fn.excluir = function(codigo,auth){
    
    var d = jDialog({
        title : "Excluir categoria",
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
                var categoria_destino = "";
                if($("[name='escolha']:checked").val() == "mover")
                    categoria_destino = $(".cadastro-exclusao-destino select").val();
                /*Excluir lancamentos desta categoria*/
                if(!categoria_destino.length)
                    confirmar_exclusao_grupo(function(){excluir_categoria();},auth)
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

var mover = fn.mover = function(codigo){
    
    var d = jDialog({
        title : "Mover categoria",
        showButtons : false,
        ajax : function(){ Ajax('TELA_MOVER',codigo ,function(r){d.html(r).showButtons();}); },
        buttons : {
            Mover : function(){
                var codigo_destino = $("#select_mover_categoria").val();
//                console.log(codigo,codigo_destino);
                Ajax("MOVER",codigo,codigo_destino,function(){
                    d.close();
                    pagina();
                });
            },
            Cancelar : function(){
                d.close();
            }
        }        
    });
}

})(window,window.MD,jQuery);
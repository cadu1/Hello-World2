(function(window,MD,$){
    
var 
/*Construtor*/
Regras = function(){},
/*Atalho*/
fn = Regras.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','regras'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Regras = new Regras();

var pagina = fn.pagina = function(){ Cadastro.pagina("link_cabecalho_regras",eventosTela); };
    
function eventosTela()
{
    $('td.detailed i').detailedmd({
        'p0' : 'CADASTROS' , 'p1' : 'REGRAS' , 'p2' : 'DETAILED'
    });
    
    $(".botao_excluir").off('click').click(function(){
        var linha = $(this).closest('tr'),
        cod = linha.attr('cod'),
        nome = linha.find('.nome-regra').html().trim();
        excluir(cod,nome);
    })
}


/**
 * Tela de criacao/edicao categorias.
 * @param [codigo] Codigo da categoria para editar.
 * @param [salvarCb] Evento apos clicar em salvar.
 * @param [cancelarCb] Evento apos clicar em cancelar.
 */
var editar = fn.editar = function(codigo,salvarCb,cancelarCb){
    
           
    var 
    _salvar = function(){
        
        var regra = _carregar();
        if(regra){
            Ajax("EDITAR",JSON.stringify(regra),function(r){
                 if(r == "1"){
                    d.close();
                    pagina();
                }else{
                    alert("Erro inesperado.");
                }
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
    
    function _carregar(){
        var valido = true;
        /*Tipo de lancamento da regra*/
        var tipo = $("input[name='tipo_regra']:checked").val();
        /*Nome da regra*/
        var nome = $("#nome_regra").val().trim();
        /*O destino varia de acordo com o tipo da regra*/
        var destino;
        if(tipo == "T"){ /*Destino de uma transferencia eh uma conta*/
            destino = $("#select_destino").val();
        }else{ /*Destino de Despesa/Receita eh uma categoria*/
            destino = $(".select-categorias:visible").val();
        }
        /*Conta de origem assodiada a regra*/
        var conta = $(".select-contas:visible").val();
        /*Centro associado a retra*/
        var centro    = $(".select-centros:visible").val();
        /*Contato associado a regra*/
        var contato = $("#select_contatos").val();
        /*Forma de pagamento associada a regra*/
        var formapgto = $("#select_formaspgto").val();
        /*Forma de pagamento associada a regra*/
        var plastico = $(".select_plasticos:visible").val();
        /*Descricao para importacao associada a regra*/
        var descricao = $("#descricao-importacao").val().trim();

        /*Validacoes dos formularios*/

        if(nome.length == 0){
            valido = false;
            alert("O nome da regra não pode estar em branco.");
            $("#nome_regra").val("").focus();
        }else if(!$("#disponibilidade_regra").hasClass("disponivel")){
            valido = false;
            if($("#disponibilidade_regra").hasClass("indisponivel")){
                alert("O nome escolhido não está disponível.");
            }else{
                alert("Por favor, aguarde enquanto verificamos a disponibilidade do nome escolhido.");
            }
            $("#nome_regra").focus();
        }else if( (destino==0 || !destino) && 
                  (conta==0 || !conta) && 
                  (centro==0 || !centro) && 
                  (contato==0 || !contato) && 
                  (formapgto==0 || !formapgto) && 
                  (plastico==0 || !plastico) ){
            valido = false;
            alert("Não é possível criar uma regra apenas com a descrição.");
        }else if(tipo == "T" && (destino == conta)){
            valido = false;
            alert("As contas de destino e origem não podem ser iguais.");
        }

        return valido ? {

            codigo         : codigo , 
            tipoLancamento : tipo,
            nome           : nome,
            destino        : destino,
            conta          : conta,
            centro         : centro,
            contato        : contato,
            formapgto      : formapgto,
            plastico       : plastico,
            descricao      : descricao

        } : null;
    }

    function _eventos(){

        var campo_nome    = $("#nome_regra"),
            regra_inicial = campo_nome.val();

        var t = "",
            disp = $("#disponibilidade_regra").html(t).addClass("disponivel"),
            cache = {};
    
        campo_nome.keyup(function(){
            var nome = $(this).val().trim(),
            tipo = $("input[name='tipo_regra']:checked").val();
            __verifica_disponibilidade(nome,tipo);
        });

        var __toggle = function(){
            var tipo = $("input[name='tipo_regra']:checked").val();

            if(tipo == "T"){
                $(".linha_transferencia").show();
                $(".linha_n_transferencia").hide();
            }else{
                $(".linha_transferencia").hide();
                $(".linha_n_transferencia").show();
                if(tipo == "D"){
                    $(".campo_despesa").show();
                    $(".campo_receita").hide();
                }else{
                    $(".campo_despesa").hide();
                    $(".campo_receita").show();
                }
            }

            d.center();
                
            __verifica_disponibilidade(campo_nome.val().trim(),tipo);
        }

        $("input[name='tipo_regra']").click(__toggle);
        
        __toggle();

        $("#fechar_nova_regra").click(function(){
            cancelar_jAjax();
        });

        /*Exibindo plasticos de contas de cartao de credito*/
        $("#select_contas").change(function(){
            var conta = $(this).val();

            var plasticos = $("#select_plasticos"+conta);

            /*Achou plasticos para essa conta*/
            if(plasticos[0]){
                $(".plastico").show();
                $(".select_plasticos").hide();
                plasticos.show();
            }else{
                $(".plastico").hide();
            }

        });

        function __verifica_disponibilidade(nome,tipo){
            var key  = nome + tipo;
            if(nome.length > 0 && nome != regra_inicial){
                if(key in cache){
                    __marca_disponibilidade_regra(cache[key]);
                }else{
                    disp.html("<img src='visao/img/uploading.gif' style='vertical-align:middle;'>");
                    verifica_disponibilidade(nome,tipo,function(r){
                        cache[key] = r;
                        __marca_disponibilidade_regra(r);
                    });
                }
            }else{
                disp.html(t).removeClass("disponivel indisponivel");
                if(nome == regra_inicial && regra_inicial.trim().length > 0)
                    disp.addClass("disponivel");
            }

            function __marca_disponibilidade_regra(d){
                if(d)
                    disp.html("Regra disponível").addClass("disponivel").removeClass("indisponivel");
                else
                    disp.html("Regra indisponível").removeClass("disponivel").addClass("indisponivel");
            }
        }
    }


    var d = jDialog({
        title : (!codigo ? 'Nova' : 'Editar') + " regra de preenchimento",
        showButtons : false,
        ajax : function(){
            
            Ajax('TELA_EDITAR',codigo,function(r){
                d.html(r).showButtons();
                _eventos();
                
            });
        },
        buttons : buttons
    });
    
    
};
  

var excluir = fn.excluir = function(codigo,nome){
    jConfirm("<b>Regra: "+nome+"</b><br>Deseja remover esta regra?", "Excluir regra", function(r){
        if(r){
            Ajax("EXCLUIR",codigo,function(r){
                pagina();
            });
        }
    }, {ok:"Sim",cancel:"Não"});
}

var verifica_disponibilidade = fn.verifica_disponibilidade = function(nome,tipo,func){
    Ajax("DISPONIBILIDADE",nome,tipo,function(r){
        func(r == "1");
    })
}


//function caixas_detalhamentos(){
//    $("td.detailed").each(function(){
//          var linha     = $(this).closest("tr"),
//              nome      = linha.find(".nome-regra")[0] ? linha.find(".nome-regra").html().trim() : "-",
//              tipo      = linha.find(".tipo-regra")[0] ? linha.find(".tipo-regra").html().trim() : "-",
//              categoria = linha.find(".categoria-regra")[0]? linha.find(".categoria-regra").html().trim() : "-",
//              conta     = linha.find(".conta-regra")[0] ? linha.find(".conta-regra").html().trim() : "-",
//              contad    = linha.find(".contad-regra")[0] ? linha.find(".contad-regra").html().trim() : "-",
//              centro    = linha.find(".centro-regra")[0] ? linha.find(".centro-regra").html().trim() : "-",
//              contato   = linha.find(".contato-regra")[0] ? linha.find(".contato-regra").html().trim() : "-",
//              formapgto = linha.find(".formapgto-regra")[0] ? linha.find(".formapgto-regra").html().trim() : "-",
//              plastico  = linha.find(".plastico-regra")[0]? linha.find(".plastico-regra").html().trim() : "-",
//              descricao = linha.find(".desc-regra")[0]? linha.find(".desc-regra").html().trim() : "-";
//        
//        var table  = "<table class='detailed_table'>";
//            table += table_line("Tipo",tipo);
//            table += table_line("Categoria",categoria);
//            table += table_line("Conta",conta);
//            table += table_line("Conta Destino",contad);
//            table += table_line("Centro",centro);
//            table += table_line("Contato",contato);
//            table += table_line("Forma pagto.",formapgto);
//            table += table_line("Cartão",plastico);
//            table += table_line("Desc. importação",descricao.length > 0 ? descricao : "-");
//            table += "</table>";
//
//        $(this).preview({
//                text : table,
//                title : nome
//            });
//    });
//            
//    function table_line(title,value,fmt)
//    {
//        var tr = ""
//        tr += "<tr>";
//            tr += "<td  class='detailed_label'>";
//                tr += title;
//            tr += "</td>";
//            tr += "<td  class='detailed_data "+(fmt?fmt:"")+"'>";
//                tr += value;
//            tr += "</td>";
//        tr += "</tr>";
//        return tr;
//    }
//}


/**
 * Trata campo de autocomplete das regras onde existe
 */
var autocomplete = fn.autocomplete = function(getype,onselect,novo){
    
    var elements = $(".campo-regras")
    
    elements.each(function(){
    
        var element = $(this),
            cache   = {},
            lastXhr;
        
        element.autocomplete({
            minLength: 0,
            source : function( request, response ){
                
                var tipo = getype();

                var nome = request.term,
                    key = nome + tipo;
                if(key in cache)
                {
                    response(cache[key]);
                }
                else
                {
                    element.addClass("loading");
                    lastXhr = $.getJSON("visao/php/meudinheiro/carregar_regras.php",
                    {
                        nome:nome,
                        tipo: tipo
                    },
                    function(data,status, xhr )
                    {
                        element.removeClass("loading");
                        cache[ key ] = data;
                        if ( xhr === lastXhr ){
                            response(data);
                        }
                    });
                }
            },
            focus: function( event, ui ) {
                    return false;
            },
            select: function( event, ui ) {
                    element.val( ui.item.nome);
                    element.attr({"cod":ui.item.id , "label" : ui.item.nome});
                    onselect(ui.item);
                    return false;
            }
        }).click(function(){
            if ( element.autocomplete( "widget" ).is( ":visible" ) ) {
                element.autocomplete( "close" );
                return;
            }
            element.autocomplete( "search", "" );
            element.focus();
        }).bind('keyup blur click focus',function(){
                _exibicao_checkbox_regra(element);
                /*Removendo acessibilidade (atrapalha scrollPanel)*/
                $('.ui-helper-hidden-accessible').remove();
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return  $( "<li></li>" ).data( "item.autocomplete", item ).
            append( "<a>" + item.nome + "</a>").appendTo( ul );
        };
    });
        
    function _exibicao_checkbox_regra(input)
    {
        if(input[0])
        {
            var v = input.val().trim();
            var p = input.attr("placeholder") ? input.attr("placeholder").trim() : "";
            var l = input.attr("label") ? input.attr("label").trim() : "";

            /*Se o valor no atributo label for igual ao valor do input ou o valor 
                *for igual ao placeholder significa que foi escolhida uma opcao da  
                *lista ou a opcao padrao foi utilizada, respectivamente*/
            novo(!( ( v == p ) || (v == l) ));
        }
    }
}


    
})(window,window.MD,jQuery);

(function(window,MD,$){
    
var 
/*Construtor*/
Contatos = function(){},
/*Atalho*/
fn = Contatos.prototype,
filtros,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','contatos'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Contatos = new Contatos();

var janelaCategorias;

var pagina = fn.pagina = function(){ 
    preparaExibicao("link_cabecalho_contatos");
    Ajax('DADOS',function(r){
        conteudo(r,'#conteudo');
        $(".novo-cad").click(function(){editar();});
        $(".contatos-categorias").click(categorias);
        busca.init();
        $(".header-contatos").scrollwatchmd();
        filtros = criarFiltros();
        carregar();
        $("#imprimir_contatos").click(function(){
            window.print();
        })
    });
}
    
var carregar = fn.carregar = function(){
    
    display_loading_gif_ajax("#conteudo_contatos");
    Ajax("CONTATOS",JSON.stringify(busca.get()),function(r){
        conteudo(r,"#conteudo_contatos",function(){
            
            filtros.update();
            
            actionsmd();
            
            $('#conteudo_contatos td.detailed i').detailedmd({
                'p0' : 'CADASTROS' , 'p1' : 'contatos' , 'p2' : 'DETAILED'
            });

            $("#conteudo_contatos .botao_editar").click(function(){
                editar( $(this).closest('tr').attr("cod") );
            });

            $("#conteudo_contatos .botao_excluir").click(function(){
                excluir( $(this).closest('tr').attr("cod"),null,$(this).hasClass('auth') );
            });

        });
    });
}

function criarFiltros(){
    
    var _save = function(){
        MD.C.set("Contatos.filters.activeFilters",this.encode(),function(){
            jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
        });
    },
    _update = function(){
        var eaf = this.encode();
        /*Salvando em sessao*/
        MD.C.setv("Contatos.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
    };
    
    return new TableFilter('.table-contatos',{
        activeFilters : MD.C.getv('Contatos.filters.activeFilters') || MD.C.get('Contatos.filters.activeFilters'),
        visible : MD.C.get('Contatos.filters.opened'),
        events : {
            show : function(){MD.C.set('Contatos.filters.opened',true)},
            hide : function(){MD.C.set('Contatos.filters.opened',false)},
            save : _save,
            update : _update,
            restore : function(){  this.loadFilters( MD.C.get('Contatos.filters.activeFilters') ); }
        }
    });
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
        if(validar_contato()==false){
            alert("Preencha corretamente os campos marcados.");
            return(false);
        }
        /*Dados Pessoais*/
        var tipo       = $("input[name='tipo_contato']:checked").val().trim();
        var tipo2      = $("#tipo_contato").val().trim();
        var categoria  = $("#categoria-novo-contato").val().trim();
        var nascimento = $("#nascimento").val().trim().replaceAll(" / ","/").formatDateMySql();
        var fantasia   = $("#nome_fantasia").val().trim();
        var nome       = $("#nome").val().trim();
        var cpf        = $(".cpf:visible").val().trim();
        var rg         = $("#rg").val().trim();
        var sexo       = $("#sexo").val().trim();
        
        var inscMun    = $("#insc-mun").val().trim();
        var inscEst    = $("#insc-est").val().trim();
        
        /*Contato*/
        var email = $("#email").val().trim();
        var tel1  = $("#tel1").val().trim();
        var tel2  = $("#tel2").val().trim();
        var tel3  = $("#tel3").val().trim();

        /*Endereco*/
        var endereco    = $("#endereco").val().trim();
        var complemento = $("#complemento").val().trim();
        var numero      = $("#numero").val().trim();
        var bairro      = $("#bairro").val().trim();
        var cidade      = $("#cidade").val().trim();
        var uf          = $("#uf").val().trim();
        var cep         = $("#cep").val().trim();

        /*Observacoes*/
        var observacoes = $("#observacoes").val().trim();

        var contato = {
            codigo : codigo,
            /*Pessoais*/
            tipo        : tipo,
            tipo2       : tipo2,
            categoria   : categoria,
            nascimento  : nascimento,
            fantasia    : fantasia,
            nome        : nome,
            cpf         : cpf,
            rg          : rg,
            sexo        : sexo,
            inscMun     : inscMun,
            inscEst     : inscEst,
            /*Contato*/
            email       : email,
            tel1        : tel1,
            tel2        : tel2,
            tel3        : tel3,
            /*Endereco*/
            endereco    : endereco,
            complemento : complemento,
            numero      : numero,
            bairro      : bairro,
            cidade      : cidade,
            uf          : uf,
            cep         : cep,
            /*Observacoes*/
            observacoes : observacoes

        };

        Ajax("EDITAR",JSON.stringify(contato),function(cod){
            d.close();
            if(salvarCb){
                salvarCb({
                    cod : cod,
                    name : nome
                });
            } 
            else pagina();
        });
        
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
        title : (!codigo ? 'Novo' : 'Editar') + " contato",
        showButtons : false,
        scroll : {
            enabled : true,
            o : '.cad-main-ul'
        },
        ajax : function(){
            Ajax('TELA_EDITAR',codigo,function(r){
                d.html(r).showButtons().scroll.init();
                d.center();
                
                var _toggleType = function(){
                   var v =  $("input[name='tipo_contato']:checked").val();
                   $(".fisica").toggle(v == 'FISICA');
                   $(".juridica").toggle(v == 'JURIDICA');
                   d.scroll.update();
                   d.center();
                }
                
                
                $("input[name='tipo_contato']").click(_toggleType);
                _toggleType();
                
                
                $("#show-extra-info").click(function(){
                    $(this).find('i').toggleClass('icon-caret-down icon-caret-up');
                    $(".info-adicional").toggle();
                    d.scroll.update();
                    d.center();
                });

                atribui_evento_data("nascimento");
            //    atribui_evento_data("fundacao");

                atribui_campo_telefone("tel1");
                atribui_campo_telefone("tel2");
                atribui_campo_telefone("tel3");
                atribui_campo_cep("cep");
                atribui_evento_cpf("cpf");
                atribui_evento_cnpj("cnpj");
                
                d.dialog.find('.autocompleteselect').autocompleteselect({
                    addnew : {
                        action : function(appender){
                            editarCategoria(null,null,function(o){
                                appender({
                                    value : o.cod,
                                    label : o.name
                                });
                            });
                        }
                    }
                });

            });
        },
        buttons : buttons
    });
}

var excluir = fn.excluir = function(codigo,categoria,auth){
    
    var d,
    _carregar = function(){
        Ajax('TELA_EXCLUIR',codigo,categoria,function(r){
           d.html(r).showButtons(); 
            $("[name='escolha']").click(function(){
                $("#lista_categoria_exclusao").toggle($(this).val()=="mover");
            });
        });
    }
    
    d = jDialog({
        title : !categoria ? 'Excluir contato' : 'Excluir categoria',
        showButtons : false,
        ajax: _carregar,
        buttons : {
            'Excluir' : function(){

                var radio = $("[name='escolha']:checked");
                var excluir_lancamentos = (!radio[0] || radio.val() == "excluir") ? 1 : 0; 

                var contato_destino = 0;
                if(radio.val() == "mover")
                {
                    contato_destino = $("#lista_categoria_exclusao option:selected").val();
                }

                /*Excluir lancamentos desta categoria*/
                if(excluir_lancamentos){
                    contato_destino = undefined;
                    d.close();
                    confirmar_exclusao_grupo(function(){__excluir_contatos();},auth)
                }else
                    __excluir_contatos();

                function __excluir_contatos()
                {
                    Ajax("EXCLUIR",JSON.stringify({
                        codigo:codigo,
                        categoria:categoria,
                        destino:contato_destino
                    }),function(r){
                        /*Fecha janela do jAjax*/
                        d.close();
                        if(categoria == 1) telaCategorias.ajax();
                        pagina();
                    });
                }
            },
            'Cancelar' : function(){
                d.close();
            }
        }
    });
    
}

var telaCategorias;

var categorias = fn.categorias = function(){
    
    telaCategorias = jDialog({
       title :  "Gerenciar categorias de contato",
       scroll : {
           enabled : true,
            o : '#lista-categorias-contato'
       },
       ajax : function(){
           Ajax('TELA_CATEGORIAS',function(r){
               telaCategorias.html(r).center();
               telaCategorias.scroll.update();
               
               $(".nova-cat").click(function(){
                   editarCategoria();
               });
               telaCategorias.dialog.find(".botao_editar").click(function(){
                    var linha = $(this).closest("tr");
                    var codigo = linha.attr("cod");
                    var nome = linha.find(".nome_categoria").html().trim();
                    editarCategoria(codigo,nome);
               });
               telaCategorias.dialog.find(".botao_excluir").click(function(){
                    var codigo = $(this).closest("tr").attr("cod");
                    excluirCategoria(codigo);
               });
           })
       }
    });
    
//    if(janelaCategorias) janelaCategorias.close();
//    janelaCategorias = jAjax(,"php/contatos/alert_gerenciar_categorias.php");
}

var editarCategoria = fn.editarCategoria = function(codigo,nome,salvarCb){
    
    var 
    nome = nome || "",
    label = !codigo ? "Digite um nome para a nova categoria" : 
                      "Digite um novo nome para a categoria",
    title = !codigo ? "Nova categoria de contato" : "Editar categoria de contato";
        
    
    jPrompt(label, nome, title, function(r){
        if(r){
            if(r.length > 0){
                Ajax("EDITAR_CATEGORIA",JSON.stringify({codigo:codigo,nome:r.trim()}),function(codigo){
                    if(!salvarCb) telaCategorias.ajax();
                    else salvarCb({
                        cod: codigo,
                        name : r.trim()
                    });
                });
            }
            else{
                jAlert("O nome da categoria não pode estar em branco.","Erro nova categoria");
            }
        }
    });
    
}
    
var excluirCategoria = fn.excluirCategoria = function(codigo){
    
       
    var d = jDialog({
        title : "Excluir categoria",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EXCLUIR_CATEGORIA',codigo ,1,function(r){
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
                    categoria_destino = $("#lista_categoria_exclusao option:selected").val();

                /*Optou por remover todos os contatos desta categoria*/
                if(categoria_destino.length ==  0)
                {
                     jConfirm("Este é um processo <b>irreversível</b>!<br/>Todos os contatos"+
                     " associados serão <b>permanentemente</b> removidos!<br/><br/>Deseja continuar ?", 
                     "Aviso", function(r){
                            if(r){
                                excluir(codigo,1);
                                d.close();
                            }
                        }, {
                            ok : "Sim",
                            cancel : "Não"
                        });
                }
                else
                {
                    Ajax("EXCLUIR_CATEGORIA",codigo,categoria_destino,function(r){
                        d.close();
                        pagina();
                        telaCategorias.ajax();
                    });
                }
                
            },
            Cancelar : function(){
                d.close();
            }
        }        
    });
}
    
var busca = (function(){
    var B = function(){},
    fn = B.prototype,
    f, //field
    t, //trigger
    c; //clear
    
    fn.init = function(){
        t = $('.search-trigger');
        c = $('.search-clear');
        f = $('.search-contacts').keyup(function(e){
            var k = e.charCode || e.keyCode || e.which;
            if(k == 13) carregar();
        });
        t.click(carregar)
        c.click(function(){
            f.val("");
            carregar();
        });
    }
    
    fn.get = function(){
        return {
            textSearch : f.val().trim()
        }
    }
    
    return new B;
})();
    
    
})(window,window.MD,jQuery);


///*
// * Carrega e processa servicos iniciais
// * @returns void
// */
//function carregar_contatos()
//{
//    buscar_contatos();
//    iniciar_filtros_contatos();
//}

//var formulario_contato;
//function iniciar_filtros_contatos()
//{
//    formulario_contato = $("#formulario_contato").filtro({
//        text_search : $("#buscar_contatos"),
//        event : {
//            ajax: function(active_filters,highlight){
//                MD.Contatos.carregar(highlight);
//                
//            }
//        }
//    });
//}
//
//function carregar_parametros_filtro()
//{
//    return formulario_contato ? JSON.stringify(formulario_contato.get_active_filters()) : "{}";
//}
//
//function buscar_contatos(highlight)
//{
//    ControladorContatos("CARREGAR_CONTATOS",carregar_parametros_filtro(),function(r){
//        $("#conteudo_contatos").html(r);
//        caixas_detalhamentos_contatos();
//        if(highlight) highlight();
//    });
//}

//function tratar_tela_novo_contato()
//{
//
//}

//function salvar_novo_contato(continuar)
//{
//    if(validar_contato()==false){
//        alert("Preencha corretamente os campos marcados.");
//        return(false);
//    }
//
//
//    /*Dados Pessoais*/
//    var tipo       = $("input[name='tipo_contato']:checked").val().trim();
//    var tipo2      = $("#tipo_contato").val().trim();
//    var categoria  = $("#categoria-novo-contato").val().trim();
//    var nascimento = $("#nascimento").val().trim().replaceAll(" / ","/").formatDateMySql();
//    var fantasia   = $("#nome_fantasia").val().trim();
//    var nome       = $("#nome").val().trim();
//    var cpf        = $(".cpf:visible").val().trim();
//    var rg         = $("#rg").val().trim();
//    var sexo       = $("#sexo").val().trim();
//    
//    /*Contato*/
//    var email = $("#email").val().trim();
//    var tel1  = $("#tel1").val().trim();
//    var tel2  = $("#tel2").val().trim();
//    var tel3  = $("#tel3").val().trim();
//    
//    /*Endereco*/
//    var endereco    = $("#endereco").val().trim();
//    var complemento = $("#complemento").val().trim();
//    var numero      = $("#numero").val().trim();
//    var bairro      = $("#bairro").val().trim();
//    var cidade      = $("#cidade").val().trim();
//    var uf          = $("#uf").val().trim();
//    var cep         = $("#cep").val().trim();
//    
//    /*Observacoes*/
//    var observacoes = $("#observacoes").val().trim();
//    
//    var contato = {
//        /*Pessoais*/
//        tipo        : tipo,
//        tipo2       : tipo2,
//        categoria   : categoria,
//        nascimento  : nascimento,
//        fantasia    : fantasia,
//        nome        : nome,
//        cpf         : cpf,
//        rg          : rg,
//        sexo        : sexo,
//        /*Contato*/
//        email       : email,
//        tel1        : tel1,
//        tel2        : tel2,
//        tel3        : tel3,
//        /*Endereco*/
//        endereco    : endereco,
//        complemento : complemento,
//        numero      : numero,
//        bairro      : bairro,
//        cidade      : cidade,
//        uf          : uf,
//        cep         : cep,
//        /*Observacoes*/
//        observacoes : observacoes
//        
//    };
//    
//    ControladorContatos("SALVAR_NOVO_CONTATO",JSON.stringify(contato),function(r){
//        if(r=="true")
//        {
//            cancelar_jAjax();
//            jAlert("Seu novo contato foi salvo com sucesso.", "Contato salvo com sucesso" ,function(){
//                if(continuar){
//                    pagina_novo_contato();
//                }
//            });
//            MD.Contatos.pagina();
//        }
//        else
//        {
//            cancelar_jAjax();
//            jAlert("Ocorreu um erro ao tentar salvar este contato.", "Erro inesperado" );
//        }
//    });
//}

//function tratar_tela_contatos()
//{
//    $(".editar").click(function(){
//
//        var codigo_contato = $(this).parents("tr").attr("cod");
////        var key  = $(this).parents("tr").attr("uid");
//
//        pagina_edicao_contato(codigo_contato);
//
//    });
//
//    $(".excluir").click(function(){
//         var codigo_contato = $(this).parents("tr").attr("cod");
//         jAjax("Excluir contato", "php/contatos/alert_exclusao_contatos.php", {p1:codigo_contato,p2:0});     
//    });
//
//}

function tratar_tela_editar_contatos(trigger)
{
    var email_antigo = $("#email").val().trim();
    
    var formulario = $("#formulario_novo_contato");
     
    if($("input[name='tipo_contato']:checked").val().trim() == "JURIDICA") mostrar_juridica(); 
     
    $("#radio_pessoa_fisica").click(function(){
        mostrar_fisica();
    });
    $("#radio_pessoa_juridica").click(function(){
        mostrar_juridica();
    });
    
    function mostrar_juridica(){
       $(".fisica").hide();
       $(".juridica").show();
        
    }
    function mostrar_fisica(){
       $(".fisica").show();
       $(".juridica").hide();
        
    }
    var tipo2 = $("#tipo_contato");
    var prev = tipo2.val();
    tipo2.change(function(){
        var possui_agendamentos = $(this).attr("agd");
        if(possui_agendamentos == 1)
        {
            switch($(this).val())
            {
                case "":
                case "FORNECEDOR":
                {
                    jAlert("Foram encontrados agendamentos para este contato.</br>"+
                           "Ele não pode deixar de ser do tipo <b>Cliente</b>.","Agendamentos encontrados");
                       $(this).val(prev);
                }
                break;
                default:prev = $(this).val();
            }
        }
    })
    
    atribui_evento_data("nascimento");
    atribui_campo_telefone("tel1");
    atribui_campo_telefone("tel2");
    atribui_campo_telefone("tel3");
    atribui_campo_cep("cep");
    atribui_evento_cpf("cpf");
    atribui_evento_cnpj("cnpj");

    $("#botao_atualizar_contato").click(function(){

        var codigo_contato = $("#codigo_contato").val();

        atualizar_contato(codigo_contato,email_antigo,trigger);

    });

    $("#botao_cancelar_voltar").click(function(){
        cancelar_jAjax();
        if(trigger) $(window).trigger("edicao_contato");
    });
}

function atualizar_contato(codigo,email_antigo,trigger)
{
     if(validar_contato()==false){
        jAlert("Preencha todos os campos corretamente.","Formulário Contato");
        return(false);
    }

    /*Dados Pessoais*/
    var tipo       = $("input[name='tipo_contato']:checked").val().trim();
    var tipo2      = $("#tipo_contato").val().trim();
    var categoria  = $("#categoria-novo-contato").val().trim();
    var nascimento = $("#nascimento").val().trim().replaceAll(" / ","/").formatDateMySql();
    var fantasia   = $("#nome_fantasia").val().trim();
    var nome       = $("#nome").val().trim();
    var cpf        = $(".cpf:visible").val().trim();
    var rg         = $("#rg").val().trim();
    var sexo       = $("#sexo").val().trim();
        
    var inscMun    = $("#insc-mun").val().trim();
    var inscEst    = $("#insc-est").val().trim();

    /*Contato*/
    var email = $("#email").val().trim();
    var tel1  = $("#tel1").val().trim();
    var tel2  = $("#tel2").val().trim();
    var tel3  = $("#tel3").val().trim();

    /*Endereco*/
    var endereco    = $("#endereco").val().trim();
    var complemento = $("#complemento").val().trim();
    var numero      = $("#numero").val().trim();
    var bairro      = $("#bairro").val().trim();
    var cidade      = $("#cidade").val().trim();
    var uf          = $("#uf").val().trim();
    var cep         = $("#cep").val().trim();
    var atualizar_email = 0;
    
    if(email_antigo.length > 0)
    {
        //Verificando mudanca no email do contato
        if(email != "" && email != email_antigo)
        {
            var r_mail = confirm("Todos os lembretes e notificações destinados a"+
                    " este contato serão atualizados com o novo email "+
                    "informado. Deseja continuar?");
            if(!r_mail) return;
            else atualizar_email = 1;
        }
        else
        {
            if(email=="" && email != email_antigo)
            {
              r_mail = confirm("Todos os lembretes e notificações destinadas a "+
                       "este contato serão excluídos. Deseja continuar?");
                   
                if(!r_mail) return;
                else atualizar_email = 1;
            }
        }
    }

    /*Observacoes*/
    var observacoes = $("#observacoes").val().trim();

    var contato = {
        /*Pessoais*/
        codigo      : codigo,
        tipo        : tipo,
        tipo2       : tipo2,
        categoria   : categoria,
        nascimento  : nascimento,
        fantasia    : fantasia,
        nome        : nome,
        cpf         : cpf,
        rg          : rg,
        sexo        : sexo,
        inscMun     : inscMun,
        inscEst     : inscEst,
        /*Contato*/
        email       : email,
        tel1        : tel1,
        tel2        : tel2,
        tel3        : tel3,
        /*Endereco*/
        endereco    : endereco,
        complemento : complemento,
        numero      : numero,
        bairro      : bairro,
        cidade      : cidade,
        uf          : uf,
        cep         : cep,
        /*Observacoes*/
        observacoes : observacoes,
        /*Atualizacao de email*/
        atualizar_email : atualizar_email
    };



    ControladorContatos("ATUALIZAR_CONTATO",JSON.stringify(contato),function(r){
        if(r=="true")
        {
            if(trigger){
                cancelar_jAjax();
                $(window).trigger("edicao_contato");
            }
            else{
                cancelar_jAjax();
                MD.Contatos.pagina();
            }
        }
        else
        {
            jAlert("Ocorreu um erro ao tentar salvar este contato.", "Falha" );
        }
    });
}

function validar_contato(){

    var tipo       = $("input[name='tipo_contato']:checked");
//    var tipo2      = $("#tipo_contato");
//    var categoria  = $("#categorias");
    var nascimento = $(".nascimento:visible");
    var fantasia   = $("#nome_fantasia");
    var nome       = $(".nome:visible");
    var cpf        = $("#cpf");
    var cnpj       = $("#cnpj");
    var rg         = $("#rg");
//    var sexo       = $("#sexo");

    /*Contato*/
    var email = $("#email");
    var tel1  = $("#tel1");
    var tel2  = $("#tel2");

    /*Endereco*/
//    var endereco = $("#endereco");
    var numero   = $("#numero");
//    var bairro   = $("#bairro");
//    var cidade   = $("#cidade");
//    var uf       = $("#uf");
    var cep      = $("#cep");


    var erro    = false;
    var retorno = true;


    if(tipo.val()=="FISICA"){
       
        retorno = cpf.validate({
            msg : "Número de CPF inválido",
            func:function(input){
                return(valida_campo_cpf_cnpj(input.val()));
            }
        });
        erro = retorno == false ? true : erro;
    }
    else{
         retorno = cnpj.validate({
             msg : "Número de CNPJ inválido",
             func:function(input){
                 return(valida_campo_cpf_cnpj(input.val()));
             }
         });
         erro = retorno == false ? true : erro;

    }

    retorno = nome.validate({
        msg : "Este campo não pode ficar em branco",
        func : function(input){
            return(valida_campo_vazio(input));
        }
    });
    erro = retorno == false ? true : erro;

    retorno = email.validate({
        msg : "Email inválido",
        func:function(input){
            return(valida_campo_email(input.val()));
        }
    });
    erro = retorno == false ? true : erro;

//    retorno = rg.validate({func:function(input){return(fun_isNumeric(input.val()));}});
//    erro = retorno == false ? true : erro;

//    retorno = numero.validate({func:function(input){return(fun_isNumeric(input.val()));}});
//    erro = retorno == false ? true : erro;
    
    retorno = nascimento.validate({
        msg : "Data inválida",
        func:function(input){
            return((input.val().length == 0) ||  fun_validaData(input.val().replaceAll(" / ","/")));
        }
    });
    erro = retorno == false ? true : erro;
    
    if(erro){
        return(false);
    }
    else{
        return(true);
    }

}

function valida_campo_vazio(objeto){
    
    if(objeto.val().length==0){
        return(false);
    }
    else{
        return(true);
    }

}

function atribui_evento_data(id_campo_data)
{
   var campo = $("#"+id_campo_data);
   campo.calendario({yearRange : "1900:",maxDate : new Date()});
   if(campo.val().trim().length > 0) campo.current_date_format();
}

function atribui_campo_telefone(id_campo_telefone)
{
//    $("#"+id_campo_telefone).mask("(99) 9999 - 9999",{placeholder:" "});
        
}

function valida_campo_cpf_cnpj(valor){

  if(valor.length >0){
       return(isCpfCnpj(valor));
  }
  else{
      return(true);
  }
 
}

function valida_campo_email(valor){

    if(valor.length>0){
        return(fun_validaEmail(valor));
    }
    else{
        return(true);
    }
}

function valida_campo_data(valor)
{
    return fun_validaData(valor);
}

function atribui_campo_cep(id_campo_cep)
{
    $("#"+id_campo_cep)
        .mask("99999 - 999",{placeholder:" "})
        .change(function(){

             if($(this).val() == ""){
                $(this).val("00000 - 000");
             }

        });
}

//function caixas_detalhamentos_contatos()
//{
//    $(".detailed").each(function(){       
//        var contato = $(this).parent();
//        
//        /*Dados Pessoais*/
//        var tipo       = contato.attr("tipo");
//        var tipo2      = contato.attr("tipo2");
//        var categoria  = contato.attr("categoria");
//        var nascimento = contato.attr("nascimento");
//        var fantasia   = contato.attr("fantasia");
//        var nome       = contato.attr("nome").trim();
//        var cpf        = contato.attr("cpf");
//        var cnpj       = contato.attr("cnpj");
//        var rg         = contato.attr("rg");
//        var sexo       = contato.attr("sexo");
//
//        /*Contato*/
//        var email = contato.attr("email");
//        var tel1  = contato.attr("tel1");
//        var tel2  = contato.attr("tel2");
//        var tel3  = contato.attr("tel3");
//
//        /*Endereco*/
//        var endereco    = contato.attr("endereco");
//        var complemento = contato.attr("complemento");
//        var numero      = contato.attr("numero");
//        var bairro      = contato.attr("bairro");
//        var cidade      = contato.attr("cidade");
//        var uf          = contato.attr("uf");
//        var cep         = contato.attr("cep");
//        
//        var observacoes      = contato.attr("observacoes");
//        
//        var fisica = tipo == "FISICA";
//        
//        var table  = "<table class='detailed_table'>";
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Tipo pessoa";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += tipo == "FISICA" ? "Física" : "Jurídica";
//                    table += "</td>";
//                table += "</tr>";
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Tipo contato";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += tipo2 ? tipo2.firstToUpper() : "-";
//                    table += "</td>";
//                table += "</tr>";
//                
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Categoria";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += categoria ? categoria : "-";
//                    table += "</td>";
//                table += "</tr>";
//                
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += fisica ? "Nascimento" : "Fundação";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += nascimento ? nascimento.format_date_br() : "-";
//                    table += "</td>";
//                table += "</tr>";
//            
//            if(fisica){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "CPF";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table +=  cpf ? cpf : "-";
//                    table += "</td>";
//                table += "</tr>";
//            }else{
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "CNPJ";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += cnpj ? cnpj : "-";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(fisica){
//                table += "<tr>";
//
//                    table += "<td  class='detailed_label'>";
//                        table += "RG";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += rg ? rg : "-";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(!fisica){
//                table += "<tr>";
//
//                    table += "<td  class='detailed_label'>";
//                        table += "Nome fantasia";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += fantasia ? fantasia : "-";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(fisica){
//                table += "<tr>";
//
//                    table += "<td  class='detailed_label'>";
//                        table += "Sexo";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += sexo ? (sexo == "M" ? "Masculino" : "Feminino") : "-";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "Telefones";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    if(!tel1 && !tel2 && !tel3) table += "-";
//                    if(tel1) table += tel1;
//                    if(tel1 && (tel2 || tel3) ) table += " / ";
//                    if(tel2) table += tel2;
//                    if(tel2 && tel3) table += " / ";
//                    if(tel3) table += tel3;
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//
//                table += "<td  class='detailed_label'>";
//                    table += "Email";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += email ? email : "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "Endereço";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += endereco ? endereco : "-";
//                table += "</td>";
//            table += "</tr>";
//
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "Número";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += numero ? numero : "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "Complemento";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += complemento ? complemento: "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "Bairro";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += bairro ? bairro : "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//
//                table += "<td  class='detailed_label'>";
//                    table += "Cidade";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += cidade ? cidade : "-";
//                table += "</td>";
//            table += "</tr>";
//               
//           table += "<tr>";
//
//                table += "<td  class='detailed_label'>";
//                    table += "UF";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += uf ? uf : "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//                table += "<td  class='detailed_label'>";
//                    table += "CEP";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += cep ? cep : "-";
//                table += "</td>";
//            table += "</tr>";
//            
//            table += "<tr>";
//
//                table += "<td  class='detailed_label'>";
//                    table += "Observações";
//                table += "</td>";
//                table += "<td  class='detailed_data'>";
//                    table += observacoes ? observacoes : "-";
//                table += "</td>";
//            table += "</tr>";
//
//        table += "</table>";
//        
//        $(this).preview({
//            text : table,
//            title : nome
//        });
//
//    });
//}

function atribui_evento_cpf(id_campo_cpf)
{
    $("#"+id_campo_cpf).mask("999.999.999-99",{placeholder:" "});

}

function atribui_evento_cnpj(id_campo_cpnj)
{
    $("#"+id_campo_cpnj).mask("99.999.999/9999-99",{placeholder:" "});

}


///**
// * Abre tela de edicao de contato a partir da tela de novo lancamento
// * @param codigo Codigo do contato criado.
// * @param trigger Funcao callback que sera executada quando botao de ok/cancelar
// * for clicado na tela de edicao.
// */
//function editar_contato_novo_lancamento(codigo,trigger)
//{
//    jAjax("Editar contato","php/contatos/alert_editar_contato.php",{
//        p1 : codigo
//    });
//    $(window).one("edicao_contato",function(){
//        trigger();
//    });
//}
//
//function pagina_edicao_contato(codigo)
//{    
//    jAjax("Editar contato","php/contatos/alert_editar_contato.php",{
//        p1 : codigo,
//        p2 : 1 /*Deixar no minimo um campo alem de 'p1' para operacoes de autocomplete*/
//    });
//}
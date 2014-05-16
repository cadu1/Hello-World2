(function(window,MD,$){
    
var Configuracoes = function(){},
fn = Configuracoes.prototype;
MD.Configuracoes = new Configuracoes;

var alteracao = false;

var iniciar = fn.iniciar = function(index){
    
    alteracao = false;
    
    var d = jDialog({
        title : 'Configurações',
        buttons : { 
            'Concluir' : function(){ 
                if(alteracao) MD.Inicializar.hashes.reloadCurrentHash();
                d.close(); 
            } 
        },
        draggable : false,
        ajax : function(){
            ControladorConfiguracoes('INICIAR',function(r){
                d.html(r);
                $("#tela-configuracoes").tabs({
                    active: index || 0,
                    activate : function(){
                        d.center();
                    }
                });
                d.center();
                eventosTela();
            });
        }
    });

}

function eventosTela(){
    
    qtitle();

    $("input[type='text'].numeric").numeric();
    /*Caso o clique seja num campo de texto, nao executa acao do botao de edicao*/
    $(".display-data input[type='text']").click(function(e){
        e.stopImmediatePropagation();
    });
    
    
    $(".container-config-title").click(function(){
       var content = $(this).siblings(".container-config-content");
       var pai = $(this).parent();
       if(content.is(":visible")){
           content.slideUp(400);
           pai.removeClass("opened");
       }else{
           content.slideDown(400);
           pai.addClass("opened");
       }
    });
    
    $(".edit").click(function(e){
        
        alteracao = true;
        
        e.stopPropagation();
        
        var b = $(this);
        
        if(b.hasClass("habilitar")){
            toggle_funcionalidade_configuracoes.call(this,false);
        }else if(b.hasClass("desabilitar")){
            toggle_funcionalidade_configuracoes.call(this,true);
        }else if(b.hasClass("ajax")){
            carregar_configuracoes_pessoais.call(this);
        }else if(b.hasClass("salvar")){
            atualizar_info_campo_configuracoes.call(this);
        }
    });
    
    
    $(".display-data").click(function(){
        $(this).find(".edit:visible").click();
    });
    
    
    $(".detalhesnotificacoes").click(function(){
        var 
        id = $(this).closest('tr').attr('cod'),
        d = new jDialog({
           title : "Detalhes notificação",
           ajax : function(){
               Ajax('DETALHES_NOTIFICACAO',id,function(r){
                   d.html(r).center();
               })
           },
           buttons : {
               'Fechar' : function(){d.close();}
           }
        });
    });
    
    $('.indicacoes-detalhar').click(function(){
        var 
        tipo = $(this).data('tipo'),
        d = new jDialog({
            title : 'Detalhes',
            ajax : function(r){
                Ajax('DETALHES_INDICACOES',tipo,function(r){
                    d.html(r).center();
                })
            },
            buttons : {
                'Fechar' : function(){d.close();}
            }
        });
    })
}


var Ajax = fn.Ajax = function(){
    return ControladorConfiguracoes.apply(this,Array.prototype.slice.call(arguments));
}

/*Configuracoes*/
$(function(){
    $("#configuracoes").click(iniciar);
});

})(window,window.MD,jQuery);

function carregar_configuracoes(cb)
{
    /*Desmarca todos os links do cabecalho*/
    marcar_link_cabecalho();
            
    ControladorConfiguracoes("TELA_CONFIGURACOES",function(r){
        $("#conteudo").html(r);
        
        criar_eventos_tela_configuracoes();
        
        if(cb) cb(); /*Utilizado para completar o cadastro no primeiro acesso de um usuario antigo*/
        
    });
}

function criar_eventos_tela_configuracoes()
{
    
}

function toggle_funcionalidade_configuracoes(habilitar)
{
    var botao = $(this);
    var operacao = botao.closest("li").attr("cod");
    
    
    switch(operacao)
    {
        case "contatos"  :operacao = "ALTERAR_STATUS_CONTATOS";break;
        case "centros"   :operacao = "ALTERAR_STATUS_CENTROS";break;
        case "formaspgto":operacao = "ALTERAR_STATUS_FORMASPGTO";break;
        case "projetos":operacao = "ALTERAR_STATUS_PROJETOS";break;
        case "ndocumento":operacao = "ALTERAR_STATUS_NDOCUMENTO";break;
        case "observacao":operacao = "ALTERAR_STATUS_OBSERVACAO";break;
        case "categorias":operacao = "ALTERAR_STATUS_SUBCATEGORIAS";break;
        case "regras"    :operacao = "ALTERAR_STATUS_REGRAS";break;
        case "linhashorizontais"  :operacao = "ALTERAR_STATUS_LINHASHORIZONTAIS";break;
        case "googledrive"        : {
            operacao = "ALTERAR_STATUS_COMPROVANTES";
            if(habilitar){
                ControladorConfiguracoes(operacao,0,function(r){ _toggle(true);});
            }else{
                var d = jDialog({
                    title : 'Termos de uso da utilização da integração com o Google Drive',
                    closeText : 'Fechar',
                    showButtons : false,
                    buttons : {
                        'Aceitar' : function(){
                            ControladorConfiguracoes(operacao,1,function(r){ 
                                _toggle(false);
                                d.close();
                            });
                        },
                        'Não aceitar' : function(){
                            d.close();
                        }
                    },
                    ajax : function(){

                        ControladorConfiguracoes.call(this,'TERMOS_USO_GOOGLE_DRIVE',function(r){
                            /*Exibe na tela*/
                            $(this).html(r);
                            d.showButtons();
                        });
                    }
                });
            }
        }break;
        case "senhadelecao"        :{
            operacao = "ALTERAR_STATUS_SENHA_DELECAO";
            if(!habilitar){
                ControladorConfiguracoes(operacao,1,function(r){ _toggle(false);});
            }else{
                popup_confirmacao_senha(function(){
                    ControladorConfiguracoes(operacao,0,function(r){ 
                        _toggle(true);
                    });
                });
            }
        }break;
        
    }
    
    if(operacao != 'ALTERAR_STATUS_COMPROVANTES' && operacao != 'ALTERAR_STATUS_SENHA_DELECAO'){
        ControladorConfiguracoes(operacao,!habilitar ? 1 : 0,function(r){ _toggle(habilitar);});
    }
    
    function _toggle(habilitar){
        if(!habilitar){
            botao.parent().find(".desabilitar").show();
            botao.parent().find(".habilitar").hide();
        }else{
            botao.parent().find(".desabilitar").hide();
            botao.parent().find(".habilitar").show();
        }
    }
}

function carregar_configuracoes_pessoais()
{
    var pai = $(this).closest("li"); 
    var preview = pai.children(".display-data");
    var c;

    var id = pai.attr("cod");
    
    cancelar_edicao_form_configuracoes();
    
    ControladorConfiguracoes("CARREGAR_FORMULARIO_ALTERACAO_CONFIGURACOES",id,function(r){
        c  = $("<div class='conteudo-form'>" + r + "</div>");
        pai.append(c);
        c.show();
        preview.hide();
        $("#botao_cancelar_update_config").click(function(){
            cancelar_edicao_form_configuracoes();
        });
    });

    function cancelar_edicao_form_configuracoes()
    {
        /*Esconde formulario aberto e depois remove*/
        var c = $(".conteudo-form");
        c.siblings(".display-data").show();
        c.remove();
    }

}

function atualizar_info_campo_configuracoes(){
    
    var botao = $(this),
        pai = botao.closest('li'),
        operacao = pai.attr("id"),
        campo = pai.find('.data input[type="text"]');
    
    /*Nao vai no banco atoa*/
    var v = campo.val().trim();
    if( v == campo.attr('base')) return;

    switch(operacao)
    {
        case "dtinicio" :
            
            operacao = "ALTERAR_DATAINICIO_MES";
            
            v = parseFloat(v);
    
            if( v <= 0 || v > 28){
                jAlert('O dia deve estar entre 1 e 28.', 'Dia inválido');
                return;
            }
            
        break;
    }
    
    
    ControladorConfiguracoes(operacao,v,function(r){
        /*Tratamento do dia no servidor*/
        if(r == '0') jAlert('O dia deve estar entre 1 e 28.', 'Dia inválido');
        else{ 
            jAlert('Alteração realizada com sucesso.','Sucesso');
            campo.attr('base',v);
        }
    });
}

function acao_botao_salvar_formulario_configuracoes(fn){
    $("#botao_salvar_update_config").click(function(){
        fn();
    })
}

function salvar_configuracoes_usuario(p0,usuario,fn)
{
    ControladorConfiguracoes(p0,JSON.stringify(usuario),function(r){
        if(typeof(fn) == "function") fn(r);
    });
}

function alerta_tipo_pessoa_nao_setado()
{
    jAjax("Definição do perfil de utilização","php/configuracoes/alert_setar_tipo_pessoa.php");
}

function tratar_tela_setar_tipo_usuario()
{
    $("#popup_close").remove();
    
    var b = $("#popup_ok").click(function(){
       if(!$(this).isDisabledButton()){
           
           var tipo = $("input[name='radio-tipo-pessoa']:checked")[0] ? $("input[name='radio-tipo-pessoa']:checked").val() : "";
           ControladorConfiguracoes("ATUALIZAR_TIPO_PESSOA",tipo,function(){
               cancelar_jAjax();
               jConfirm("Deseja completar seu cadastro agora?","Completar cadastro",function(r){
                   if(r){
                       carregar_configuracoes(function(){
                           $("#completar-cadastro").click();
                       });
                   }
               },{
                   ok : "Sim",
                   cancel : "Não"
               });
           })
           
       }
    });
    
    $("input[name='radio-tipo-pessoa']").click(function(){
        b.enableButton();
    });
}

function alert_aviso_vencimento(vencimento)
{
    jConfirm("Seu período de utilização da versão Premium expirou dia "+ vencimento+ "."+ 
                "<br>Sua conta foi automaticamente convertida"+
            " para a versão básica.<br/><br/> Deseja fazer o pagamento e continuar"+
            " tendo todos os benefícios da versão Premium?",
            "Versão Premium expirada",
            function(r){
                var aplicativo = "MEUDINHEIRO";
                var status     = "0";
                ControladorEasyme("ATUALIZAR_AVISO_VENCIMENTO",aplicativo,status,function(){
                    if(r)
                    {
                        pagina_pagamento_meudinheiro();
                    }   
                });

    },{ok:"Sim",cancel:"Agora não"});
}

function alert_primeira_utilizacao_incorporativa()
{
    jAjax("Bem vindo, usuário Incorporativa","php/alert_aviso_premium.php",{p1:1});
}

function alert_primeira_utilizacao_demo()
{
    var d = new jDialog({
        title : 'Bem vindo ao Meu Dinheiro',
        showButtons : false,
        ajax : function(){
            $.post('php/alert_aviso_primeira_utilizacao_demo.php',function(r){
                d.html(r).showButtons();
                
                $("#irpbasica").click(function(){
                    jConfirm("Você deseja realmente mudar para a versão básica?","Mudar para versão básica",function(r){
                        if(r){
                            ControladorMeuDinheiro('RETORNAR_VERSAO_BASICA',function(){
                                location.href = '.';
                            });
                        }
                    },{
                        ok : 'Confirmar'
                    })
                })
                
                $("#precos-planos-tip").qtip({
                        content: {
                        text : "<table>"+
                                    "<tr>" +
                                        "<td style='text-align:right;'>Plano Anual = </td>" +
                                        "<td> R$ 57,60 <b>(R$ 4,80/mês)</b></td>" +
                                    "</tr>" +
                                    "<tr>" +
                                        "<td style='text-align:right;'>Plano Semestral = </td>" +
                                        "<td> R$ 38,40 (R$ 6,40/mês)</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                        "<td style='text-align:right;'>Plano Trimestral = </td>" +
                                        "<td> R$ 24,00 (R$8,00/mês)</td>" +
                                    "</tr>" +
                                "</table>",
                        title:{
                            text: "<b>Planos disponíveis</b>"
                        }
                    },
                    position: {
                        my : "top center",
                        at : "bottom center"
                    },
                    style: {
                     classes: 'qtip-dark'
                    },
                    show : {
                        solo: true
                    },
                    hide: {
                        fixed: true
                    }
                }); 
            })
        },
        buttons : { 'Continuar' : function(){d.close();} }
    });
}

//function layout_lateral(){
//    return true;
//}

function telaBuscaVisivel()
{
    return !!$("#busca-header")[0];
}

function tela_escolha_modo()
{
    location.href = "versoes";
}

function pagina_pagamento_meudinheiro()
{
    location.href = "versoes#precos";
}

function erro_funcionalidade_premium()
{
    jConfirm("O seu período de utilização da versão Premium expirou.<br/>"+
             "\nDeseja fazer o pagamento para ter acesso a esta e outras funcionalidades?",
            "Versão Premium expirada",function(r){
                if(r){
                    pagina_pagamento_meudinheiro();
                }
            },{
                ok : "Sim",
                cancel : "Agora não"
            });
}


function confirmar_exclusao_grupo(excluir,auth)
{
    jConfirm("Este é um processo <b>irreversível</b>!<br/>Todos os lançamentos"+
             " associados serão <b>permanentemente</b> removidos!<br/><br/>Deseja continuar ?", 
             "Aviso", function(r){
                if(r){
                    if(auth){
                        popup_confirmacao_senha(excluir);
                    }else{
                        excluir();
                    }
                }
    }, {
        ok : "Sim",
        cancel : "Não"
    });
}

function popup_confirmacao_senha(cb){
    
    var d = new jDialog({
        title : "Confirmação de senha",
        html : "Confirme a sua senha para prosseguir com a operação<input type='password' style='width:290px;margin-top:2px;display:block;'>",
        buttons : {
            Confirmar : function(){
                var senha = d.dialog.find('input').val();
                ControladorEasyme('VERIFICAR_SENHA',senha,function(r){
                    if(r == '1'){
                        d.close();
                        cb();
                    }else{
                        jAlert('A senha informada está incorreta.','Senha incorreta');
                    }
                });    
            },
            Cancelar : function(){d.close();}
        }
    });
}


function preparaExibicao(cabecalho,keep)
{
    marcar_link_cabecalho(cabecalho ? cabecalho : null);
    if(!keep) display_loading_gif_ajax( "#conteudo" );
}


function marcar_link_cabecalho(id)
{
    $("#main-menu .active").removeClass("active");
    $("#main-menu .opened").removeClass("opened");
    $(".extra").html("");
    
//    if(!vertical()){
//        $(".sublist").hide();
//    }
    /*Desmarca todos para funcionalidades internas */
    if(id){
        id = "#"+id;
        if($(id).hasClass('sub')){
            $(id).closest('li.dropdown').addClass("active");
            $(id).closest('li.dropdown-submenu').find('.donone').addClass("opened");
            $(id).addClass('opened');
        }else{
            $(id).parent().addClass("active");
        }
//        
//        if($(id).hasClass("sub")){
//            $(id).closest(".super-list").addClass("active").children(".link-main-menu").addClass("active");
//        }
    } 
}

function display_loading_gif_ajax(dest)
{
    
    var c = "<div style='float=left; text-align:center;padding: 20px 0;'><img src='visao/img/load.gif' /></div>";
    $(dest).html(c);
}

/**
 * Exibe um esconde um conteudo numa div do sistema
 */
function conteudo(conteudo,destino,cb){
    /*O padrao eh exibir*/
    var exibir = !!conteudo;
    //Destino padrao eh a div de conteudo
    destino = destino || "#conteudo";
    
    if(exibir){
        $(destino).hide().html(conteudo);//.show();
        qtitle();
        $(destino).fadeIn(function(){ 
            MD.RP.check(destino == "#conteudo");
            cb && cb(); 
        });
    }else{
        $(destino).html('Carregando..').show();
        $(destino).fadeOut(function(){ cb && cb(); });
    }
    
}

//
//function tratar_ajuda_easyme()
//{
//    var ajuda = $("#ajuda_easyme");
//
//    ajuda.qtip({
//        content: {
//            text : "Para habilitar/desabilitar a ajuda, clique neste link.<BR><BR>Quando a ajuda estiver habilitada, clique nos ícones <img src='visao/img/help-icon-white-bg.png'/> para exibi-la.",
//            title:{
//                text: "Como utilizar a ajuda Easyme"
//            }
//        },
//        position: {
//            my : "top right",
//            at : "bottom center"
//        },
//        style: {
//            classes: 'ui-tooltip-rounded'
//        },
//        show : {
//            solo: true
//        }
//    });
//    
//    ajuda.click(function(){
//        var status = $(this).hasClass("enabled");
//        ControladorConfiguracoes("HABILITAR_AJUDA",status ? 0 : 1,function(r){
//            var tt = $(".tooltip");
//            if(status){
//                tt.attr({"visible":0,src:"visao/img/blank.png"}).addClass("disabled");
//                ajuda.removeClass("enabled");
//             }else{
//                tt.attr({"visible":1,src:"visao/img/help-icon-white-bg.png"}).removeClass("disabled");
//                ajuda.addClass("enabled");
//             }
//        });
//    });
//}

/**
 * Cria evento para o select de mudanca de regime
 * @param cb Callback para ser executada apos mudanca do regime [opcional]
 * @param bf Callback para ser executada antes da mudanca do regime [opcional]
 */
function escolha_regime_utilizacao(cb,bf){
     $("#select_regime").unbind('change').change(function(){
   
        if(bf) bf();
        ControladorConfiguracoes('ALTERAR_REGIME',$(this).val(),function(){
            if(cb) cb();
        });
    });
}



$.extend($.fn,{ 
    /* Verifica se este campo de data eh valido
     * @param data_minima String em formato yyyy-mm-dd (opcional)
     * @param data_maxima String em formato yyyy-mm-dd (opcional)
     **/
    valida_data_sistema : function(data_minima,data_maxima)
    {
        var data = $(this).val().replaceAll(" / ", "/").formatDateMySql();

        var min = (data_minima) ? (datecmp(data_minima,data) <= 0)  : true;
        var max = (data_maxima) ? (datecmp(data_maxima,data) >= 0)  : true;
        var valida = fun_validaData(data.format_date_br());

        if(!valida)
        {
            alert("Data inválida!");
        }
        else
        {
            if(!max) alert("A data informada deve ser menor ou igual a: " + data_maxima.format_date_br() + ".");
            if(!min) alert("A data informada deve ser maior ou igual a: " + data_minima.format_date_br() + ".");
        }
        
        
        return  valida && min && max;
    },
    valida_campo_valor : function(allow_zero)
    {
        var valor = $(this).val();

        var zero = !allow_zero || allow_zero == undefined ? valor ==  "R$ 0,00" : false;

        return( zero || valor == "R$ 0,0" || valor == "R$ 0," ||
                valor == "R$ 0"    || valor == "R$ "    || valor == "R$"    ||
                valor == "R" || valor == "") ? false : true;
    },
    calendario : function(o)
    {
        var defaults =
        {
            minDate   : null,
            maxDate   : null,
            yearRange : "c-1:c+2",
            onClose   : function() {return true;},
            onSelect  : null
        };

        o = $.extend(defaults, o);
        
        return this.each(function()
        {
            return $(this).datepicker("destroy").datepicker(
            {
                minDate  : o.minDate,
                maxDate  : o.maxDate,
                onClose  : o.onClose,
                yearRange: o.yearRange,
                onSelect : o.onSelect
            });
        });
    },
    scrollwatchmd : function(){
        return this.each(function(){
            $(this).scrollwatch({
                offset : function(){
                    return $(this).offset().top - $('.navbar').height();
                },
                on : function(){
                    var w = $("#conteudo").width(),
                    /*20 a mais de altura para compensar o padding do #center-panel e
                     *o padding do .header*/
                    h = $(this).outerHeight();
                    var clear = $('<div class="clearfix"></div>').height(h);
                    $(this).siblings('.clearfix').remove();
                    $(this).after(clear);
                    $(this).addClass('fixed').css('width',w -20 );
                },
                off : function(){
                    $(this).siblings('.clearfix').remove();
                    $(this).removeClass('fixed').css('width','auto');
                }
            });
        })
    },
    detailedmd : function(dest,position){
        return this.each(function(){
            /*Codigo do lancamento,cadastro..*/
            var codigo = $(this).closest('tr').attr('cod'),
            virtual = $(this).closest('tr').attr('virtual'),
            cartao = $(this).closest('tr').attr('cartao') ? 1 : 0,
            grupo = $(this).closest('tr').attr('grupo') || 0,
            data = $.extend(dest,{codigo :codigo, virtual: virtual, cartao: cartao, grupo: grupo});
            
            $(this).qtip({
                content: {
                    text : "<img src='visao/img/load.gif' width='25'>",
                    title:{
                        text: null
                    },
                    ajax : {
                        url : 'visao/php/meudinheiro/Ajax.php',
                        type : 'POST',
                        data : data,
                        success : function(data,status){
                            this.set('content.text', data);
                        }
                    }
                },
                position: position || {
                    my : "left center",
                    at : "center right"
                },
                style: {
                    classes: 'qtip-light'
                },
                show : {
                    solo: true
                },
                hide : {
                    fixed : true
                }
            });
        });
    },
    corSaldo : function(saldo){
        return this.each(function(){
            saldo = parseFloat(saldo);
            saldo = saldo < 0 ? 'saldo_negativo' : saldo > 0 ? 'saldo_positivo' : 'saldo_zerado';
            $(this).removeClass('saldo_negativo saldo_positivo saldo_zerado').addClass(saldo);
        })
    },
    qtitle : function(){
        return this.each(function(){
            var my = $(this).attr('qtitle-data-my') || 'left center',
            at = $(this).attr('qtitle-data-at') || 'right center',
            showEvent = $(this).attr('qtitle-data-toggle') || 'mouseenter'
            $(this).qtip({
                position : {
                    my : my, at : at
                },
                style: {
                    classes: 'qtip-dark'
                },
                show :{
                    solo : true,
                    event : showEvent
                },
                hide : {
                    event : showEvent == 'focus' ? 'blur' : 'mouseleave'
                }
            });
        })
    }
});

function actionsmd(show){
    
    var style = {
        tip: { corner: false },
        classes: 'qtip-light qtip-actions-menu'
    };
        
    $(".col-actions .actions-menu").closest('tr').children('td:not(.checkbox-lanc,.detailed,.col-status,.col-actions)').on('contextmenu',function(e){
        /*Default context menu*/
        e.preventDefault();
        
        var tr = $(this).closest('tr'),
        originalContent = $(tr).find(".col-actions > .actions-menu"),
        content = originalContent.clone(true,true),
        container = $(this);
        
        $(tr).closest('tr').qtip({
            content : {
                text: content
            },
            overwrite: true,
            position : {
                container : container,
                target : (function(){
                    
                    var x = e.pageX || e.screenX,
                    y =  e.pageY || e.screenY,
                    h = originalContent.height();
                    /*Descontando altura da caixa para exibir o menu para cima*/
                    if(h + y > $(window).height()) y -= h;
                    
                    return [x,y];
                })()
            },
            show: {
                solo : true,
                event: false,
                ready: true
            },
            hide : {
                event : 'click',
                fixed : true,
                target : $('body')
            },
            style: style
        });
        
        
    });
    
    $(".col-actions .action-begin").each(function(){
        var that = this;
        var originalContent = $(this).siblings(".actions-menu");
        
        var canShow = true;
        
        var api = $(this).qtip({
            content : {
                text: function(){
                    return $(this).siblings('.actions-menu').clone(true,true).click(function(e){
                        canShow = false;
                        api.set('hide.delay',0).hide().set('hide.delay',300);
                        
                    });
                }
            },
            position : {
                container : $(that),
                /*O padrao eh exibir para cima (por causa do fundo da pagina)*/
                my : 'bottom right',
                at : 'top right'
            },
            events : {
                show : show || function(event,api){
                    if(!canShow){
                        canShow = true;
                        return false;
                    }
                    
                    var e = event.originalEvent,
                    y =  e.pageY || e.screenY,
                    h = originalContent.height(),
                    position = {
                        my : 'top right',
                        at :'bottom right'
                    };
                    /*Descontando altura da caixa para exibir o menu para cima*/
                    if(h + y > $(window).height()){
                        position = {
                            my : 'bottom right',
                            at : 'top right'
                        };
                    }
                    
                    api.set('position.my',position.my);
                    api.set('position.at',position.at);
                }
            },
            show: {
                solo : true,
                event: 'mouseenter click',
                delay : 200
            },
            hide : {
                delay : 300,
                fixed : true
            },
            style: style
        }).qtip('api');
    });
}

function qtitle(){
    $('.qtitle').qtitle();
}

$.datepicker.regional['pt-BR'] = {
    closeText: 'Fechar',
    prevText: 'Anterior',
    nextText: 'Pr&oacute;ximo',
    currentText: 'Hoje',
    monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    changeMonth: true,
    changeYear: true};

$.datepicker.setDefaults($.datepicker.regional['pt-BR']);

(function(window, MD, $){

/**
 * Gerencia a tela de Visao Geral do Meu Dinheiro
 **/
var Resumo = function(){};

/*Atalho para criacao de metodos*/
var fn = Resumo.prototype;

var hashMonitor = new MD.HM();


var Ajax = fn.Ajax = function(){
    ControladorMeuDinheiro.apply(this,['VISAOGERAL'].concat(Array.prototype.slice.call(arguments)));
};


/*Classe estatica*/
MD.Resumo = new Resumo();
    
var periodo;

var pagina = fn.pagina = function(){

    preparaExibicao('link_cabecalho_resumo');
    hashMonitor.init();

    Ajax("INICIAR",function(r){
        conteudo(r,"#conteudo",function(){
            iniciar();
             
            /*Considera ou nao o residuo das metas*/
            $("#considerar-residuo-metas").click(function(){
                ControladorConfiguracoes('ALTERNAR_RESIDUO_METAS',$(this).is(":checked")?1:0,carregarPaineis);
            });
        });
    });
}

/*Inicia a pagina de portlets*/
var iniciar = fn.iniciar = function(){

    var update_count = 0;

    periodo = MD.headerPeriodos({
        exec : function(){
            carregarPaineis();
        },
        validate : function(data){
            /*Antes da primeira fatura ?*/
            if( data < this.min ){
                jAlert('A visão geral não pode ser visualizada no passado.','Periodo inválido');
                return false ;
            }
            return true;
        }
    });

    if(carregarPaineis() === false) return;

    _sortableHandle();
    
    $(".portlet-header .action-begin").each(function(){
        var canShow = true,
        content = $(this).siblings('.actions-menu').click(function(e){
            api.set('hide.delay',0).hide().set('hide.delay',1000);
            canShow = false;
        }),
        api = $(this).qtip({
            content : { text: content },
            position : {
                my : 'top right',
                at : 'bottom center',
                container : $(this)
            },
                events : {
                    show : function(event,api){
                        if(!canShow){
                            canShow = true;
                            return false;
                        }
                    }
                },
                show: {
                    solo : true,
                    event: 'click mouseenter',
                    delay : 200
                },
                hide : { delay : 200 },
                style: {
                    tip: { corner: false },
                    classes: 'qtip-light qtip-actions-menu'
                }
        }).qtip('api');
    });

    var resumo_hidden = $("#resumo-hidden");
    var button_personalizar = $("#personalizar-resumo").click(function(){
        resumo_hidden.slideDown(500);
        $(this).hide();
    });


    $("#fechar-personalizar-resumo").click(function(){
        resumo_hidden.slideUp(500);
        button_personalizar.show();
    });

    $(".btn-novo-lancamento").click(function(){
        
        var cc = $(this).hasClass('cc'),
        grupo = $(this).hasClass('grupo'),
        tipo, l;
        
        if($(this).hasClass('transferencia')) tipo = 'T';
        else if($(this).hasClass('receita')) tipo = 'R';
        else tipo = 'D';

        l = new MD.Lancamento({
            tipo : tipo
        });
        
        if(!cc){
            return MD.Lancamentos.editar(l,grupo ? 'GRUPO' : 'NORMAL');
        }else{
            var title = 'Novo Lançamento - Cartão de Crédito';
            var tipo_l = grupo ? 'GRUPO' : 'CARTAO';
            var d = jDialog({
                title : title,
                ajax : function(){
                    MD.CartaoCredito.Ajax('ESCOLHA_CONTA_NOVO_LANCAMENTO',function(r){
                        d.html(r);
                        var status = $("#statusjdialog").attr('status');
                        if(status == 'oneacc'){
                            var conta = $("#statusjdialog").attr('cod');
                            d.close();
                            MD.Lancamentos.editar(new MD.Lancamento({cartao:true,tipo:tipo,cadastros : {conta:conta}}),tipo_l);
                        }else if(status == 'noacc'){
                            d.close();
                            jAlert('Você não possui nenhum cartão crédito cadastrado ou ativo.',title);
                        }
                    });
                },
                buttons : {
                    'Escolher' : function(){
                        var conta = $("#select_cartoes").val();
                        d.close();
                        MD.Lancamentos.editar(new MD.Lancamento({cartao:true,tipo:tipo,cadastros : {conta:conta}}),tipo);
                    },
                    'Cancelar' : function(){
                        d.close();
                    }
                }
            });
        }
        
    });


    function _sortableHandle(){

        var sortable_columns = {
            connectWith: ".column",
            tolerance : "pointer",
            scroll: false,
            handle: '.portlet-header',
            start : function(){
                update_count = 0;  
            },
            update : function(event,ui){
                update();
            }
        };

        var sortable_hidden = {
                connectWith: ".column",
                tolerance : "pointer",
                helper : "clone",
                items: $(".hidden-portlet.enabled"),
                start : function(e,ui){
                update_count = 0;
                },
                remove : function(e,ui)
                {
                    ui.item.hide();
                    return false;  
                },
                update : function(e,ui){
                    var item = ui.item;

                    if(!ui.item.parent().hasClass("hidden-portlets"))
                    {
                        var title = item.find(".hidden-portlet-title").html();

                        var id = item.attr("i");

                        $("#hidden-portlet-"+id).show();

                        /*Prepara o novo item*/
                        var n_item = $("<div class='portlet' id='portlet-"+id+"' i='"+id+"'><div class='portlet-header'><span>"+title+"</span></div>"+
                                    "<div class='portlet-content'><img src='visao/img/load.gif' /></div></div>");

                        /*Deleta o item que foi copiado*/
                        item.after(n_item).remove();
                        /*Atualiza os eventos dos paineis*/
                        __painelEvents(n_item);
                        /*Carrega o conteudo deste painel*/
                        carregarPainel(id);
                    }
                }
        };

        $( ".column" ).sortable(sortable_columns);

        __painelEvents($(".portlet"));

        $(".hidden-portlets").sortable(sortable_hidden);

        function __painelEvents(painel)
        {
            painel.addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                    .find( ".portlet-header" ).addClass( "ui-widget-header ui-corner-all" )
//                            .prepend("<i class='icon-cog portlet-config'></i>")
//                            .prepend("<span class='ui-icon ui-icon-closethick' title='Remover painel'></span>"+
//                                    "<span class='ui-icon ui-icon-minusthick' title='Esconder painel'></span>")
//                            .end()
//                    .find( ".portlet-content" );
            
            painel.find('.portlet-toggle').click(function(){
                $( this ).parents( ".portlet:first" ).toggleClass('closed').find( ".portlet-content" ).toggle();
            });
            painel.find('.portlet-remove').click(function(){
                var this_panel = $(this).closest(".portlet");
                jConfirm("Deseja remover este painel?<BR/>Você poderá restaurá-lo novamente depois.", "Remover painel", function(r){
                    if(r){
                        $("#hidden-enabled-" + this_panel.attr("id")).show();
                        $("#hidden-" + this_panel.attr("id")).hide();

                        this_panel.fadeOut(500,function(){
                            $(this).remove();
                            update();
                        });
                    }
                }, {
                    ok : "Sim",
                    cancel : "Não"
                });
            });
            painel.find('.portlet-refresh').click(function(){
                var p = $( this ).parents( ".portlet:first" );
                displayLoading(p);
                carregarPainel(p.attr('i'));
            });
        }
    }
};

var carregarPaineis = fn.carregarPaineis = function(){
    var p = $(".portlet") , 
    ids = p.map(function(){
        return $(this).attr('i');
    }).get(),
    s = true; //Controle da hash
    /*Exibe carregando para cada portlet*/
    displayLoading(p);
    var pos = 0;
    
    var _loadNext = function(){
        if(pos < ids.length && s)
            _load(ids[pos++],_loadNext);
    }
    
    _loadNext();

    function _load(id,cb){
        s = carregarPainel(id,undefined,cb);
    }
};

var displayLoading = function(portlet){
    $(portlet).find(".portlet-content").css('text-align','center').html("<img src='visao/img/load.gif'>");
}

var update = fn.update = function(){

    var portlets = {};

    $(".portlet").each(function(){
        var id = $(this).attr("i").trim() , title,visible,column;
        /*Esta visivel na tela?*/
        visible = "1";
        column = $(this).parent().hasClass("top-left") ? "tl" : $(this).parent().hasClass("top-center") ? "tc": $(this).parent().hasClass("top-right") ? "tr" : "b";
        title = $(this).find(".portlet-header>span").text();

        var portlet = {
            "t" : title.trim(),
            "v" : visible,
            "c" : column
        }
        portlets[id] = portlet;
    });

    $(".hidden-portlet").each(function(){
        var id = $(this).attr("i").trim();
        /*Se ainda nao foi adicionado ao objeto de retorno*/
        if(!portlets[id]){
            var title,visible,column;
            visible = "0";
            column = $(this).attr("c");
            title = $(this).find(".hidden-portlet-title").html();

            var portlet = {
                "t" : title.trim(),
                "v" : visible,
                "c" : column
            }
            portlets[id] = portlet;
        }
    });

    Ajax("ATUALIZAR_PORTLETS",JSON.stringify(portlets));

};

var carregarPainel = fn.carregarPainel = function(id,extra,cb){

    var p = $("#portlet-" + id);
    
    if(!hashMonitor.check()) return false;
    
    Ajax("CARREGAR_CONTEUDO_PORTLET",id,periodo.getInicio(),periodo.getFim(),extra,function(r){
        p.find(".portlet-content").css({
            "text-align" : "left"
        }).html(r);
        if(cb) cb();
        filtrosMovimentacoes();
    });
    
    return true;
};

var graficoCategoria = fn.graficoCategoria = function(renderTo,series){

    if(!$("#" + renderTo)[0]) return;

    var chart = new Highcharts.Chart({
        chart:
        {
            renderTo: renderTo,
            backgroundColor : "#FFF ", //Nao pode ser transparent por causa do ie
            height: 150
        },
        title: null,
        tooltip:
        {
            formatter: function()
            {
                return 'Categoria: <b>'+ this.point.name +'</b><br>' +  
                    'Percentual: <b>'+ this.percentage.number_format(2,',','.') +'%</b><br>' + 
                    'Total: <b> R$ '+ this.y.number_format(2,',','.') +'</b><br>';
            }
        },
        plotOptions:
        {
            pie:
            {
                size: "130",
                dataLabels:
                {
                    enabled: false
                }
            },
            series:
            {
                animation  : false,
                shadow: false
            }
        },
        series: [series]
    });
};

fn.eventosMetas = function(){
    
    $('td.detailed-sonho i').detailedmd({p0:'SONHOS' , p1: 'DETAILED'});
    
    $('.trocar-situacao').unbind('click').one('click',function(){
       var s = parseFloat($(this).attr('situacao'));
       var portlet = $(this).closest('.portlet').attr('i');
       displayLoading("#" + $(this).closest('.portlet').attr('id'));
       carregarPainel(portlet, s == 0 ? 1 : 0);
    });
    $(".mostrar-mais-metas").off('click').click(function(){
        $(this).closest('table').find('.linha-portlet-metas-extra').show();
        $(this).hide().siblings(".mostrar-menos-metas").show();
        $(this).closest('.linha-mostrar-mais-lancamentos').addClass('menos');
    });
    $(".mostrar-menos-metas").off('click').click(function(){
        $(this).closest('table').find('.linha-portlet-metas-extra').hide();
        $(this).hide().siblings(".mostrar-mais-metas").show();
        $(this).closest('.linha-mostrar-mais-lancamentos').removeClass('menos');
    });
}

fn.painelContasPagarReceber = function(){
    
    actionsmd();
    qtitle();
    MD.Agenda.actionButtons();
    $('td.detailed-pr i').detailedmd({p0:'LANCAMENTOS' , p1: 'DETAILED'});
    
    $(".mostrar-mais-lancamentos").click(function(){
        $(this).closest('table').find('.linha-contas-receber-pagar-extra').show();
        $(this).hide().siblings(".mostrar-menos-lancamentos").show();
        $(this).closest('.linha-mostrar-mais-lancamentos').addClass('menos');
    });
    $(".mostrar-menos-lancamentos").click(function(){
        $(this).closest('table').find('.linha-contas-receber-pagar-extra').hide();
        $(this).hide().siblings(".mostrar-mais-lancamentos").show();
        $(this).closest('.linha-mostrar-mais-lancamentos').removeClass('menos');
    });
}

function filtrosMovimentacoes(){
    $('.agenda-filter-contas').unbind('click').click(function(){
        var id = $(this).data("agenda-filter-conta");
        if($(this).hasClass("agenda-filter-cartoes")){
            MD.CartaoCredito.codigo = id;
            MD.Inicializar.hashes.push("cartoes");
        }else{
            if( !MD.C.getv("Agenda.filters.activeFilters.conta") ){
                MD.C.setv("Agenda.filters.activeFilters",{
                    conta : {
                        af : []
                    }
                });
            }else{
            }
            MD.C.setv("Agenda.filters.activeFilters.conta.af",[id]);
            MD.Inicializar.hashes.push("movimentacoes");
//            $("#link_cabecalho_inicio").click();
        }
    });
}

})(window,window.MD,jQuery);

(function(window,MD,$){
    
var 
/*Construtor*/
Metas = function(){},
/*Atalho*/
fn = Metas.prototype,
/*Calendario de exibicao na tela principal*/
calendario = null,
/*Filtros ativos para manter durante a utilizacao do usuario*/
filtros,
/*Ultima visao de metas utilizada*/
ultima_visao,
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('METAS');
/*Expondo metas ao MD Global*/
MD.Metas = new Metas;

/**
 * Carrega pagina de metas
 * @param [visao] Mensal(M),Trimestral(T),Semestral(S),Anual(A)
 **/
var pagina = fn.pagina = function(visao){
    
    preparaExibicao("link_cabecalho_metas_orcamento");
    
    /*Padrao eh mensal*/
    ultima_visao = visao || ultima_visao || 'M';
    
    

    Ajax("HEADER",ultima_visao,function(r){
        conteudo(r,'#conteudo',function(){
            /*A tela foi exibida? (E Versao basica?)*/
            if(!$("#cabecalho_metas")[0]) return;
            
            filtros = criarFiltros();
            
            /*Monitora scroll header*/
            $("#cabecalho_metas").scrollwatchmd();
            cabecalho(ultima_visao);
            carregar();
            
        })
    });
}

/**
 * Eventos do cabecalho de metas
 */
function cabecalho(visao)
{
    /*Trata o select de escolha de regime*/
    escolha_regime_utilizacao(carregar,function(){
        display_loading_gif_ajax($("#metas_conteudo"));
    });

    var _exibicao , freq , text,
        _exibicaoTS = function(){
            var datas = this.datas,
                desc = this.desc;
                
            var nomeInicio = get_nome_meses( datas.ini.substr(5,2) ).left(3) + "/" + datas.ini.left(4).right(2);
            var nomeFim    = get_nome_meses( datas.fim.substr(5,2) ).left(3) + "/" + datas.fim.left(4).right(2);
            desc.o.html(nomeInicio + " até " + nomeFim);
        };
        
    switch(visao){
        case 'T':{
            freq = 3;
            _exibicao = _exibicaoTS;
            text = {
               abutton : 'Trimestre atual',
                escolhaPeriodoTitulo : 'Ir para o trimestre'
            };
        }
        break;
        case 'S':{
            freq = 6;
            _exibicao = _exibicaoTS;
            text = {
               abutton : 'Semestre atual',
                escolhaPeriodoTitulo : 'Ir para o semestre'
            };
        }
        break;
        case 'A':{
            freq = 12;
            _exibicao = function(){
                this.desc.o.find('.nomeMeses').html( this.datas.ini.left(4) );
            };
            text = {
               abutton : 'Ano atual',
                escolhaPeriodoTitulo : 'Ir para o ano'
            };
        }
        break;
        default:{
            freq = 1;    
            text = {
               abutton : 'Mês atual',
                escolhaPeriodoTitulo : 'Ir para o mês'
            };
        }
        break;
    }               

    /*Trata o calendario*/
    calendario = MD.headerPeriodos({
        text : text,
        exibicao : _exibicao,
        exec : carregar
    });
    
    $("#meta-visao").one('change',function(){
        pagina(this.value);
    });
        
}

/**
 * Carrega todas as metas
 */
function carregar(){
    /*Datas do cabecalho de metas*/
    var 
    ini = calendario.getInicio(),
    fim = calendario.getFim();
    display_loading_gif_ajax("#metas_conteudo");
    Ajax("DADOS",ini,fim,function(r){
        conteudo(r,'#metas_conteudo',function(){
            eventosTela();
//            filtros();
            atualizar_rodape();
        });
    });
}

/**
 * Cria os eventos na tela de metas
 */
function eventosTela(){
    
                
    MD.RP.onChangeState = function(state){ MD.C.set('Metas.rightPanel.status',state); }
    MD.RP.changeState(MD.C.get('Metas.rightPanel.status'));
    
    filtros.update();
    actionsmd();
    
    /*Links para definir um novo valor de meta*/
    $('.meta-definir,.meta-editar').click(function(){
        
        var m = $(this).closest('.meta'),
            cod = m.attr('cat'),
            nome = m.find('.meta-nome>span').html().trim();
        
        novaMeta( cod,nome, $(this).hasClass('meta-editar') , carregar );
    });
    $('.meta-excluir').click(function(){
        
        var m = $(this).closest('.meta'),
            cod = m.attr('cat'),
            nome = m.find('.meta-nome>span').html().trim();
        
        excluirMeta( cod,nome, carregar );
    });
    
    /*Alternar entre metas definidas e todas as metas*/
    var 
    grupos = $(".metas-grupo"),
    e = $("#exibir_apenas_metas_definidas").unbind('click').click(function(){
        ControladorConfiguracoes('EXIBIR_APENAS_METAS_DEFINIDAS',this.checked ? 1 : 0);
        _toggle(!this.checked);
    });
    /*Inicializa*/
    _toggle(!e[0].checked);

    function _toggle(b){
        $(".meta.ncriada").toggle(b);
        grupos.show().each(function(){
            $(this).toggle(!!$(this).find(".meta:visible")[0]);
        });
        $("#nenhuma_meta_definida").toggle(grupos.filter(':visible').length == 0);
    }
    
//    /**
//    * Insere uma meta offline na tela
//    * @context O elemento <table> representando a meta
//    * @param valor Valor da nova meta
//    **/
//    var _insereMetaOffline = function(valor){
//        /*Total confirmado + previsto*/
//        var total = parseFloat($(this).attr('total')),
//        /*Total confirmado*/
//        conf = parseFloat($(this).attr('conf')),
//        /*Eh uma meta de despesa?*/
//        negativo = $(this).hasClass('D');
//
//        var oproj = percentuaisMeta(valor,total,negativo),
//            oconf = percentuaisMeta(valor,conf,negativo);
//        
//        /*Atualiza barra de percentual previsto*/
//        desenharBarraMetas.call($(this).find('.meta-bar-proj'),oproj.situacao,oproj.razao);
//        /*Atualiza barra de percentual efetivo*/
//        desenharBarraMetas.call($(this).find('.meta-bar-conf'),oconf.situacao,oconf.razao);
//
//        /*Imprime o valor formatado na tela*/
//        $(this).find('.meta-valor').attr('v',valor);
//        $(this).find('.meta-valor span').html('R$ ' + valor.number_format(2,',','.')).show();
//        $(this).find('.meta-valor a').hide();
//
//        /*Exibe os campos previamente escondidos (barras de %)*/
//        $(this).toggleClass('ncriada criada').find('.ncriada').toggleClass('ncriada criada');
//        
//        atualizar_rodape();
//    };
//    
//    var _removeMetaOffline = function(){
//        $(this).find('.meta-valor span, .meta-valor a').toggle();
//        $(this).toggleClass('criada ncriada').find('.criada').toggleClass('criada ncriada');
//        _toggle(!e[0].checked);
//        
//        atualizar_rodape();
//    };
}
    
var desenharBarraMetas = fn.desenharBarraMetas = function(situacao,razao){
    $(this).removeClass('confortavel critica alerta').
            addClass(situacao).
            css('width', (razao <= 100 ? razao : 100 )+ '%').
            html(razao.number_format(2,',','.') + '%');
}
    
var percentuaisMeta = fn.percentuaisMeta = function (meta,valor,negativo){
    
    /*Situacoes da meta*/
    var situacao,
    /*Razao projetada*/
    razao = meta ? (valor / meta) : 0 ;

    /*Calculando situacoes para metas de diferentes tipos*/
    if(negativo){
        situacao = razao < 0.7 ? "confortavel" : (razao > 1 ? "critica" : "alerta");
    }else{
        situacao = razao < 0.3 ? "critica" : (razao >= 1 ? "confortavel" : "alerta");
    }

    razao *= 100;
    
    return {
        situacao : situacao,
        razao : razao
    };
}

var novaMeta = fn.novaMeta = function(id,nome,edicao,fn){
    var base = calendario && calendario.getInicio();
    var d = jDialog({
        title : !edicao ? 'Nova meta' : 'Editar meta',
        closeText : 'Fechar',
        showButtons : false,
        buttons : {
            'Salvar' : function(){
                var valores = {},
                data = $("#linha-discriminar:visible")[0] ? undefined : base;
                /*Vai usar uma meta para todos os meses*/
                if($("#nova-meta-discriminar")[0].checked){
                    var v = $("#nova-meta-valor").val().replace(/R\$|\s/g,'').parseFloat();
                    for(var i = 1 ; i < 13 ; i++)
                        valores[i<10 ? '0' + i : i] = v;
                }else{
                    $('.nova-meta-discrimina-valor').each(function(i){
                        v = !this.disabled ? this.value.replace(/R\$|\s/,'').parseFloat() : 'NULL';
                        valores[ (i+1) < 10 ? '0' + (i+1) : (i+1)] = v;
                    });
                }
                Ajax(!edicao ? 'NOVA_META_MENSAL_CATEGORIA' : 'ATUALIZAR_META_MENSAL_CATEGORIA',id,JSON.stringify(valores),data,function(r){
                    fn && fn(valores);
                    d.close();
                });
                
            },
            'Cancelar' : function(){
                d.close();
            }
        },
        ajax : function(){
            var dados = JSON.stringify({
                id : id,
                nome : nome,
                data : base
            });
            Ajax('TELA_NOVA_META',dados,function(r){
                /*Exibe na tela*/
                d.html(r).showButtons();
                /*A meta nao existe*/
                if($("#errno")[0]){
                    d.close();
                    jAlert('Você não possui meta criada neste mês.','Editar meta');
                    return;
                }
                
                
                var campoValorTotal = $("#nova-meta-valor").priceFormat(),
                    camposValorDisc = $('.nova-meta-discrimina-valor').priceFormat();
                    
                campoValorTotal.keyup(function(){
                    camposValorDisc.val(this.value);
                });
                    
                $("#nova-meta-discriminar").click(function(){
                   $('#nova-meta-discriminacao').toggle(!this.checked);
                   d.center();
                });
                
                /*Habilitar/desabilitar uma meta em um mes*/
                $(".nova-meta-discard").click(function(){
                    $(this).hide();
                    $(this).siblings('.nova-meta-discard').show();
                    $(this).siblings('.nova-meta-discrimina-valor').prop('disabled',$(this).hasClass('icon-remove'));
                    
                });

            });
        }
    });
}

function excluirMeta(id,nome,fn){
    
    var d = jDialog({
        title :  'Excluir meta - (' + nome + ')' ,
        closeText : 'Fechar',
        showButtons : false,
        buttons : {
            'Excluir' : function(){
                var acao = $("input[name='meta-excluir-radio']:checked").val();
                var anoMes = calendario.getInicio().substr(0,7);
                Ajax('EXCLUIR_META_MENSAL_CATEGORIA',id,anoMes,acao,function(r){
                    d.close();
                    fn && fn();
                });
            },
            'Cancelar' : function(){
                d.close();
            }
        },
        ajax : function(){
            
            Ajax('TELA_EXCLUIR_META',function(r){
                /*Exibe na tela*/
                d.html(r).showButtons();
            });
        }
    });
}

function criarFiltros()
{
    var _save = function(){
        MD.C.set("Metas.filters.activeFilters",this.encode(),function(){
            jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
        });
    }, 
    _update = function(){
        var eaf = this.encode();
        /*Salvando em sessao*/
        MD.C.setv("Metas.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        
        $(".metas-grupo").show().each(function(){
            $(this).toggle(!!$(this).find(".meta:visible")[0]);
        });
    };
    
    return new TableFilter('#metas_conteudo',{
        rowClass : '.filterable',
        activeFilters : MD.C.getv('Metas.filters.activeFilters') || MD.C.get('Metas.filters.activeFilters'),
        visible : MD.C.get('Metas.filters.opened'),
        events : {
            show : function(){MD.C.set('Metas.filters.opened',true)},
            hide : function(){MD.C.set('Metas.filters.opened',false)},
            save : _save,
            update : _update,
            restore : function(){  this.loadFilters( MD.C.get('Metas.filters.activeFilters') ); }
        }
    });
    
//   if($("#filtros").attr("visible") && $("#filtros").attr("visible") != "0" ){
//       $("#novo_fil").fadeOut(0);
//       $("#filtros").fadeIn(0);
//   }else{
//       $("#novo_fil").fadeIn(0);
//        $("#filtros").fadeOut(0);
//   }
//
//    $("#novo_fil").unbind("click").click(function(){
//        $("#filtros").slideDown(100).attr({visible:1});
//        $(this).fadeOut(0);
//    });
//
//    $("#metas_conteudo").filtro({
//        active_filters : filtros_ativos,
//        event : {
//            update : function(active_filters){
//                 var ativos = $(".active_filter").length;
//                 $("#novo_fil").html( ativos > 0 ? "Filtros ativos ("+ativos+")" : "Exibir filtros") ;
//                 /*Guardando filtros ativos em 'sessao' */
//                 filtros_ativos = active_filters;
//                 
//                $(".metas-grupo").show().each(function(){
//                    $(this).toggle(!!$(this).find(".meta:visible")[0]);
//                });
//                 
//            },
//            close : function(clear){
//                $("#filtros").slideUp(100,function(){
//                    $(this).attr({visible:0});
//                    $("#novo_fil").fadeIn(0,function(){
//                        var ativos = $(".active_filter").length;
//                        if(ativos > 0) $(this).html("Filtros ativos ("+ativos+")");
//                        else $(this).html("Exibir filtros");
//                    });
//                });
//            },
//            empty : function(empty){
//                $(".metas-grupo").toggle(!empty);
//                
//                if(empty)
//                    $("#rodape_metas").before("<div id='mensagem' class='mensagem-informativa float-left'>"+
//                                "Não existem metas cadastradas para os filtros escolhidos.</div>");
//                else
//                    $("#metas_conteudo #mensagem").remove();
//            }
//        }
//    });
}


function atualizar_rodape()
{
    var dados = $(".metas");
        
    if(dados[0]){
        var 
        meta_despesas = 0,
        proj_despesas = 0,
        conf_despesas = 0,
        meta_receitas = 0,
        proj_receitas = 0,
        conf_receitas = 0,
        /* Recebe a <table class='meta'> como contexto */
        _processaMeta = function(){
            
            var meta = $(this),
            criada = meta.hasClass('criada'),
            despesa = meta.hasClass('D');
            
            /*Meta nao criada, ignora*/
            if(!criada) return;
            
            /*Resgatando valores nas linhas*/
            var valor = parseFloat($(this).find(".meta-valor").attr('v')),
                prev = parseFloat($(this).find(".meta-prevista").attr('v')),
                conf = parseFloat($(this).find(".meta-efetiva").attr('v'));
                        
            if(despesa)
            {
                meta_despesas += valor;
                proj_despesas += prev;
                conf_despesas += conf;
            }
            else
            {
                meta_receitas += valor;
                proj_receitas += prev;
                conf_receitas += conf;
            }
        };

        dados.each(function(){
            var filhos = $(this).find('.meta-filho'),
                possuiFilhos = !!filhos[0],
                pai = $(this).find('.meta-pai');
            
            /*Se a meta pai esta criada, processa*/
            if(pai.find('.meta').hasClass('criada')){
                _processaMeta.call(pai.find('.meta'));
            /*Senao, se possui filhos, processa-os*/
            }else if(possuiFilhos){
                filhos.each(function(){
                   _processaMeta.call($(this).find('.meta')); 
                });
            }
        });
        
        var projD = percentuaisMeta(meta_despesas,Math.abs(proj_despesas),true),
            confD = percentuaisMeta(meta_despesas,Math.abs(conf_despesas),true),
            projR = percentuaisMeta(meta_receitas,proj_receitas,false),
            confR = percentuaisMeta(meta_receitas,conf_receitas,false);
                
        /*Preenchendo coluna de despesas*/
        $("#meta_despesa_meta").html("R$ " + meta_despesas.number_format(2,",",".")).addClass("saldo_negativo");
        $("#meta_despesa_projetado").html("R$ " + proj_despesas.number_format(2,",",".")).addClass("saldo_negativo");
        $("#meta_despesa_confirmado").html("R$ " + conf_despesas.number_format(2,",",".")).addClass("saldo_negativo");

        /*Preenchendo coluna de receitas*/
        $("#meta_receita_meta").html("R$ " + meta_receitas.number_format(2,",",".")).addClass("saldo_positivo");
        $("#meta_receita_projetado").html("R$ " + proj_receitas.number_format(2,",",".")).addClass("saldo_positivo");
        $("#meta_receita_confirmado").html("R$ " + conf_receitas.number_format(2,",",".")).addClass("saldo_positivo");
                
        desenharBarraMetas.call($("#meta_despesa_var_projetada .meta-parc-bar"),projD.situacao,projD.razao);
        desenharBarraMetas.call($("#meta_despesa_var_confirmada .meta-parc-bar"),confD.situacao,confD.razao);
        desenharBarraMetas.call($("#meta_receita_var_projetada .meta-parc-bar"),projR.situacao,projR.razao);
        desenharBarraMetas.call($("#meta_receita_var_confirmada .meta-parc-bar"),confD.situacao,confR.razao);

    }
}

//fn.previewNovoLancamento = function(){
//    
//    if(!(this instanceof arguments.callee)) return new arguments.callee();
//    
//    var 
//    prev = MD.Lancamentos.previewNovoLancamento,
//    panel = prev.add({
//        title : 'Meta mensal'
//    });
//    /*Painel nao criado*/
//    if(!panel) return;
//    
//    var metas, campo_valor = $("#input_valor_lancamento");
//
//    _carregar(function(){
//        campo_valor.keyup(_exibirMeta);
//        $("#select_categorias_despesas,#select_categorias_receitas").on( "autocompleteclose", _exibirMeta );
//        $("input[name='tipo_lancamento'],#checkbox_efetivado").change(_exibirMeta);
//        $("input[name='tipo_lancamento']").change(function(){
//            panel.panel.toggle(this.value!='transferencia');
//        });
//        $("#input_data_lancamento").blur(function(){
//            /*Para que o blur ocorra depois do onClose do Datepicker*/
//            setTimeout( _carregar ,200);
//        });
//    });
//       
//       
//    function _carregar(cb){
//        
//        if($("input[name='tipo_lancamento']:checked").val() == 'transferencia') return;
//        
//        panel.loading();
//        ControladorMeuDinheiro('METAS_MENSAIS_PREVIEW',_getData(),function(r){
//            panel.show();
//            metas = $.parseJSON(r);
//            _exibirMeta();
//            cb && cb();
//        });
//    }
//    
//    function _exibirMeta(){
//        var cat = _codigoCategoria();
//        /*Possivelmente tela de transferencia - para*/
//        if(!cat) return;
//        var meta = metas[cat];
//        
//        var table = __createTable(meta);
//        /*Se tem pai, faz um prepend em table*/
//        if(meta.pai) table = __createTable(metas[meta.pai]) + table;
//        /*Exibe preview metas*/
//        panel.html(table);
//        
//        $(".meta-preview-definir").click(function(){
//            var m = $(this).closest('.meta'),
//            id = m.attr("cod");
//            
//            novaMeta(id,metas[id].nome,false,function(){_carregar();});
//        });
//        
//        
//        function __createTable(meta){
//            
//            var v = campo_valor.val().replace(/R\$|\s/gi,'').parseFloat(),
//            e = $("#checkbox_efetivado:checked:visible").length,
//            v_p = v + meta.proj,
//            v_e = e ? v + meta.conf : meta.conf;
//            
//            var ncriada = meta.valor == null; 
//            
//            var negativo = meta.D,
//                oproj = percentuaisMeta(meta.valor,v_p,negativo),
//                oconf = percentuaisMeta(meta.valor,v_e,negativo);
//            
//            return "<table style='width:190px;' class='meta' cod='"+meta.id+"'>"+
//                "<tr>"+
//                    "<td style='background:#F0F5F8; font-weight:bold;'>"+
//                         meta.nome + ": " +(!ncriada ? 'R$ ' + meta.valor.number_format(2,',','.') : '<a class="meta-preview-definir" href="javascript:void(0);" style="color: blue;">Definir</a>') + 
//                    "</td>"+
//                "</tr>"+
//                "<tr>"+
//                    "<td>Projetado: <span style='font-weight:bold;'>R$ "+ v_p.number_format(2,',','.') +"</span></td>"+
//                "</tr>"+
//                (!ncriada ? 
//                "<tr>" + 
//                    '<td class="meta-valor-graf meta-prevista-perc">' + 
//                        '<span class="meta-full-bar">' + 
//                            '<span class="meta-parc-bar meta-bar-proj ' + oproj.situacao + '" style="width:'+ (oproj.razao <= 100 ? oproj.razao : 100)+ '%;">'+ oproj.razao.number_format(2,',','.') + '%</span>' + 
//                        '</span>' + 
//                    '</td>' + 
//                '</tr>' : '' ) + 
//                "<tr>"+
//                    "<td>Confirmado: <span style='font-weight:bold;'>R$ "+ v_e.number_format(2,',','.') +"</span></td>"+
//                "</tr>"+
//                (!ncriada ? 
//                "<tr>" + 
//                    '<td class="meta-valor-graf meta-prevista-conf">' + 
//                        '<span class="meta-full-bar">' + 
//                            '<span class="meta-parc-bar meta-bar-conf ' + oconf.situacao + '" style="width:'+ (oconf.razao<= 100 ? oconf.razao : 100)+ '%;">'+ oconf.razao.number_format(2,',','.') + '%</span>' + 
//                        '</span>' + 
//                    '</td>' + 
//                '</tr>' : '' ) + 
//            "</table>";
//        }
//    }
//    
//    /*Retorna o codigo da categoria corrente*/
//    function _codigoCategoria(){
//        return $("#select_categorias_despesas:visible").attr('cod') || 
//               $("#select_categorias_receitas:visible").attr('cod');
//    }
//    
//    function _getData(){
//        return $("#input_data_lancamento").val().replaceAll(" ","").formatDateMySql();
//    }
//    
//    this.update = _exibirMeta;
//}

})(window,window.MD,jQuery);


(function(window,MD,$){
    
var 
/*Construtor*/
Agenda = function(){},
/*Atalho*/
fn = Agenda.prototype,
/*Calendario de periodos da agenda*/
calendario,
/*Filtros da tela de movimentacoes*/
filtros,
hashMonitor = new MD.HM(),
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('AGENDA');


/*Expondo metas ao MD Global*/
MD.Agenda = new Agenda;


var pagina = fn.pagina = function(){
    preparaExibicao("link_cabecalho_inicio");
    hashMonitor.init();
    
    Ajax("HEADER",function(r){
        
        if(!hashMonitor.check()) return;
        
        conteudo(r,"#conteudo",function(){
            if(!hashMonitor.check()) return;
            /*Monitora scroll header*/
            $(".agenda-header").scrollwatchmd();
            filtros = criarFiltros();
        });
        
        calendario = MD.headerPeriodos({
            exec : function(ini,fim){
                movimentacoes();
                /*Considerar residuo de metas apenas no presente*/
                $("#considerar-residuo-metas").closest('.btn').toggle(this.datas.base <= this.datas.ini);
            }
        });
            
        movimentacoes();      
        
        $(".btn-novo-lancamento").click(function(){
            var contas = filtros.encode().conta,
            l,tipo;
            contas  = contas  && contas.af.length > 0 ? contas .af : null;
            
          
            if($(this).hasClass('transferencia')) tipo = 'T';
            else if($(this).hasClass('receita')) tipo = 'R';
            else tipo = 'D';
            
            l = new MD.Lancamento({
                tipo : tipo
            });
            
            /*Se tem exatamente uma conta filtrada, abre para lancamentos nela..*/
            if(contas && contas.length == 1)
                l.option('cadastros.conta' , contas[0] );
            
            MD.Lancamentos.editar(l);
        });
        
        $("#novo-lancamento-grupo").click(function(){
            MD.Lancamentos.editar(null,"GRUPO");
        });
        
        $("#btn-importar-lancamentos").click(function(){
            MD.Importacao.escolhaModo();
        });
        
        /*Considera ou nao o residuo das metas*/
        $("#considerar-residuo-metas").click(function(){
            ControladorConfiguracoes('ALTERNAR_RESIDUO_METAS',$(this).is(":checked")?1:0,movimentacoes);
        });
    });
}

var movimentacoes = fn.movimentacoes = function(){
    display_loading_gif_ajax(".agenda-conteudo");
    
    Ajax("MOVIMENTACOES",calendario.getInicio(),calendario.getFim(),function(r){
        conteudo(r,".agenda-conteudo",function(){
            
            $(".panel-resumo-title").click(function(){
                $(this).closest('.panel-resumo').toggleClass('closed');
            });
            
            MD.RP.onChangeState = function(state){ MD.C.set('Agenda.rightPanel.status',state); }
            MD.RP.changeState(MD.C.get('Agenda.rightPanel.status'));
            
            /*Inicia filtros*/
            filtros.update();
            $('td.detailed i').detailedmd({p0:'LANCAMENTOS' , p1: 'DETAILED'});
            actionsmd();
            actionButtons();
            MD.AcoesLote.eventos();
            
        });
    });
}

var actionButtons = fn.actionButtons = function(){
    function _exec(link,fn){
        if($(link).hasClass('action-button-disabled')) return;
        var linha      = $(link).closest("tr");
        var codigol     = linha.attr("cod");
        var virtual    = linha.attr("virtual");
        var grupo       = linha.attr("grupo");
        fn.call(link,codigol,virtual,grupo);
    }
    
    $(".editar_lancamento").off('click').click(function(){
        _exec(this,function(codigo,virtual,grupo){
            var 
            linha   = $(this).closest("tr"),
            pagamento = $(linha).attr("pagamento"),
            transferenciacc  = $(linha).attr("transferenciacc"),
            contaCartao = $(linha).attr('conta'),
            conta, tipo;
            
            tipo = $(linha).attr('tipoE');
            
            if(tipo == 'CARTAO') conta = contaCartao || transferenciacc;
            
            
            MD.Lancamentos.editar(new MD.Lancamento({
                codigo : codigo,
                virtual : virtual,
                grupo : grupo,
                cadastros : {
                    conta : conta
                }
            }),tipo);
        }); 
    });
    
    var _confirmar = function(codigo,virtual,conciliar,grupo){
        MD.Lancamentos.confirmar(new MD.Lancamento({
            codigo    : codigo,
            virtual   : virtual,
            grupo     : grupo
        }),conciliar || false);
    };
    
    $(".confirmar_lancamento").off('click').click(function(){ 
        _exec(this,function(codigo,virtual,grupo){
            _confirmar(codigo,virtual,false,grupo);
        }); 
    });
    $(".conciliar_lancamento").off('click').click(function(){ 
        _exec(this,function(codigo,virtual,grupo){
            var linha   = $(this).closest("tr")
            if(linha.attr("status") == 'Confirmado'){
                MD.Lancamentos.conciliar(codigo,grupo);
            }else{
                _confirmar(codigo,virtual,true,grupo);
            }
            
        }); 
    });
    
    $(".excluir_lancamento").off('click').click(function(){ _exec(this,
        function(codigo,virtual,grupo){
            MD.Lancamentos.excluir(new MD.Lancamento({
                codigo        : codigo,
                virtual       : virtual,
                grupo         : grupo
            }));  
        }); 
    });
    $(".clonar_lancamento").off('click').click(function(){ 
        _exec(this,function(codigo,virtual,grupo){
            var 
            linha   = $(this).closest("tr"),
            transferenciacc  = $(linha).attr("transferenciacc"),
            conta, tipo;
            
            tipo = $(linha).attr('tipoE');
            if(tipo == 'CARTAO') conta = transferenciacc;
            
            MD.Lancamentos.editar(new MD.Lancamento({
                clone : codigo,
                virtual : virtual,
                grupo : grupo,
                cadastros : {
                    conta : conta
                }
            }),tipo);
        }); 
    });
    
    $(".data-row").off('dblclick').dblclick(function(){
        if($(this).find('.editar_lancamento:not(.action-button-disabled)')[0]){
            var cod = $(this).attr('cod'),
                virtual = $(this).attr('virtual'),
                grupo  = $(this).attr('grupo'),
                tipo = $(this).attr('tipoE');
            if(cod) MD.Lancamentos.editar(new MD.Lancamento({
                codigo : cod,
                virtual : virtual,
                grupo : grupo
            }),tipo)
        }
    });
};


function criarFiltros(){
    
    var tiposAcc = $.parseJSON($("#tiposacc").html());
    var _save = function(){
        MD.C.set("Agenda.filters.activeFilters",this.encode(),function(){
            jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
        });
    },
    _update = function(afs){
        var eaf = this.encode();
        /*Salvando em sessao*/
        MD.C.setv("Agenda.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        
        MD.AcoesLote.eventos();
        
        /*Linhas inativas*/
        var rs = $.map(this.getRows(),function(r){
            return !r.isOn() ? r : null;
        });
        /*Filtro de contas esta habilitado?*/
        if(!!afs.conta){
            $('.saldo-anterior-conta,.saldo-anterior-total').hide();

            var activeAccs = $.map(afs.conta.getActiveFilters(true),function(v,k){
                return k;
            });
            $.each(activeAccs,function(){
                $('.saldo-anterior-'+this).show();
            });
            /*Filtrando apenas linhas que possuam uma dessas contas*/
            rs = $.map(rs,function(r){ 
                return $.inArray(r.types.conta,activeAccs) != -1 ? r : null; 
            });
            
            
            
            $("#saldo_conciliado").toggle(activeAccs.length == 1 && activeAccs[0] != '0' && tiposAcc && tiposAcc[activeAccs[0]] != 'DINHEIRO');
            
            if(activeAccs.length == 1){
                $('.nome_banco_saldo').html('Sumário: '+afs.conta.getActiveFilters()[activeAccs[0]].label);
            }else{
                $('.nome_banco_saldo').html('Sumário: contas filtradas');
            }
            
        
            $('.linha-ncompoe-saldo:visible').each(function(){
                var conta = $(this).attr('conta');
                $(this).toggle( $.inArray(conta,activeAccs) != -1);
            });
            
        }else{
            $('.saldo-anterior-conta').hide();
            $('.saldo-anterior-total').show();
            $("#saldo_conciliado").hide();
            $('.nome_banco_saldo').html('');
            $('.linha-ncompoe-saldo').hide();

            rs = $.grep(rs,function(r){ 
                return !$(r.dom).hasClass('linha-ncompoe-saldo');
            });
        } 
        
        if(rs.length > 0){
            var sum = {
                proj : 0,
                conf : 0
            };
            $.each(rs,function(){
                var v = $(this.dom).find('.col-valor:first').html().parseFloat();
                
                if(this.types.status.match(/^(Confirmado|Conciliado)$/i)){
                    sum.conf += v;
                }else{
                    sum.proj += v;
                }
            });
            $('#linha_saldo_hidden_conf .col-valor').html(sum.conf.number_format(2,',','.')).corSaldo(sum.conf);
            $('#linha_saldo_hidden .col-valor').html(sum.proj.number_format(2,',','.')).corSaldo(sum.proj);
        }
        $('#linha_saldo_hidden,#linha_saldo_hidden_conf').toggle(rs.length > 0);
        
        
        
        
        
        _updateSaldos.call(this,afs);
    },
    
    _updateSaldos = function(afs){
        
        /*Valor anterior*/
        var vant = 0;
        /*Deve ser contabilizado a parte, pois utiliza linhas que nao participam
         *do filtro*/
        $('.table-agenda .data-row:visible').each(function(){
            var v = $(this).find('.col-valor:first').html().parseFloat() + vant;
            $(this).find('.col-saldo').html(v.number_format(2,',','.')).corSaldo(v);
            vant = v;
        });
        var 
        trs = this.getRows(),
        saldoAnterior = 0,
        _vs = function(){ 
            return {
                    creditos : {
                    total : 0,
                    receitas : 0,
                    transferencias : 0
                },
                debitos : {
                    total : 0,
                    despesas : 0,
                    transferencias : 0
                },
                anterior : 0,
                total : 0,
                totalMes : 0,
                totalFiltrado : 0
            };
        },
        vs = { conf : _vs(), conc : _vs(), proj : _vs() },
        activeAccs = afs.conta;

//        activeAccs = activeAccs && activeAccs.af.length > 0 ? $.map(activeAccs.af,parseFloat) : null;
        activeAccs = activeAccs ? $.map(activeAccs.getActiveFilters(true),function(v,k){return parseFloat(k);}) : null;
        
        var limites = $.parseJSON($("#limites").html()),
        limite = activeAccs && activeAccs.length == 1 ? limites[activeAccs[0]] : null;

        $('.saldo-anterior:visible').each(function(){
            var v = $(this).find('.col-valor:first').html().parseFloat();
            vs.conf.anterior += v;
            vs.proj.anterior += v;
        })
        
        vs.conf.total = vs.conf.anterior;
        
        vs.proj.total = vs.proj.anterior;

        var saldosConciliados = $(".saldo_conciliado"),
            saldoExtrato = "-", dataExtrato = "-";
        /*So vai exibir o painel de conciliados caso esteja exatamente 1 conta filtrada*/
        if(saldosConciliados.length && activeAccs && activeAccs.length == 1){
            var o = $('.saldo_conciliado_' + activeAccs[0]);
            vs.conc.anterior = parseFloat(o.html());
            saldoExtrato = parseFloat(o.attr("saldo_extrato"));
            dataExtrato  = o.attr("data_extrato");
            vs.conc.total = vs.conc.anterior;
        }

        $.each(trs,function(i,tr){
            /*Apenas linhas confirmadas/conciliadas*/
            if(tr.types.status.match(/^(Confirmado|Conciliado)$/i)) __sum(vs.conf);
            if(tr.types.status.match(/^Conciliado$/i)) __sum(vs.conc);
            __sum(vs.proj);
            
            function __sum(d){
                if(!activeAccs || $.inArray(parseFloat(tr.types.conta),activeAccs) != -1 ){
                    var v = $(tr.dom).find('.col-valor:first').html().parseFloat(),
                    ncompoe = $(tr.dom).is('.linha-ncompoe-saldo'),
                    t = tr.types.tipo == 'transferencia',
                    o = v > 0 ? 'creditos' : 'debitos'; 
                    /*Linha que nao compoe saldo nao eh contabilizada a menos que 
                     *lancamento esteja visivel*/
                    if(ncompoe && $(tr.dom).is(":hidden")) return;
                    
                    d[o][t ? 'transferencias' : v < 0 ? 'despesas' :'receitas' ] += v;
                    d[o].total += v;
                    d.totalMes += v;
                    d.total += v;
                    if($(tr.dom).is(':visible')){
                        d.totalFiltrado += v;
                    }
                }
            }
        });
        
        __print('projetado',vs.proj);
        __print('confirmado',vs.conf);
        __print('conciliado',vs.conc);
        function __print(t,d){
            /*Imprime dados*/
            $("#saldo_"+t+"_anterior").html(d.anterior.formatCurrency(true)).corSaldo(d.anterior);
            $("#saldo_"+t+"_receitas").html(d.creditos.total.formatCurrency(true)).corSaldo(d.creditos.total);
            $("#saldo_"+t+"_receitas_parcial").html(d.creditos.receitas.formatCurrency(true)).corSaldo(d.creditos.receitas);
            $("#saldo_"+t+"_receitas_transferencia").html(d.creditos.transferencias.formatCurrency(true)).corSaldo(d.creditos.transferencias);
            $("#saldo_"+t+"_despesas").html(d.debitos.total.formatCurrency(true)).corSaldo(d.debitos.total);
            $("#saldo_"+t+"_despesas_parcial").html(d.debitos.despesas.formatCurrency(true)).corSaldo(d.debitos.despesas);
            $("#saldo_"+t+"_despesas_transferencia").html(d.debitos.transferencias.formatCurrency(true)).corSaldo(d.debitos.transferencias);
            $("#saldo_"+t+"_parcial") .html(d.totalMes.formatCurrency(true)).corSaldo(d.totalMes);
            $("#saldo_"+t+"_atual")   .html(d.total.formatCurrency(true)).corSaldo(d.total);
            
            
            if(limite)
            {
                limite = parseFloat(limite);
                var disponivel = d.total + limite;
                $(".limite_conta_rodape").html(limite.formatCurrency(true)).parent().show();
                $("#saldo_"+t+"_disponivel").html("<b>"+disponivel.formatCurrency(true)+ "</b>").corSaldo(disponivel).parent().show();
            }
            else $(".limite_conta_rodape,#saldo_"+t+"_disponivel").parent().hide();
        }
        

        if(vs.proj.totalFiltrado != vs.proj.totalMes){
//        if(vs.proj.totalFiltrado != 0){
            $("#saldo_filtrados").html("<b>"+vs.proj.totalFiltrado.formatCurrency(true) + "</b>").corSaldo(vs.proj.totalFiltrado).parent().show();
        }else{
            $("#saldo_filtrados").parent().hide();
        }
        

        /*Informacoes do extrato*/
        var diffConc = parseFloat((saldoExtrato-vs.conc.total).toFixed(2));

        $("#data_ultimo_extrato")      .html(dataExtrato ? dataExtrato.format_date_br() : "-");
        $("#saldo_ultimo_extrato")     .html(!isNaN(saldoExtrato) ? saldoExtrato.formatCurrency(true) : "-" ).corSaldo(saldoExtrato);
        $("#diferenca_conciliar")      .html(!isNaN(saldoExtrato) ? diffConc.formatCurrency(true) : "-").corSaldo(diffConc);
    };
    
    return new TableFilter('.table-agenda',{
        activeFilters : MD.C.getv('Agenda.filters.activeFilters') || MD.C.get('Agenda.filters.activeFilters'),
        visible : MD.C.get('Agenda.filters.opened'),
        events : {
            show : function(){MD.C.set('Agenda.filters.opened',true)},
            hide : function(){MD.C.set('Agenda.filters.opened',false)},
            save : _save,
            update : _update,
            restore : function(){  this.loadFilters( MD.C.get('Agenda.filters.activeFilters') ); }
        }
    });
}


})(window,window.MD,jQuery);


var filtros_ativos_json;
var filtros_orig_json;
var filtros_ativos;

window.agenda = {
    periodo : null
};
///**
//* Inicializa eventos do cabecalho da agenda e calendario da agenda.
//* @returns void.
//*/
//function iniciar_agenda()
//{
////    jPrompt('Mensagem','Valor','Titulo',function(r){
////        console.log(r);
////    });
//    
//    $("#novo_l").click(function(){
//        /*Verificando se existem um, e apenas um filtro de conta ativo*/
//        var i = 0, l;
//        $(".active_filter").each(function(){
//            
//            /*Existe mais de 1 filtro ativo? sai fora! */
//            if(i > 1){
//                l = undefined;
//                return false;
//            }
//            else if($(this).attr("filter_type") == "conta")
//            {
//                l = new MD.Lancamento({cadastros : {conta : $(this).attr("filter_tags")} });
//                i++;
//            }
//            if(i > 1) l = undefined;
//        });
//        MD.Lancamentos.editar(l);
////        iniciar_tela_novo_lancamento(o);
//    });
//    
//    botao_importar_lancamentos();
//
//    window.agenda.periodo = MD.headerPeriodos({
//        exec : function(ini,fim){
//            carregarMovimentacoes();
//            /*Considerar residuo de metas apenas no presente*/
//            $("#considerar-residuo-metas").parent().toggle(this.datas.base <= this.datas.ini);
//        }
//    });
//    
//    $("#considerar-residuo-metas").unbind('click').click(function(){
//        ControladorConfiguracoes('ALTERNAR_RESIDUO_METAS',this.checked ? 1 : 0,function(r){
//            carregarMovimentacoes();
//        });
//    });
//}
//
///**
//* Carrega lista de movimentacoes inicial do mes/ano atuais.
//* @returns void.
//*/
//function carregarMovimentacoes()
//{
//    var periodo = window.agenda.periodo;
//    var ini = periodo.getInicio();
//    var fim = periodo.getFim();
//    
//    var conteudo_agenda = $("#agenda_conteudo");
//    display_loading_gif_ajax(conteudo_agenda);
//    
//    $("#filtros").fadeOut(0);
//    
//    ControladorMeuDinheiro("MOVIMENTACOES_AGENDA",ini,fim,function(r)
//    {
//        conteudo_agenda.html(r);
//    
//        MD.AcoesLote.eventos();
//        
////        /*Se esta no mes atual, nao exibe botao de mes atual*/
////        /*Se esta no mes atual, nao exibe botao de mes atual*/
////        if(date == displaydate) $("#botao_mes_atual .button").fadeOut(0);
////        else $("#botao_mes_atual .button").fadeIn(0);
//
//        if($("#dados_lancamentos").length)
//            criar_filtros_exibicao();
//        else
//            $("#filtros").fadeOut(0).attr("visible",0);
//        
//    });
//}
//
//
//function iniciar_filtros(filtros,filtros_sessao)
//{
//    /*Guardando filtros salvos no banco*/
//    if(filtros) filtros_orig_json = filtros;
//
//    if(filtros_sessao && filtros_sessao.length) filtros_ativos_json = filtros_sessao;
//
//    /*Guardando filtros de sessao*/
//    if(filtros_ativos_json) filtros = filtros_ativos_json;
//       
//    /*As configuracoes estao vazias?*/
//    if(filtros != "{}" && filtros.length > 0)
//    {
//        /*Array com os filtros ativos*/
//        filtros_ativos = $.parseJSON(filtros);
//        /*String json para comparacao se houve alteracao ao salvar*/
//        filtros_ativos_json = filtros;
//    }
//    else
//    {
//        filtros_ativos = null;
//    }
//}
//
///**
//* Cria evendos e tratamentos no campo de filtros da agenda.
//* @returns void.
//*/
//function criar_filtros_exibicao()
//{
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
//        ControladorMeuDinheiro("ATUALIZA_FILTRO",1);
//    });
//
//    atualizar_rodape();
//
//    $("#dados_lancamentos #dados").filtro({
//        active_filters : filtros_ativos,
//        event : {
//            update : function(active_filters){
//                 atualizar_saldos_parciais(active_filters);
//                 var ativos = $(".active_filter").length;
//                 $("#novo_fil").html( ativos > 0 ? "Filtros ativos ("+ativos+")" : "Exibir filtros") ;
//
//                filtros_ativos_json = JSON.stringify(active_filters);
//                filtros_ativos = active_filters;
//                
//                MD.AcoesLote.eventos();
//                
//                salvar_filtros_movimentacoes_sessao();
//            },
//            clear : function ()
//            {
//                resetar_rodape();
//                salvar_filtros_movimentacoes_sessao();
//            },
//            close : function(clear){
//                $("#filtros").slideUp(100,function(){
//                    $(this).attr({visible:0});
//                    $("#novo_fil").fadeIn(0,function(){
//                        var ativos = $(".active_filter").length;
//                        if(ativos > 0) $(this).html("Filtros ativos ("+ativos+")");
//                        else $(this).html("Exibir filtros");
//                    });
//                    ControladorMeuDinheiro("ATUALIZA_FILTRO",0);
//                });
//            },
//            save : function (active_filters){
//                active_filters = JSON.stringify(active_filters);
//
//                /*Houve alteracoes ? Entao vai no banco senao engana usuario :P */
//                if(filtros_orig_json != active_filters)
//                {
//                    ControladorMeuDinheiro("SALVAR_FILTROS_ATIVOS",active_filters,function(){
//                        jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
//                    });
//
//                    iniciar_filtros(active_filters);
//                }
//                else
//                {
//                    jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
//                }
//            },
//            restore : function()
//            {
//                /*Seta os filtros de sessao como os filtros do banco*/
//                filtros_ativos_json = filtros_orig_json;
//                /*Reinicializa filtros*/
//                iniciar_filtros();
//                criar_filtros_exibicao();
//                salvar_filtros_movimentacoes_sessao(null,{});
//            },
//            empty : function(empty){
//                if(empty)
//                {
//                    $("#dados_lancamentos #dados").fadeOut(0,function(){
//                        $(this).siblings("#mensagem").remove();
//                        $(this).before("<div id='mensagem' class='mensagem-informativa float-left' >"+
//                            "Não existem lançamentos para os filtros escolhidos.</div>");
//                    });
//                }
//                else
//                {
//                    $("#dados_lancamentos #dados").fadeIn(0,function(){
//                        $(this).siblings("#mensagem").remove();
//                    });
//                }
//
//            }
//        },
//        monitor : {
//            type : "conta",
//            event : {
//                update : function(codigos,active_filters){
//                    monitor_conta_update_event(codigos,active_filters);
//                },
//                clear : function (){
//                    resetar_rodape();
//                }
//            }
//        }
//    });
//}
//
//
///**
//* Aciona rotinas de atualizacao do rodape.
//* @returns void.
//*/
//function atualizar_rodape(active_filters)
//{
//    atualizar_saldos_parciais(active_filters);
//    
//    /*Verifica se existe rodape, pois este codigo tbm eh utilizado na tela de relatorios*/
//    if($("#rodape_agenda").length)
//    {
//        atualiza_saldos_confirmados();
//        atualiza_saldo_projetado();
//        atualiza_saldos_conciliados();
//    }
//    
//    visualizacao_rodape_agenda();
//}
//
///**
//* Atualiza a lista de saldos parciais a partir de cada lancamento na tela.
//* @returns void.
//*/
//function atualizar_saldos_parciais(active_filters)
//{
//    var i, valores_hidden = $(".linha_dados .dados_valor:hidden");
//    var quantidade_hidden = valores_hidden.length;
//    
//    if(active_filters) /*Existem filtros ativos?*/
//    {
//        var contas_ativas = active_filters["conta"] ? active_filters["conta"].trim().split(" ") : null;
//        
//        if(contas_ativas) /*Existem filtros de contas ativos ?*/
//        {
//            /*Itera nas linhas escondidas verificando se deve entrar no somatorio*/
//            valores_hidden = valores_hidden.not(function(e){
//                /*Pegando os filtros que aquela linha atende*/
//                var filters = $(this).closest(".linha_dados").attr("filter");
//                /*Exclui do somatorio por padrao*/
//                var excluir = true;
//                for(i = 0 ; i < contas_ativas.length ; i++){
//                    /*Retorna true se tem que excluir do somatorio de lancamentos escondidos*/
//                    excluir = filters.search("conta_"+contas_ativas[i]) == -1 ;
//                    /*Eh para manter? para de buscar entao*/
//                    if(!excluir) break;
//                }
//                return excluir;
//            });
//        }
//    }
//    /*Limpando a linha de lancamentos escondidos e retornando objeto da linha*/
//    var linha_hidden = $("#linha_saldo_hidden").removeClass("saldo_negativo saldo_positivo saldo_zerado");
//    /*Somatoria de todos os saldos escondidos*/
//    for(i = 0 , valor = 0; i < valores_hidden.length ; i++ ) valor += valores_hidden.eq(i).html().trim().parseFloat();
//    /*Exibe a linha de saldos escondidos se houver lancamentos escondidos*/
//    if(valores_hidden.length > 0)
//    {
//        classe = valor<0 ? "saldo_negativo" : valor > 0 ? "saldo_positivo" : "saldo_zerado" ;
//        valor = valor.toFixed(2);
//        valor = parseFloat(valor);
//        linha_hidden.find(".dados_valor").html(valor.number_format(2,",",".")).addClass(classe);
//        
//        linha_hidden.show();
//    }
//    else /*Senao esconde*/
//    {
//        linha_hidden.hide();
//    }
//    
//    
//    var valores = $(".dados_valor:visible");
//    var saldos  = $(".dados_saldo:visible").html("").removeClass("saldo_negativo saldo_positivo saldo_zerado");
//    
//    var valor;
//    for(valor = 0, i = 0; i < valores.length ; i++ )
//    {
//        var classe = "";
//        if(i == 0)
//        {
//            classe = valores.eq(i).hasClass("saldo_negativo") ? "saldo_negativo" :
//                   ( valores.eq(i).hasClass("saldo_positivo") ? "saldo_positivo" : "saldo_zerado") ;
//               
//            saldos.eq(i).html(valores.eq(i).html().trim()).addClass(classe);
//        }
//        else
//        {
//            valor = valores.eq(i).html().trim().parseFloat();
//            var saldo_anterior = saldos.eq(i-1).html().trim().parseFloat();
//
//            var saldo_parcial  = parseFloat(valor + saldo_anterior);
//
//            saldo_parcial = saldo_parcial.toFixed(2);
//            saldo_parcial = parseFloat(saldo_parcial);
//            classe = saldo_parcial<0 ? "saldo_negativo" : saldo_parcial > 0 ? "saldo_positivo" : "saldo_zerado" ;
//            saldo_parcial = saldo_parcial.number_format(2,",",".");
//            saldos.eq(i).html(saldo_parcial).addClass(classe).attr("valor",saldo_parcial);
//        }
//    }
//}
//
//
///**
//* Atualiza a lista de saldos confirmados a partir de cada lancamento confirmado na tela.
//* @returns void.
//*/
//function atualiza_saldos_confirmados()
//{
//    if($("#saldo_confirmado").length)
//    {
//        var saldo = 0,
//            creditos = {
//                total : 0,
//                receitas : 0,
//                transferencias : 0
//            },
//            debitos = {
//                total : 0,
//                despesas : 0,
//                transferencias : 0
//            };
//
//        /*Verifica se tem algum banco setado*/
//        var codigos_banco = $(".nome_banco_saldo").attr("cod").trim().split(" ");
//        
//        var sem_conta = $(".nome_banco_saldo").html().trim() == "";
//        
//        var limite = codigos_banco.length == 1 ? $(".nome_banco_saldo").attr("limite") : null;
//
//        var saldos = $(".saldo_banco");
//                
//        if(saldos.length)
//        {
//            for(var i = 0 ; i < codigos_banco.length ; i++)
//            {
//                var codigo_banco = codigos_banco[i];
//                if(codigo_banco == "0")
//                {
//                    saldo += parseFloat($(".linha_saldo_anterior:visible").attr("valor"));
//                }
//                else
//                {
//                    saldos.each(function(){
//                        if($(this).attr("cod") == codigo_banco){
//                            saldo += parseFloat($(this).html());
//                        } 
//                    });
//                }
//
//                /*Calcula despesas e receitas  do mes atual*/
//                $(".linha_dados").each(function(){
//                    if( $(this).attr("filter").search(/(status_Confirmado|status_Conciliado)/) != -1 &&
//                       ($(this).attr("filter").search("conta_"+codigo_banco) != -1  || (codigo_banco == 0 && sem_conta)))
//                    {
//                        var v = parseFloat($(this).attr("valor"));
//                        var t = $(this).attr("tipo") == "TRANSFERENCIA";
//                        if(v>0){
//                            creditos.total += v;
//                            creditos[t ? 'transferencias' : 'receitas' ] += v;
//                        }
//                        else{
//                            debitos.total += v;
//                            debitos[t ? 'transferencias' : 'despesas' ] += v;
//                        } 
//                    }
//                });
//            }
//            
//        }
//        saldo = !isNaN(saldo) ? saldo : 0;
//
//        $("#saldo_confirmado_anterior,#saldo_confirmado_atual,#saldo_confirmado_disponivel").removeClass("saldo_negativo saldo_positivo saldo_zerado");
//
//        var total_mes = parseFloat((debitos.total+creditos.total).toFixed(2));
//        var total = parseFloat((debitos.total+creditos.total+saldo).toFixed(2));
//        saldo = parseFloat(saldo.toFixed(2));
//        
//        var cor_saldo_anterior = saldo<0 ? "saldo_negativo" : saldo>0 ? "saldo_positivo" : "saldo_zerado";
//        var cor_saldo_atual    = total<0 ? "saldo_negativo" : total>0 ? "saldo_positivo" : "saldo_zerado";
//        var cor_saldo_parcial  = total_mes<0 ? "saldo_negativo" : total_mes>0 ? "saldo_positivo" : "saldo_zerado";
//
//        if(limite)
//        {
//            limite = parseFloat(limite);
//            var disponivel = total + limite;
//            var cor_disp = disponivel<0 ? "saldo_negativo" : disponivel>0 ? "saldo_positivo" : "saldo_zerado";
//            $(".limite_conta_rodape").html("R$ "+limite.number_format(2,",",".")).parent().show();
//            $("#saldo_confirmado_disponivel").html("<b>R$ "+disponivel.number_format(2,",",".") + "</b>").addClass(cor_disp).parent().show();
//        }
//        else{
//            $(".limite_conta_rodape,#saldo_confirmado_disponivel").parent().hide();
//        }
//
//        /*Imprime dados*/
//        $("#saldo_confirmado_anterior").html("R$ "+saldo.number_format(2,",",".")).addClass(cor_saldo_anterior);
//        $("#saldo_confirmado_receitas").html("R$ "+creditos.total.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_confirmado_receitas_parcial").html("R$ "+creditos.receitas.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_confirmado_receitas_transferencia").html("R$ "+creditos.transferencias.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_confirmado_despesas").html("R$ "+debitos.total.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_confirmado_despesas_parcial").html("R$ "+debitos.despesas.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_confirmado_despesas_transferencia").html("R$ "+debitos.transferencias.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_confirmado_parcial") .html("R$ "+ parseFloat(total_mes).number_format(2,",",".")).addClass(cor_saldo_parcial);
//        $("#saldo_confirmado_atual")   .html("R$ "+ parseFloat(total).number_format(2,",",".")).addClass(cor_saldo_atual);
//    }
//}
//
///**
//* Atualiza a lista de saldos confirmados a partir de cada lancamento confirmado na tela.
//* @returns void.
//*/
//function atualiza_saldos_conciliados()
//{
//    if($("#saldo_conciliado").length)
//    {
//        var saldo = 0 , saldo_extrato = 0,
//            creditos = {
//                total : 0,
//                receitas : 0,
//                transferencias : 0
//            },
//            debitos = {
//                total : 0,
//                despesas : 0,
//                transferencias : 0
//            };
//        var data_extrato;
//
//        /*Verifica se tem algum banco setado*/
//        var codigos_banco = $(".nome_banco_saldo").attr("cod").trim().split(" ");
//
//        if(codigos_banco.length == 1)
//        {
//            var codigo_banco = codigos_banco[0];
//            /*Verifica saldo anterior*/
//            if(codigo_banco != "0")
//            {
//                var saldos = $(".saldo_conciliado");
//
//                if(saldos.length)
//                {
//                    saldos.each(function(){
//                        if($(this).attr("cod") == codigo_banco)
//                        {
//                            saldo = parseFloat($(this).html());
//                            saldo_extrato = parseFloat($(this).attr("saldo_extrato"));
//
//                            data_extrato  = $(this).attr("data_extrato");
//                        }
//                    });
//                }
//                /*Calcula despesas e receitas  do mes atual*/
//                $(".linha_dados").each(function(){
//                    if($(this).attr("filter").search(/(status_Conciliado)/) != -1 &&
//                       $(this).attr("filter").search("conta_"+codigo_banco) != -1)
//                    {
//                        var v = parseFloat($(this).attr("valor"));
//                        var t = $(this).attr("tipo") == "TRANSFERENCIA";
//                        if(v>0){
//                            creditos.total += v;
//                            creditos[t ? 'transferencias' : 'receitas' ] += v;
//                        }
//                        else{
//                            debitos.total += v;
//                            debitos[t ? 'transferencias' : 'despesas' ] += v;
//                        } 
//                    }
//                });
//
//                var total = parseFloat((debitos.total+creditos.total+saldo).toFixed(2));
//
//                $("#saldo_conciliado_anterior,#saldo_conciliado_atual,#saldo_ultimo_extrato,#diferenca_conciliar").
//                    removeClass("saldo_negativo saldo_positivo saldo_zerado");
//                var cor_saldo_anterior = saldo<0 ? "saldo_negativo" : saldo>0 ? "saldo_positivo" : "saldo_zerado";
//                var cor_saldo_atual    = total<0 ? "saldo_negativo" : total>0 ? "saldo_positivo" : "saldo_zerado";
//
//                /*Imprime dados*/
//                $("#saldo_conciliado_anterior").html("R$ "+saldo.number_format(2,",",".")).addClass(cor_saldo_anterior);
//                $("#saldo_conciliado_receitas").html("R$ "+creditos.total.number_format(2,",",".")).addClass("saldo_positivo");
//                $("#saldo_conciliado_receitas_parcial").html("R$ "+creditos.receitas.number_format(2,",",".")).addClass("saldo_positivo");
//                $("#saldo_conciliado_receitas_transferencia").html("R$ "+creditos.transferencias.number_format(2,",",".")).addClass("saldo_positivo");
//                $("#saldo_conciliado_despesas").html("R$ "+debitos.total.number_format(2,",",".")).addClass("saldo_negativo");
//                $("#saldo_conciliado_despesas_parcial").html("R$ "+debitos.despesas.number_format(2,",",".")).addClass("saldo_negativo");
//                $("#saldo_conciliado_despesas_transferencia").html("R$ "+debitos.transferencias.number_format(2,",",".")).addClass("saldo_negativo");
//                $("#saldo_conciliado_atual")   .html("R$ "+ parseFloat(total).number_format(2,",",".")).addClass(cor_saldo_atual);
//
//                /*Informacoes do extrato*/
//                var diferenca_conciliar = parseFloat((saldo_extrato-total).toFixed(2));
//                var cor_saldo_extrato  = saldo_extrato<0 ? "saldo_negativo" : saldo_extrato>0 ? "saldo_positivo" : "saldo_zerado";
//                var cor_diferenca      = diferenca_conciliar<0 ? "saldo_negativo" : diferenca_conciliar>0 ? "saldo_positivo" : "saldo_zerado";
//
//                $("#data_ultimo_extrato")      .html(data_extrato ? data_extrato.format_date_br() : "-");
//                $("#saldo_ultimo_extrato")     .html(!isNaN(saldo_extrato) ? "R$ "+ saldo_extrato.number_format(2,",",".") : "-" ).addClass(cor_saldo_extrato);
//                $("#diferenca_conciliar")      .html(!isNaN(saldo_extrato) ? "R$ "+ parseFloat(diferenca_conciliar).number_format(2,",",".") : "-").addClass(cor_diferenca);
//            }
//        }
//    }
//}
//
//
///**
//* Atualiza a lista de saldos projetados a partir de cada lancamento na tela.
//* @returns void.
//*/
//function atualiza_saldo_projetado()
//{
//    if($("#totais_lancamentos").length)
//    {
//        var saldo = 0, saldo_filtrados = 0,
//            creditos = {
//                total : 0,
//                receitas : 0,
//                transferencias : 0
//            },
//            debitos = {
//                total : 0,
//                despesas : 0,
//                transferencias : 0
//            };
//
//        /*Verifica se tem algum banco setado*/
//        var codigos_banco = $(".nome_banco_saldo").attr("cod").trim().split(" ");
//
//        var sem_conta = $(".nome_banco_saldo").html().trim() == "";
//
//        var limite = codigos_banco.length == 1 ?  $(".nome_banco_saldo").attr("limite") : null;
//
//        /*Verifica saldo anterior*/
//        var saldos = $(".saldo_banco");
//
//        if(saldos.length)
//        {
//            for(var i = 0 ; i < codigos_banco.length ; i++)
//            {
//                var codigo_banco = codigos_banco[i];
//
//                if(codigo_banco == "0")
//                {
//                    saldo += parseFloat($(".linha_saldo_anterior:visible").attr("valor"));
//                }
//                else
//                {
//                    saldos.each(function(){
//                        if($(this).attr("cod")==codigo_banco) saldo += parseFloat($(this).attr("anterior"));
//                    })
//                }
//
//                /*Calcula despesas e receitas  do mes atual*/
//                $(".linha_dados").each(function(){
//                    if($(this).attr("filter").search("conta_"+codigo_banco) != -1 || 
//                        ( (codigo_banco == 0) && sem_conta ))
//                    {
//                        var v = parseFloat($(this).attr("valor"));
//                        var t = $(this).attr("tipo") == "TRANSFERENCIA";
//                        if(v>0){
//                            creditos.total += v;
//                            creditos[t ? 'transferencias' : 'receitas' ] += v;
//                        }
//                        else{
//                            debitos.total += v;
//                            debitos[t ? 'transferencias' : 'despesas' ] += v;
//                        } 
//                        if($(this).is(":visible")) saldo_filtrados += v;
//                    }
//                });
//            }
//        }
//        saldo = !isNaN(saldo) ? saldo : 0;
//
//
//        var total_mes = parseFloat((debitos.total+creditos.total).toFixed(2));
//        var total     = parseFloat((debitos.total+creditos.total+saldo).toFixed(2));
//        saldo = parseFloat(saldo.toFixed(2));
//        saldo_filtrados = parseFloat(saldo_filtrados.toFixed(2));
//
//        $("#saldo_projetado_disponivel,#saldo_projetado_anterior,#saldo_projetado_atual,#saldo_projetado_receitas,#saldo_projetado_despesas,#saldo_projetado_parcial").removeClass("saldo_negativo saldo_positivo saldo_zerado");
//        var cor_saldo_anterior = saldo<0 ? "saldo_negativo" : saldo>0 ? "saldo_positivo" : "saldo_zerado";
//        var cor_saldo_atual    = total<0 ? "saldo_negativo" : total>0 ? "saldo_positivo" : "saldo_zerado";
//        var cor_saldo_parcial  = total_mes<0 ? "saldo_negativo" : total_mes>0 ? "saldo_positivo" : "saldo_zerado";
//        var cor_saldo_filtrados  = saldo_filtrados<0 ? "saldo_negativo" : saldo_filtrados>0 ? "saldo_positivo" : "saldo_zerado";
//        
//        
//        if(limite)
//        {
//            limite = parseFloat(limite);
//            var disponivel = total + limite;
//            var cor_disp = disponivel<0 ? "saldo_negativo" : disponivel>0 ? "saldo_positivo" : "saldo_zerado";
//            $(".limite_conta_rodape").html("R$ "+limite.number_format(2,",",".")).parent().show();
//            $("#saldo_projetado_disponivel").html("<b>R$ "+disponivel.number_format(2,",",".") + "</b>").addClass(cor_disp).parent().show();
//        }
//        else{
//            $(".limite_conta_rodape,#saldo_projetado_disponivel").parent().hide();
//        }
//        
//        
//        if(saldo_filtrados != total_mes){
//            $("#saldo_filtrados").html("<b>R$ "+saldo_filtrados.number_format(2,",",".") + "</b>").addClass(cor_saldo_filtrados).parent().show();
//        }else{
//            $("#saldo_filtrados").parent().hide();
//        }
//        
//        /*Imprime dados*/
//        $("#saldo_projetado_anterior").html("R$ "+saldo.number_format(2,",",".")).addClass(cor_saldo_anterior);
//        $("#saldo_projetado_receitas").html("R$ "+creditos.total.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_projetado_receitas_parcial").html("R$ "+creditos.receitas.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_projetado_receitas_transferencia").html("R$ "+creditos.transferencias.number_format(2,",",".")).addClass("saldo_positivo");
//        $("#saldo_projetado_despesas").html("R$ "+debitos.total.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_projetado_despesas_parcial").html("R$ "+debitos.despesas.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_projetado_despesas_transferencia").html("R$ "+debitos.transferencias.number_format(2,",",".")).addClass("saldo_negativo");
//        $("#saldo_projetado_parcial") .html("R$ "+ parseFloat(total_mes).number_format(2,",",".")).addClass(cor_saldo_parcial);
//        $("#saldo_projetado_atual")   .html("R$ "+ parseFloat(total).number_format(2,",",".")).addClass(cor_saldo_atual);
//    }
//
//}
//
//
///**
//* Atualiza eventos do corpo da agenda.
//* @returns void.
//*/
//function atualizar_eventos_agenda()
//{
//    caixas_detalhamentos_agenda();
//    
//    $(".dados_lancamento").each(function(){
//        if(!$(this).hasClass("dados_acao"))
//        {
//            $(this).dblclick(function(){
//                $(this).siblings(".dados_acao").find(".editar_lancamento").click();
//            })
//        }
//    });
//    
//    botoes_acao();
//    
//    visualizacao_rodape_agenda();
//    
//}
//
//function botoes_acao()
//{
//    if(!telaBuscaVisivel())
//    {
//        $(".editar_lancamento").unbind("click").click(function(){
//            evento_edicao(this);
//        });
//
//        $(".confirmar_lancamento").unbind("click").click(function(){
//            evento_efetivacao(this);
//        });
//
//        $(".conciliar_lancamento").unbind("click").click(function(){
//            evento_conciliacao(this);
//        });
//
//        $(".excluir_lancamento").unbind("click").click(function(){
//            evento_exclusao(this);
//        });
//        $(".clonar_lancamento").unbind("click").click(function(){
//            evento_clonar(this);
//        });
//    }
//    else
//    {
//        $(".editar_parcela").unbind("click").click(function(){
//            alert_edicao_parcela_cc(this,$(this).closest(".linha_dados").attr("conta"));
//        });
//        $(".editar_pagamento").unbind("click").click(function(){
//            alert_edicao_pagamento_cc(this,$(this).closest(".linha_dados").attr("conta"));
//        });
//        $(".editar_lancamento_cc").unbind("click").click(function(){
//            alert_edicao_lancamento_cc(this,$(this).closest(".linha_dados").attr("conta"));
//        });
//        
//        $(".excluir_lancamento_cc").unbind("click").click(function(){
//            alert_exclusao_lancamento_cc(this,$(this).closest(".linha_dados").attr("conta"));
//        });
//        
//        $(".editar_lancamento").unbind("click").click(function(){
//            evento_edicao(this);
//        });
//
//        $(".confirmar_lancamento").unbind("click").click(function(){
//            evento_efetivacao(this);
//        });
//
//        $(".conciliar_lancamento").unbind("click").click(function(){
//            evento_conciliacao(this);
//        });
//
//        $(".excluir_lancamento").unbind("click").click(function(){
//            evento_exclusao(this);
//        });
//    }
//        
//}
//
//function resetar_rodape()
//{
//   $(".linha_saldo_anterior_total").fadeIn(0);
//   $(".linha_saldo_anterior:not(.linha_saldo_anterior_total)").fadeOut(0);
//
//   /*Nenhum banco filtrado, codigo recebe 0*/
//   $(".nome_banco_saldo").attr("cod",0).html("");
//
//   if($("#saldo_conciliado").length)
//   {
////       $("#rodape_agenda").css({"height":"110px","padding-top":"60px"});
//       $("#saldo_conciliado table").hide();
//   }
//
//   atualizar_rodape();
//}
//
//
//function tratar_tela_exclusao_lancamento()
//{
//    $("#popup_ok").click( function(e) {
//
//        var codigo         = $(this).attr("cod");
//        var virtual        = $(this).attr("virtual");
//        var alterar_agenda = $("input[name='edicao_repeticao']:checked").val();
//        var data           = $(this).attr("data");
//        var tipo           = $(this).attr("tipo");
//        
//        /*Exclusao oriunda da tela de Fatura ?*/
//        var cartao_credito = $(this).attr("cc");
//
//        var lancamento = {
//            codigo         : codigo,
//            virtual        : virtual,
//            alterar_agenda : alterar_agenda ? alterar_agenda : "TODOS",
//            data_anterior  : data,
//            tipo           : tipo
//        }
//
//        /*Tratamento de evento multiclique*/
//        $(this).unbind(e);
//
//        ControladorMeuDinheiro("EXCLUIR_LANCAMENTO",JSON.stringify(lancamento),
//        function(r){
////            $("#teste").html(r);
//            
//            cancelar_jAjax();
//            if(!telaBuscaVisivel()){
//                if($("#link_cabecalho_resumo").hasClass("selected")) MD.Resumo.carregarPaineis();
//                else if(!cartao_credito) carregarMovimentacoes();
//                else carregar_conteudo_cc(cartao_credito);
//            }else{
//                carregarUltimaBusca();                
//            }
//            
//        });
//    });
//
//    $("#popup_cancel").click( function() {
//         cancelar_jAjax();
//    });
//}
//
//function caixas_detalhamentos_agenda()
//{
//    $(".detailed").each(function(){
//        var lancamento = $(this).parent();
//
//        var valor = lancamento.find(".dados_valor").html();
//        var data = lancamento.find(".dados_data").html();
//        var status = lancamento.find(".dados_status").html();
//
//        var categoria = lancamento.find(".dados_categoria").html();
//        var conta = lancamento.find(".dados_conta").html();
//        var tipo = lancamento.attr("tipo2");
//        var centro = lancamento.attr("centro");
//        var formapgto = lancamento.attr("formapgto");
//        var contato = lancamento.attr("contato");
//        
//        var ndocumento = lancamento.attr("ndocumento");
//        var observacoes = lancamento.find("td.observacoes")[0] ? lancamento.find("td.observacoes").html().trim() : null;
//        
//        var destino = lancamento.attr("destino");
//        
//        var intervalo = lancamento.attr("inter");
//        var ultima = lancamento.attr("ultima");
//        var parcela = lancamento.attr("numero_parcela");
//        var quantidade = lancamento.attr("quantidade");
//        var automatico = lancamento.attr("automatico") == 1;
//        
//        var criacao = lancamento.attr("criacao");
//        var android = lancamento.attr("android") == 1;
//        
//        var repete = (quantidade == -1 || ultima) && intervalo;
//        
//        var acao = lancamento.find(".dados_acao").clone(true,true);
//
//        var cor_status = lancamento.find(".dados_status").attr("class").replace("dados_lancamento","").replace("dados_status","").trim();
//        var cor_valor = lancamento.find(".dados_valor").attr("class").replace("dados_lancamento","").replace("dados_valor","").trim();
//        
//        var valor_float = valor.parseFloat();
//        
//        var comprovante_edicao = lancamento.attr('comprovante_e'),
//            comprovante_download = lancamento.attr('comprovante_d');
//        
//        var table  = "<table class='detailed_table'>";
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Status";
//                    table += "</td>";
//                    table += "<td  class='detailed_data "+cor_status+"'>";
//                        table += status;
//                    table += "</td>";
//                table += "</tr>";
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Valor";
//                    table += "</td>";
//                    table += "<td  class='detailed_data "+cor_valor+"'>";
//                        table += "R$ " + valor;
//                    table += "</td>";
//                table += "</tr>";
//
//                table += "<tr>";
//
//                    table += "<td  class='detailed_label'>";
//                        table += "Data";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += data;
//                    table += "</td>";
//                table += "</tr>";
//                
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Conta" + (destino? ( valor_float < 0 ? " origem" : " destino") : "");
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += conta.length > 0 ? conta : "Sem conta";
//                    table += "</td>";
//                table += "</tr>";
//                
//                if(destino){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Conta" + ( valor_float < 0 ? " destino" : " origem");
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += destino;
//                    table += "</td>";
//                table += "</tr>";
//                }
//                
//                
//            if(!destino){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Categoria";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += categoria;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(centro && !destino){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Centro";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += centro;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(formapgto && !destino){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Forma pagto.";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += formapgto;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(contato && !destino){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += tipo=="receita" ? "Pagador" : "Favorecido";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += contato;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(ndocumento){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "N. documento";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += ndocumento;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            
//            if(observacoes){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Observações";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        table += observacoes;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            
//            if(repete && (quantidade == -1 || (parcela != undefined && parcela.length > 0) )){
//                table += "<tr>";
//                    table += "<td  class='detailed_label'>";
//                        table += "Parcela";
//                    table += "</td>";
//                    table += "<td  class='detailed_data'>";
//                        intervalo = intervalo ? (intervalo == "DAY" ? "diária" : ( intervalo == "WEEK" ? "semanal" : ( intervalo == "MONTH" ? "mensal" : "anual" ) )) : "";
//                        table += quantidade != -1 ? parcela : "Fixa " + intervalo;
//                    table += "</td>";
//                table += "</tr>";
//            }
//            if(automatico){
//                table += "<tr>";
//                    table += "<td class='detailed_label'>";
//                        table += "Confirmação";
//                    table += "</td>";
//                    table += "<td class='detailed_data'>";
//                        table += "Automática";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            
//            if(android){
//                
//                table += "<tr>";
//                    table += "<td class='detailed_label'>";
//                        table += "Origem";
//                    table += "</td>";
//                    table += "<td class='detailed_data'>";
//                        table += "Celular";
//                    table += "</td>";
//                table += "</tr>";
//                
//            }
//            
//            if(comprovante_edicao && comprovante_download){
//                table += "<tr>";
//                    table += "<td class='detailed_label'>";
//                        table += "Comprovante";
//                    table += "</td>";
//                    table += "<td class='detailed_data'>";
//                        table += "<a href='"+comprovante_edicao+"' target='_blank'>Visualizar</a>";
//                        table += " | <a href='"+comprovante_download+"'>Download</a>";
//                    table += "</td>";
//                table += "</tr>";
//            }
//            
//            if(criacao){
//                
//                table += "<tr>";
//                    table += "<td class='detailed_label'>";
//                        table += "Inclusão";
//                    table += "</td>";
//                    table += "<td class='detailed_data'>";
//                        table += criacao;
//                    table += "</td>";
//                table += "</tr>";
//                
//            }
//
//            table += "</table>";
//
//        var title = $(this).siblings(".dados_descricao").html().trim();
//
//        $(this).preview({
//                text : table,
//                title : title
//            });
//        
//    });
//}
//
///**
// * Utilizado para monitorar o evento de atualizacao dos filtros de conta nas 
// * movimentacoes e na tela de extratos.
// */
//function monitor_conta_update_event(codigos,active_filters)
//{
//    var linha_saldo_anterior = $(".linha_saldo_anterior");
//    var nome_banco_saldo = $(".nome_banco_saldo");
//    var itens_filtro_conta = $("#filtro_contas .drop-item");
//
//    linha_saldo_anterior.hide();
//    nome_banco_saldo.attr("cod","");
//
//    for(var i = 0 ; i < codigos.length ; i++)
//    {
//        var nome = "", tipo = "", limite = "";
//        var codigo = codigos[i];
//
//        if(codigos.length == 1 )
//        {
//            itens_filtro_conta.each(function(e){
//                if($(this).attr("filter") == codigo)
//                {
//                    nome = $(this).html().trim();
//                    limite = $(this).attr("limite");
//                    tipo = $(this).attr("tipo");
//                    tipo = tipo ? tipo.trim() : "";
//                }
//            });
//            
//            nome_banco_saldo.attr({"cod":codigo,"limite":limite}).html(" ("+nome+")");
//
//             /*Se tem a coluna de saldo conciliado no rodape (i.e. se estiver neste mes)*/
//            if($("#saldo_conciliado").length)
//            {
//               if(tipo != "DINHEIRO" && codigo != 0)
//               {
//                   $("#saldo_conciliado table").show();
//               }
//            }
//        }
//        else
//        {
//            var c = nome_banco_saldo.attr("cod");
//            nome_banco_saldo.attr({"cod":c + " " + codigo,"limite":""}).html(" (contas filtradas)");
//
//            $("#saldo_conciliado table").hide();
//        }
//
//        if(linha_saldo_anterior.not(".linha_saldo_anterior_total").length)
//        {
//           var existe_conta_anterior = false;
//
//           linha_saldo_anterior.each(function(){
//               if($(this).attr("cod") == codigo)
//               {
//                   $(this).show();
//                   existe_conta_anterior = true;
//               }
//           });
//
//           if(existe_conta_anterior) $(".linha_saldo_anterior_total").hide();
//        }
//
//    }
//    atualizar_rodape(active_filters);   
//}
//
//
///**
//* Salva os filtros ativos em sessao.
//* @param cb Rotina callback <opcional>  
//* @param filtros Filtros a serem setados <opcional>
// */
//function salvar_filtros_movimentacoes_sessao(cb,filtros)
//{
//    ControladorMeuDinheiro("SALVAR_FILTROS_SESSAO",
//                          JSON.stringify(filtros ? filtros : filtros_ativos),
//                          function(){
//       if(cb) cb();
//    });
//}
//
//function visualizacao_rodape_agenda(){
//    
//    $(window).unbind('scroll resize');
//    
//    var tabela = $(".dados_lancamentos");
//    
//    if(!tabela[0]) return; /*As vezes a tela nao foi carregada ainda neh...*/
//    
//    var bottom_tabela = tabela.height() + tabela.offset().top;
////        maxw = tabela.width();
//    
//    /*Itera nos rodapes de resumo e fechamento*/
//    $(".rodape-agenda").each(function(){
//        var 
//        rodape = $(this),
//        preview = rodape.find(".titulo-rodape"),
//        span = preview.find("span");//
//
////        rodape.width(maxw);
//        
//        /*Alturas*/
//        var h;
//        setH();
//        
//        var bottom = h.preview - h.rodape;
//        
//        /*Estilos utilizados*/
//        var style = {
//                fixed : {
//                    bottom : bottom,
//                    position : "fixed"
//                },
//                nfixed : {
//                    position : "static"
//                }    
//        };
//        
//        
//        _handleDisplay();
//        
//         
//        $(window).bind('scroll resize',function(){
//            _handleDisplay();
//            
//        });
//        
//        function setH(){
//            
//            h = {
//                tela    : $(window).innerHeight(),
//                tabela  : tabela.innerHeight(),
//                rodape  : rodape.innerHeight(),
//                preview : preview.innerHeight(),
//                visivel : function(){
//                    /* (Tamanho da janela) - (distancia da tabela ate o topo) + (scroll da janela)*/
//                    return this.tela - tabela.offset().top + $(window).scrollTop();
//                }
//            };
//        }
//        
//        function _handleDisplay(){
//          
//            setH();
//            
//            rodape.width(tabela.width());
//            
//            if(h.tabela > h.visivel()){
//                _createShowEvent();
//                _fixPreview();
//            }else{
////                console.log('unfixing...');
//                _destroyEvents();
//                _unfixPreview();
//            }
//            
//        }
//
//        function _fixPreview(){
//            rodape.css(style.fixed);
//        }
//
//        function _unfixPreview(){
////            console.log('unfixPreview()');
//            rodape.css(style.nfixed);
//            _updateOverlay();
//        }
//
//        function _createShowEvent(){
//            
//            span.addClass("closed");
//            preview.unbind('mouseover').one('mouseover',function(){
////                console.log("trigger: mouseover");
//                span.toggleClass("opened closed");
//                rodape.animate({
//                    bottom : 0
//                },500,function(){
//                    _createHideEvent();
//                });
//            });
//        }
//
//        function _createHideEvent(){
//
//            rodape.unbind('mouseleave').one('mouseleave',function(){
////                console.log("trigger: mouseleave");
//                span.toggleClass("opened closed");
//                rodape.animate({
//                    bottom : bottom
//                },500,function(){
////                    _updateOverlay();
//                    _createShowEvent();
//                });
//            });
//        }
//
//        function _updateOverlay(){
//            var o = $("#popup_overlay");
//            if(!o[0]) return;
////            console.log('overlay');
//            o.height($(document).height());
//        }
//
//        function _destroyEvents(){
//            preview.unbind('mouseover');
//            rodape.unbind('mouseleave');
//            span.removeClass("opened closed");
////            console.log(span);
////            span.css('background','red');
//        }
//    
//    });
//    
//}
//

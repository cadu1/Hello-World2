(function(window,MD,$){
    
var 
/*Construtor*/
Relatorios = function(){},
/*Atalho*/
fn = Relatorios.prototype,
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('RELATORIOS');
/*Expondo metas ao MD Global*/
MD.Relatorios = new Relatorios;

/*Relatorios visualizados nesta sessao, armazenados por tipo*/
var rels = {};
    
var Relatorio = function(pTipo,config){
    
    var fn = this, 
    cfg = $.extend(true,{
        tipo : pTipo,
        ini : null,
        fim : null,
        periodo : null,
        visualizarSubcat : null
    },config);
    
    var encode = fn.encode = function(){
        return JSON.stringify(cfg);
    }
    
    fn.tipo = function(){return cfg.tipo;}
    fn.ini = function(set){ 
        if(set !== undefined){
          cfg.ini = set;
//          if(cfg.mensal) iniM = set;
          return fn;
        } 
        return cfg.ini;
    }
    fn.fim = function(set){
        if(set !== undefined){
          cfg.fim = set;   
//          if(cfg.mensal) fimM = set;
          return fn;
        } 
        return cfg.fim;
    }
    fn.load = function(){
        pagina(cfg.tipo);
        return fn;
    }
    fn.reload = function(){
        carregar(fn);
        return fn;
    }
    fn.validate = function(ini,fim){
        var i = ini || cfg.ini,
        f = fim || cfg.fim;
        
        if(!validaData(i)){
            jAlert('Data de início inválida','Período inválido');
            return false;
        }
        if(!validaData(f)){
            jAlert('Data de fim inválida','Período inválido');
            return false;
        }
        if( i > f){
            jAlert('A data de início deve ser igual ou anterior a de fim','Período inválido');
            return false;
        }
        return true;
    }
    fn.formatDate = function(date){ return date.formatDateMySql(); }
    fn.periodo = function(set){
        if(set !== undefined){
            cfg.periodo = set;
            return fn;
        }
        return cfg.periodo;
    }
    fn.visualizarSubcat = function(set){
        if(set !== undefined){
            cfg.visualizarSubcat = set;
            return fn;
        } 
        return cfg.visualizarSubcat;
    }

    fn.o = {
        load : function(){},
        reload : function(){}
    }


    fn.cfg = function(k,v){
        if(arguments.length == 2){
            cfg[k] = v;
            return fn;
        }
        return cfg[k];
    }
};
    
    
var pagina = fn.pagina = function(tipo){
   
    preparaExibicao("link_cabecalho_relatorio_" + tipo.toLowerCase());
    /*Carrega relatorio da memoria*/
    var rel = rels[tipo] || new Relatorio(tipo);
    /*Atualizando referencia global*/
    rels[tipo] = rel;
    
    var load = true;
    switch(tipo){
        case 'CONTAS_PAGAR_RECEBER':{
            rel.o = ContasPagarReceber;
            ContasPagarReceber.setRel(rel);
        }
        break;
        case 'EXTRATO_DETALHADO':{
            rel.o = ExtratoDetalhado;
            ExtratoDetalhado.setRel(rel);
        }
        break;
        case 'FLUXO_CAIXA':{
            rel.o = FluxoCaixa;
            FluxoCaixa.setRel(rel);
            load=false;
        }
        break;
        case 'TOTAIS_CATEGORIA':
        case 'TOTAIS_CENTRO':
        case 'TOTAIS_CONTATO':
        case 'TOTAIS_PROJETO':{
            var r = new Totais( tipo.replace('TOTAIS_','') );
            rel.o = r;
            r.setRel(rel);
            load=false;
        }
        break;
        case 'LANCAMENTOS_CATEGORIA':
        case 'LANCAMENTOS_CENTRO':
        case 'LANCAMENTOS_CONTATO':
        case 'LANCAMENTOS_PROJETO':{
            var r = new LancamentosPor( tipo.replace('LANCAMENTOS_','') );
            rel.o = r;
            r.setRel(rel);
        }
        break;
    }
    
    Ajax("HEADER",rel.encode(),function(r){
        conteudo(r,'#conteudo',function(){
            if(!$("#link_conheca_premium")[0]){
                var ini = $("#relatorio-header").attr('ini'),
                fim = $("#relatorio-header").attr('fim');

                $("#relatorio-header").scrollwatchmd();

                rel.ini(ini);
                rel.fim(fim);
                eventosHeader(rel);
                if(load) carregar(rel);
            }
        });
    });
};

var carregar = fn.carregar = function(rel){
    if(!rel.validate()) return;
    
    display_loading_gif_ajax("#conteudo_relatorio");
    Ajax('RELATORIO',rel.encode(),function(r){
        conteudo(r,"#conteudo_relatorio",function(){
            eventosTela(rel);
        });
    })
};

function eventosHeader(rel){
    
    rel.o.load && rel.o.load();
    
    var fIni = $('.relatorio-data-ini'),
    fFim = $('.relatorio-data-fim');
    
    var bBusca = $("#relatorio-buscar").on('click',function(){
        /*Botao desabilitado?*/
        if($(this).hasClass('disabled')) return;
        $(this).addClass('disabled');
        var ini = rel.formatDate(fIni.val()),
            fim = rel.formatDate(fFim.val());
        if(rel.validate(ini,fim))
            /*Seta as novas datas do relatorio e recarrega*/
            rel.ini(ini).fim(fim).reload();
    })
    
    var fPeriodo = $('.relatorio-data').change(function(){
        var ini = rel.formatDate(fIni.val()),
            fim = rel.formatDate(fFim.val());
        /*Desabilita botao caso a data seja a mesma do relatorio corrente*/
        bBusca.toggleClass('disabled',ini==rel.ini() && fim == rel.fim());
    });
    
    fPeriodo.filter('.input-date').current_date_format().calendario();

    $("#select-anos-relatorios").change(function(){
        var fim =  this.value.left(4) + '-12-31';
        rel.ini(this.value).fim(fim).reload();
    });

    $("#alternar-periodo-diario-mensal").click(function(){
        var p = $(this).hasClass('DAY') ? 'MONTH' : 'DAY';
        rel.ini(null).fim(null).periodo(p).load();
    })
    
    /*VIsualizar subcategorias no relatorio*/
    $("#visualizar-subcat").click(function(){
        rel.visualizarSubcat($(this).is(':checked')).load();
    })
    
    /*Considera ou nao o residuo das metas*/
    $("#considerar-residuo-metas").click(function(){
        ControladorConfiguracoes('ALTERNAR_RESIDUO_METAS',$(this).is(":checked")?1:0,rel.reload);
    });
    
    /*Trata o select de escolha de regime*/
    escolha_regime_utilizacao(rel.reload);
    
    $("#relatorio-print").click(function(){
        window.print();
    });
    _setasPeriodo();
    
    function _setasPeriodo()
    {
        var inicio = rel.ini(),
               fim = rel.fim(),
               max = get_date('Y-m-d');

        var bg = $("#periodbg"), //Fast backward
            b  = $("#periodb"), // backward
            f  = $("#periodf"), // forward
            fg = $("#periodfg"), // Fast forward
            t  = $("#perioda"); // Esse semestre

        /*Eventos de clique dos botoes*/
        var _createEvents = function(){
            var __click = function(op,quant){
                /*Cadastra evento de UM clique no botao que chamou*/
                this.click(function(){
                    /*Verifica se botao esta habilitado*/
                    if(!_disabled.call(this))
                        /*Chama operacao passada - Add ou Sub*/
                        op(quant);
                });
            }
            /*Cadastro de eventos*/
            __click.call(bg,_sub,3);
            __click.call(b,_sub,1);
            __click.call(f,_add,1);
            __click.call(fg,_add,3);
            __click.call(t,_add);
        }   

        /*Verifica/seta se um botao esta ativo ou nao*/
        var _disabled = function (set){
            if(set !== undefined)
                return $(this).toggleClass('disabled',set);
            else
                return $(this).hasClass("disabled");
        }

        function _verificaDatas(){

            var cmpFim = datecmp(fim,max),
                cmpTri = datecmp( fim , sub_date(get_date("Y-m-d"),1,'MONTH') ) == 0;
            _disabled.call(t,cmpTri);
        }    

        var _add = function(quant){
            /*Senao foi passada quantidade, utiliza originais*/
            if(quant !== undefined){
                inicio = add_date(inicio,quant,'MONTH');
                fim = add_date(fim,quant,'MONTH');
            }else{
                inicio = sub_date(get_date("Y-m-d"),3,'MONTH');
                fim = sub_date(get_date("Y-m-d"),1,'MONTH');
            }

            /*Atualiza botoes e valida as datas, inclusive atualizando elas*/
            _verificaDatas();

            _load();
        }

        var _sub = function(quant){ _add(quant * -1); }

        var _load = function(){ rel.ini(inicio).fim(fim).reload(); }

        _createEvents();
        
        _verificaDatas();

    }
    
}

function eventosTela(rel){
    
    rel.o.reload && rel.o.reload();
    $('td.detailed i').detailedmd({p0:'LANCAMENTOS' , p1: 'DETAILED'});
}


var ContasPagarReceber = fn.ContasPagarReceber = (function(){
    
    var ContasPagarReceber = function(){},
    fn = ContasPagarReceber.prototype,
    rel,filtros;
    
    fn.setRel = function(r){rel = r;};
    
    function criarFiltros(){
        var _save = function(){
            MD.C.set("Relatorios.ContasPagarReceber.filters.activeFilters",this.encode(),function(){
                jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
            });
        }, 
        _update = function(afs){
            var eaf = this.encode();
            /*Salvando em sessao*/
            MD.C.setv("Relatorios.ContasPagarReceber.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);

            var rows_despesa = $('.contas-pagar tr.data-row:visible'),
                rows_receita = $('.contas-receber tr.data-row:visible'),
                despesas = 0,
                receitas = 0;
            
            if(rows_despesa.length == 0){
                $('.contas-pagar').append("<h2 class=' text-center filter-empty'>Sem resultados para os filtros escolhidos</h2>");
            }else{
                $('.contas-pagar').find('.filter-empty').remove();
                rows_despesa.each(function(){
                    despesas += parseFloat($(this).attr('valor'));
                });
            }
            
            if(rows_receita.length == 0){
                $('.contas-receber').append("<h2 class=' text-center filter-empty'>Sem resultados para os filtros escolhidos</h2>");
            }else{
                $('.contas-receber').find('.filter-empty').remove();
                rows_receita.each(function(){
                    receitas += parseFloat($(this).attr('valor'));
                });
            }

            $("#soma_despesas").html(despesas.formatCurrency(true));
            $("#soma_receitas").html(receitas.formatCurrency(true));
            $("#soma_total").html((despesas+receitas).formatCurrency(true)).corSaldo(despesas+receitas);

            
        };
        return new TableFilter('.table-agenda',{
            activeFilters : MD.C.getv('Relatorios.ContasPagarReceber.filters.activeFilters') || MD.C.get('Relatorios.ContasPagarReceber.filters.activeFilters'),
            visible : MD.C.get('Relatorios.ContasPagarReceber.filters.opened'),
            events : {
                show : function(){MD.C.set('Relatorios.ContasPagarReceber.filters.opened',true)},
                hide : function(){MD.C.set('Relatorios.ContasPagarReceber.filters.opened',false)},
                save : _save,
                update : _update,
                empty : function(){ return false;},
                restore : function(){  this.loadFilters( MD.C.get('Relatorios.ContasPagarReceber.filters.activeFilters') ); }
            }
        });
    }
    
    var load = fn.load = function(){
        filtros = criarFiltros();
    }
    
    var reload = fn.reload = function(){
        filtros.update();
    }
    
    return new ContasPagarReceber;
})();

var ExtratoDetalhado = fn.ExtratoDetalhado = (function(){
    
    var ExtratoDetalhado = function(){},
    fn = ExtratoDetalhado.prototype,
    rel,filtros;
    function criarFiltros(){
        var _save = function(){
            MD.C.set("Relatorios.ExtratoDetalhado.filters.activeFilters",this.encode(),function(){
                jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
            });
        }, 
        _update = function(afs){
            var eaf = this.encode();
            /*Salvando em sessao*/
            MD.C.setv("Relatorios.ExtratoDetalhado.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);

            /*Linhas inativas*/
            var rs = $.map(this.getRows(),function(r){
                return !r.isOn() ? r : null;
            });
            /*Filtro de contas esta habilitado?*/
            if(!!afs.conta){
                $('.saldo-anterior-conta,.saldo-anterior-total').hide();
                var activeAccs = $.map(afs.conta.getActiveFilters(),function(v,k){
                    return k;
                });
                $.each(activeAccs,function(){
                    $('.saldo-anterior-'+this).show();
                });
                /*Filtrando apenas linhas que possuam uma dessas contas*/
                rs = $.map(rs,function(r){ 
                    return $.inArray(r.types.conta,activeAccs) != -1 ? r : null; 
                });


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

            _updateSaldos.call(this);
        },

        _updateSaldos = function(){

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
            activeAccs = this.encode().conta;
            activeAccs = activeAccs && activeAccs.af.length > 0 ? activeAccs.af : null;

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
                    if(!activeAccs || $.inArray(tr.types.conta,activeAccs) != -1 ){
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
            }


            if(vs.proj.totalFiltrado != vs.proj.totalMes){
    //        if(vs.proj.totalFiltrado != 0){
                $("#saldo_filtrados").html("<b>"+vs.proj.totalFiltrado.formatCurrency(true) + "</b>").corSaldo(vs.proj.totalFiltrado).parent().show();
            }else{
                $("#saldo_filtrados").parent().hide();
            }
        };


        return new TableFilter('.table-agenda',{
            activeFilters : MD.C.getv('Relatorios.ExtratoDetalhado.filters.activeFilters') || MD.C.get('Relatorios.ExtratoDetalhado.filters.activeFilters'),
            visible : MD.C.get('Relatorios.ExtratoDetalhado.filters.opened'),
            events : {
                show : function(){MD.C.set('Relatorios.ExtratoDetalhado.filters.opened',true)},
                hide : function(){MD.C.set('Relatorios.ExtratoDetalhado.filters.opened',false)},
                save : _save,
                update : _update,
                restore : function(){  this.loadFilters( MD.C.get('Relatorios.ExtratoDetalhado.filters.activeFilters') ); }
            }
        });
    }
    
    fn.setRel = function(r){rel = r;}
    var load = fn.load = function(){
        filtros = criarFiltros();
    }
    
    var reload = fn.reload = function(){
//        console.log('update');
        filtros.update();
    }
    
    return new ExtratoDetalhado;
})();

var FluxoCaixa = fn.FluxoCaixa = (function(){
    var FluxoCaixa = function(){},
    fn = FluxoCaixa.prototype,
    rel,filtros;
    
    
    var grafico = fn.grafico = function(data,portlet){
        if(!$("#graphFluxoCaixa")[0]) return;
    
        var x = data.x; /*Periodos*/
        var y = data.y; /*Saldos*/


        if(!data.x.length) return;

        /*padding para o eixo x*/
        var u = data.x[0].length > 5 ? 15 : 20;
        /*Largura padrao do grafico*/
        var w = !portlet ? $("#conteudo").width() - 30 : $("#conteudo").width() - 30 ;


        var dest = $("#graphFluxoCaixa");

        dest.width(w);

        /*Calcula acrescimo na largura do grafico*/
        var a = data.x.length > u ? (data.x.length - u) * (w/u) : 0;

        /*Aumenta largura padrao*/
        w += a;
        /*Teve acrescimo? coloca scroll na div do grafico*/
        if(a != 0) dest.css("overflow-x","scroll");

        if(portlet){

             var p = dest.closest('.column').parent();

             /*portlet nas colunas mais finas*/
             if(p.attr('id') == 'top-grid'){
                 dest.closest('.portlet-content').css('overflow-x','scroll');
             }

        }


        var chart = {
           chart: {
              renderTo: 'graphFluxoCaixa',
              width : w,
              height : 300
           },
           title: null,
           xAxis: {
              categories: x,
              tickLength : 15
           },
           yAxis: {
              title: {
                 text: 'Saldo (R$)',
                 style : {'font-family':'Arial','font-size':'12px','color':'#333','font-weight' :'normal'}
              },
              labels : {
                 formatter: function() {
                    return this.value.number_format(2,",",".");
                 }
              },
//              tickColor: '#fff',
              lineWidth : 1,
              gridLineDashStyle : "Dash",
               plotLines:[{
                    value:0,
                    color: '#ff0000',
                    width:1,
                    zIndex:4
                }]
           },
           tooltip: {
              formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                    this.x +': R$ '+ this.y.number_format(2,",",".");
              }
           },
           plotOptions : {
               line : {
                   lineWidth : .5,
                   shadow : false
               }
           },
           legend: {
              enabled : false
           },
           series: [{
              type: 'line',
              name: 'Saldos',
              data: y
           }]
        };

        /*Plota o grafico*/
        new Highcharts.Chart(chart);
    }
    
    function criarFiltros(){
        var _save = function(){
            MD.C.set("Relatorios.FluxoCaixa.filters.activeFilters",this.encode(),function(){
                jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
            });
        }, 
        _update = function(){
            var eaf = this.encode();
            rel.cfg('contas',eaf.conta ? eaf.conta.af : []).reload();
            /*Salvando em sessao*/
            MD.C.setv("Relatorios.FluxoCaixa.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        };

        return new TableFilter('#metas_conteudo',{
            activeFilters : MD.C.getv('Relatorios.FluxoCaixa.filters.activeFilters') || MD.C.get('Relatorios.FluxoCaixa.filters.activeFilters'),
            visible : MD.C.get('Relatorios.FluxoCaixa.filters.opened'),
            ajax : true,
            events : {
                show : function(){MD.C.set('Relatorios.FluxoCaixa.filters.opened',true)},
                hide : function(){MD.C.set('Relatorios.FluxoCaixa.filters.opened',false)},
                save : _save,
                update : _update,
                restore : function(){  this.loadFilters( MD.C.get('Relatorios.FluxoCaixa.filters.activeFilters') ); }
            }
        });
    }
    
    fn.setRel = function(r){rel = r;}
    var load = fn.load = function(){
        filtros = criarFiltros();
//        var fs = filtros.encode();
        /*Se estiver com filtro setado, ja vai ter ido no banco buscar*/
//        if($.isEmptyObject(fs) || fs.conta.af.length == 0) filtros.update();
    }
    
    return new FluxoCaixa;
})();

var Totais = fn.Totais = function(tipo){
    
    var fn = this, rel,filtros;
    
    tipo = tipo.substr(0,1) + tipo.substr(1).toLowerCase();
    
    var config = "Relatorios.TotaisPor"+tipo;
    
    fn.setRel = function(r){rel = r;}
    
    var reload = fn.reload = function(){
        
        $('.relatorio-totais-dados').jScrollPane({autoReinitialise : true});
        
        var _load = function(pai){

            var ul = $(this).closest('ul'),
                codigo = $(this).attr("cod"),
                sinal = ul.closest('.quadro-detalhamento').hasClass('R') ? 'R' : 'D';

            /*Conteudo ja esta carregado?*/
            if(ul.hasClass('loaded')){
                ul.toggleClass('closed');
            /*Senao vai no servidor carregar*/
            }else{
                var loading = $('<li class="loading"></li>').appendTo(ul);

                rel.cfg('categoria',codigo).cfg('pai',pai).cfg('sinal',sinal);

                Ajax('RELATORIO_TOTAIS_LANCAMENTOS',rel.encode(),function(r){
                    loading.remove();
                    r = r.trim();

                    if(r.length){
                        ul.addClass('loaded').toggleClass('closed').append(r);
                        /*Adicionando evento de clique apenas se o clique foi no pai,
                         * afinal, nao existe subcategoria de subcategorias..*/
                        if(pai){
                            ul.find(".linha-subcategoria").click(function(){
                                _load.call(this,false);
                            });
                        }
                    }else{
                        var msg = rel.tipo == 'TOTAIS_CATEGORIA' ? 'esta categoria' :
                                rel.tipo == 'TOTAIS_CENTRO' ? 'este centro' : 'este contato';
                        jAlert('Não foram encontrados lançamentos para '+msg+'.<br><br>'+
                                'Parece tratar-se de um erro. Por favor, entre em contato<br>'+
                                'com <b>suporte@easyme.com.br</b>','Não foram encontrados lançamentos');
                    }

                });
            }
        }

        /*Clique na linha de categoria*/
        $(".linha-categoria").click(function(){
            _load.call(this,true);
        });
    }

    function criarFiltros(){
        var _save = function(){
            MD.C.set(config+".filters.activeFilters",this.encode(),function(){
                jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
            });
        }, 
        _update = function(){
            var eaf = this.encode();
            rel.cfg('filtros',eaf).reload();
            /*Salvando em sessao*/
            MD.C.setv(config+".filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        };

        return new TableFilter('#metas_conteudo',{
            activeFilters : MD.C.getv(config+'.filters.activeFilters') || MD.C.get(config+'.filters.activeFilters'),
            visible : MD.C.get(config+'.filters.opened'),
            ajax : true,
            events : {
                show : function(){MD.C.set(config+'.filters.opened',true)},
                hide : function(){MD.C.set(config+'.filters.opened',false)},
                save : _save,
                update : _update,
                restore : function(){  this.loadFilters( MD.C.get(config+'.filters.activeFilters') ); }
            }
        });
    }
    
    var load = fn.load = function(){
        filtros = criarFiltros();
        
//        var fs = filtros.encode();
        /*Se estiver com filtro setado, ja vai ter ido no banco buscar*/
//        if($.isEmptyObject(fs) || fs.conta.af.length == 0) filtros.update();
    }
};
    
fn.Totais.grafico = function(despesas,receitas){
    if(despesas.data.length > 0) imprime_relatorio_pizza('pizza_despesas',despesas);
    if(receitas.data.length > 0) imprime_relatorio_pizza('pizza_receitas',receitas);

    function imprime_relatorio_pizza(renderTo,series){
        var chart = new Highcharts.Chart({
            chart:
            {
                renderTo: renderTo,
                margin: [null],
                height: 300
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
//                            size: "130",
                    cursor: 'pointer',
                    dataLabels:
                    {
                        enabled: true,
                        formatter: function()
                        {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.number_format(2,',','.') +' %';
                        }
                    },
                    events : {
                        click : function (e){
//                                alert('oi');
                        }
                    }
                },

                series: {
                    shadow: false

                }
            },
            series: [series]
        });
    }
}
    

var EvolucaoCat = fn.EvolucaoCat = (function(){
    var EvolucaoCat = function(){}, fn = EvolucaoCat.prototype,
    grafico = fn.grafico = function(){

        $('.display-chart').click(function(){
            var 
            id = $(this).attr('cod'),
            name = $(this).attr('name'),

            /*O Dialog*/
            d = jDialog({
                title : "Evolução categoria: " + name,
                buttons : { 'Fechar' : function(){d.close();} }
             }).html("<div id='graphEvolucaoCat'></div>"),
            x = $.map(get_nome_meses(0),function(m){ return m.substr(0,3); }),
            y = $('.saldo-cat-' + id).map(function(saldo){ return Math.abs(parseFloat($(this).attr('v'))); }),
            /*O grafico*/
            chart = {
               chart: {
                  renderTo: 'graphEvolucaoCat',
                  width : 600,
                  height : 300
               },
               title: {
                  text: '',
                  align : "left"
               },
               xAxis: {
                  categories: x,
                  tickLength : 15
               },
               yAxis: {
                  title: {
                     text: 'Saldo (R$)'
                  },
                  labels : {
                     formatter: function() {
                        return this.value.number_format(2,",",".");
                     }
                  },
                  lineWidth : 1,
                  gridLineDashStyle : "Dash"
               },
               tooltip: {
                  formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': R$ '+ this.y.number_format(2,",",".");
                  }
               },
               plotOptions : {
                   line : {
                       lineWidth : .5,
                       shadow : false
                   }
               },
               legend: {
                  enabled : false
               },
               series: [{
                  name: 'Saldos',
                  data: y
               }]
            };

            /*Plota o grafico*/
            new Highcharts.Chart(chart);

            d.center();
        });
    }
    return new EvolucaoCat;
})();

var EvolucaoRD = fn.EvolucaoRD = (function(){
    var EvolucaoRD = function(){}, fn = EvolucaoRD.prototype,
    graficos = fn.graficos = function(x,y,options){
        
        var colorO = {
            i : 0,
            max : Highcharts.getOptions().colors.length - 1
        }
        function _nextColor(){
            if(colorO.i > colorO.max) colorO.i = 0;
            return Highcharts.getOptions().colors[colorO.i++];
        }

        var width = $("#conteudo").width() - 2;
        var chart;

        var _createPie = function(){

            var catData = this.cat;

            var titulo = 'Distribuição das ' + this.series.name + ' de ' + this.category +' por categoria';

            var categorias = {
                name : 'Categoria',
                type : 'pie',
                size : '60%',
                dataLabels : { 
                    formatter: function() {
                        if(this.percentage < 5) return null;
                        var nome = this.point.name;
                        var max = 10;
                        if(nome.length > max) nome = nome.substring(0, max) + "...";
                        return nome;

                    },
                    color: 'white',
                    distance: -30
                },
                data : []
            },
            centros = {
                name : 'Centro',
                type : 'pie',
                innerSize : '60%',
                dataLabels : {
                    formatter: function() {
    //                    console.log(this);
                        return this.percentage > 2 ? '<b>'+ this.point.name +':</b> R$'+ this.y.number_format(2,',','.')   : null;
                    },
                    distance: 30
                },
                data : []
            };

            /*Montando dados para exibicao*/
            $.each(catData,function(){
                var cat = this;
                var color = _nextColor();
                this.color = color;
                /*As categorias*/
                categorias.data.push(this);

                /*Os centros de cada categoria*/
                var lenCen = this.cen.length;
                $.each(this.cen,function(i){
                    var brightness = 0.2 - (i/lenCen)/catData.length;//(j / data[i].drilldown.data.length) / 5 ;
                    this.color = Highcharts.Color(color).brighten(brightness).get();
                    /*Referencia a categoria pai (nao pode ser na posicao 'cat' por causa do grafico de colunas)*/
                    this.cate = cat.name;
                    centros.data.push(this);
                });
            });

            /*Usuario nao esta utilizando centros*/
            if(centros.data.length == 0){
                categorias.dataLabels = {

                    formatter: function() {
                        return this.point.name;
                    }




                };


            }else{
                titulo += ' e centro';
            }

            titulo +=  ' (R$'+ this.y.number_format(2,',','.') +')';

            chart.setTitle({text: titulo},{text:options.p.subtitle});

            /*Removendo colunas*/
            chart.series[0].remove(false);
            chart.series[0].remove(false);
            /*Criando pizzas*/
            chart.addSeries(categorias,false);
            chart.addSeries(centros,false);

            chart.redraw();

    //        console.log(categorias);
    //        console.log(centros);
    //        console.log(chart);
        }

        var _createColumns = function(){

            chart.setTitle({text: options.c.title},{text: options.c.subtitle});

            chart.series[0].remove(false);
            chart.series[0].remove(false);
            chart.addSeries(y[0],false);
            chart.addSeries(y[1],false);

            chart.redraw();

        }

        chart = new Highcharts.Chart({
            chart:
            {
                renderTo: 'graph',
                height: 500,
                width: width,
                borderColor : '#fff',
                plotBorderColor : "#fff"
            },
            title: {text: options.c.title},
            subtitle: {text: options.c.subtitle},
            tooltip:
            {
                formatter: function()
                {
                    
                    var point = this.point;
                    var s = '';
                    var name = this.series.name;
                    
                    if (point.cat) {
                        s = name + ':<b> R$ '+ this.y.number_format(2,',','.') +'</b><br/>'
                        s += 'Clique para ver o detalhamento de '+ point.category +'.';
                    } else {
                        if(point.cate){
//                            console.log(point.cate);
                            s = 'Categoria:<b> ' + point.cate+'</b><br/>';
                        }
                        s += name + ':<b> ' + point.name +'</b><br/>';
                        s += 'Valor:<b> R$' + this.y.number_format(2,',','.') +'</b><br/>';
                        if(point.cen){
                            s += 'Percentual:<b> ' + this.percentage.number_format(2,',','.') +'%</b><br/>';
                        }
                        s += 'Clique para retornar';
                    }
                    return s;
                }
            },
//            legend : {
//                align : 'right',
//                verticalAlign : 'center',
//                layout : 'vertical'
//            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                _createPie.call(this);
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function(){
                            return 'R$ ' + this.y.number_format(2,',','.') ;
                        }
                    }
                },
                pie: {
//                    size: "130",
                    allowPointSelect: true,
                    cursor: 'pointer',
                    shadow: false,
//                    showInLegend : true,
//                    dataLabels:
//                    {
//                        formatter: function(){
//                            return '<b>'+ this.point.name +'</b>: '+this.percentage.number_format(2,',','.')+' %';
//                        }
//                    },
                    events : {
                        click : function (){
                            _createColumns.call(this);
                        }
                    }
                },
                series: {
                    shadow: false

                }
            },
            xAxis: {
                categories: x
                
            },
            yAxis : {
                title : {
                    text: 'Totais (R$)'
                },
                labels : {
                    formatter : function(){
                        return this.value.number_format(2,",",".");
                    }
                }
            },
            series: y
        });
    }
  
  
  
    return new EvolucaoRD;
  
})();

var LancamentosPor = fn.LancamentosPor = function(tipo){
    
//    if(!(this instanceof arguments.callee)) return new arguments.callee;
    var fn = this,
    filtros,rel;
    
    tipo = tipo.substr(0,1) + tipo.substr(1).toLowerCase();
    
    var config = "Relatorios.LancamentosPor"+tipo;

    fn.setRel = function(r){rel = r;}
    
    function calcularSaldos(){
        
        var j = 0 ,i = 0,parcial = 0, parcial_grupo = 0,parciald = 0, parcialr = 0;
        
        var receitas = 0, despesas = 0;
        
        $(".linha_dados").each(function(e){
             /*Encontrei uma nova linha de total por grupo*/
            if($(this).hasClass("linha_totais_grupo"))
            {
                if($(this).hasClass("geral"))
                {
                    if(j > 1)
                        $(this).show().find(".total").html(parcial_grupo.number_format(2,",",".")).attr("v",parcial_grupo);
                    else
                        $(this).hide();
                        
                    parcial_grupo = 0;
                    i = 0;
                    j = 0;
                }
                /*Nao encontrei nenhuma linha para este somatorio parcial*/
                else if(!i)
                {
                    $(this).hide();
                }
                else
                {
                    $(this).show().find(".total").html(parcial.number_format(2,",",".")).attr("v",parcial);
                    /*Lancamentos por (Centro|Contato)*/
                    if($(this).find(".receitas")[0]){
                        $(this).find(".receitas").html(parcialr.number_format(2,",",".")).attr("v",parcialr);
                        $(this).find(".despesas").html(parciald.number_format(2,",",".")).attr("v",parciald);
                    }
                    i = 0;
                    j++;
                }
                parcial = 0,parciald = 0, parcialr = 0;
            }
            else if($(this).is(":visible"))/*Achou linha visivel de lancamento normal*/
            {
                var v = parseFloat($(this).attr("valor"));
                parcial += v
                
                if(v < 0){
                    parciald += v;
                    despesas += v;
                } 
                if(v > 0){
                    parcialr += v;
                    receitas += v;
                } 
                
                parcial_grupo += v;
                i++; /*Encontrei pelo menos uma linha para este grupo, exibi-lo-ei acima*/
            }
        });
        var total = receitas + despesas;
        $("#soma_despesas").html("R$ " + despesas.number_format(2,",","."));
        $("#soma_receitas").html("R$ " + receitas.number_format(2,",","."));
        $("#soma_total").html("R$ " + total.number_format(2,",",".")).
            removeClass("saldo_negativo saldo_positivo saldo_zerado").
            addClass(total<0 ? "saldo_negativo" : total > 0 ? "saldo_positivo" : "saldo_zerado" );
    }
    
    fn.load = function(){
        filtros = criarFiltros();
    }
    
    fn.reload = function(){
        calcularSaldos();
        filtros.update();
        
        MD.RP.onChangeState = function(state){ MD.C.set(config+'.rightPanel.status',state); }
        MD.RP.changeState(MD.C.get(config+'.rightPanel.status'));
    }
    
    function criarFiltros(){
        var _save = function(){
            MD.C.set(config + ".filters.activeFilters",this.encode(),function(){
                jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
            });
        }, 
        _update = function(){
            calcularSaldos();
            var eaf = this.encode();
            /*Salvando em sessao*/
            MD.C.setv(config + ".filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        };

        return new TableFilter('.table-agenda',{
            rowClass : '.filterable',
            activeFilters : MD.C.getv(config + '.filters.activeFilters') || MD.C.get(config + '.filters.activeFilters'),
            visible : MD.C.get(config + '.filters.opened'),
            events : {
                show : function(){MD.C.set(config + '.filters.opened',true)},
                hide : function(){MD.C.set(config + '.filters.opened',false)},
                save : _save,
                update : _update,
                restore : function(){  this.loadFilters( MD.C.get(config + '.filters.activeFilters') ); }
            }
        });
    }
};


})(window,window.MD,jQuery);

//
//var data_ini_relatorios,
//    data_fim_relatorios,
//    data_ini_mensal_relatorios,
//    data_fim_mensal_relatorios,
//    data_ini_fluxo_caixa,
//    data_fim_fluxo_caixa,
//    mensal_fluxo_caixa = true;
//    
//var dataEvolucaoRD = {
//    ini : null,
//    fim : null
//}
//var dataEvolucaoCat = {
//    ini : null,
//    fim : null
//}
//
//function iniciar_tela_relatorios(tipo_padrao)
//{
//    carregar_relatorio(tipo_padrao);
//}
//
//function carregar_relatorio(tipo,data_inicio,data_fim,mensal)
//{
//    /*Prepara uma data padrao de inicio*/
//    if(!mensal) /*A periodicidade eh diaria ? */
//    {
//        switch(tipo)
//        {
//            case "FLUXO_CAIXA":
//            {
//                if(!data_inicio && !data_ini_fluxo_caixa) data_inicio = get_date("Y-m-d");
//                else if(data_ini_fluxo_caixa) data_inicio = data_ini_fluxo_caixa;
//                if(!data_fim && !data_fim_fluxo_caixa) data_fim = "";
//                else if(data_fim_fluxo_caixa) data_fim = data_fim_fluxo_caixa;
//            }
//            break;
//            case "EVOLUCAO_RD":
//            {
//                if(!data_inicio && !dataEvolucaoRD.ini) data_inicio = sub_date(get_date("Y-m-d"),3,'MONTH');
//                else if(dataEvolucaoRD.ini) data_inicio = dataEvolucaoRD.ini;
//                if(!data_fim && !dataEvolucaoRD.fim) data_fim = sub_date(get_date("Y-m-d"),1,'MONTH');
//                else if(dataEvolucaoRD.fim) data_fim = dataEvolucaoRD.fim;
//            }
//            break;
//            case "EVOLUCAO_CAT":
//            {
//                if(!data_inicio && !dataEvolucaoCat.ini) data_inicio = get_date("Y") + '-01-01';
//                else if(dataEvolucaoCat.ini) data_inicio = dataEvolucaoCat.ini;
//                if(!data_fim && !dataEvolucaoCat.fim) data_fim = get_date("Y") + '-12-31';
//                else if(dataEvolucaoCat.fim) data_fim = dataEvolucaoCat.fim;
//            }
//            break;
//            default:
//            {
//                if(!data_inicio && !data_ini_relatorios) data_inicio = get_date("Y-m")+"-01";
//                else if(data_ini_relatorios) data_inicio = data_ini_relatorios;
//                if(!data_fim && !data_fim_relatorios) data_fim = "";
//                else if(data_fim_relatorios) data_fim = data_fim_relatorios;
//            }
//            break;
//        }
//    }
//    else
//    {
//        if(!data_inicio && !data_ini_mensal_relatorios) data_inicio = get_date("Y-m");
//        else if(data_ini_mensal_relatorios) data_inicio = data_ini_mensal_relatorios;
//        if(!data_fim && !data_fim_mensal_relatorios) data_fim = "";
//        else if(data_fim_mensal_relatorios) data_fim = data_fim_mensal_relatorios;
//    }
//    
//    $("#ferramentas_relatorios,#conteudo_relatorios").hide();
//    $("#carregando_relatorios").show();
//
//    ControladorMeuDinheiro("RELATORIOS_CABECALHOS",tipo,data_inicio,data_fim,function(cabecalho){
//        ControladorMeuDinheiro("RELATORIOS",tipo,data_inicio,data_fim,function(relatorio){
//            $("#carregando_relatorios").hide();
//            $("#ferramentas_relatorios").html(cabecalho);
//            $("#conteudo_relatorios").html(relatorio);
//            $("#ferramentas_relatorios").show();
//            $("#conteudo_relatorios").show();
//            tratar_cabecalho_relatorios(tipo,mensal);
//        });
//    });
//}
//
//function carregar_relatorio_sem_cabecalho(tipo,other)
//{
//    var mensal = $("#inicio_relatorio_mensal:visible")[0];
//    
//    var inicio = !mensal ? $("#inicio_relatorio") : $("#inicio_relatorio_mensal");
//    var fim = !mensal ? $("#fim_relatorio") : $("#fim_relatorio_mensal");
//    
//    var data_ini = inicio.attr("data");
//    var data_fim = fim.attr("data");
//    var data_ini_visual = inicio.html();
//    var data_fim_visual = fim.html();
//    $("#conteudo_relatorios").hide();
//    $("#carregando_relatorios").show();
//    ControladorMeuDinheiro("RELATORIOS",tipo,data_ini,data_fim,other,function(relatorio){
//        $("#conteudo_relatorios").html(relatorio).fadeIn(0);
//        $("#carregando_relatorios").hide();
//        inicio.html(data_ini_visual).attr("data",data_ini);
//        fim.html(data_fim_visual).attr("data",data_fim);
//        $("#cancelar_mudar_periodo,#buscar_mudar_periodo").hide().siblings("#mudar_periodo").show();
//        
//        /* Gambiarra =( 
//         * O fluxo de caixa sempre chama esta rotina quando recarrega, entao nao
//         * pode chamar novamente, senao da loop infinito Oo
//         * Ajustar assim que possivel
//         **/
//        if(tipo != 'FLUXO_CAIXA') filtros_relatorios_iniciar(tipo);
//    });
//}
//
//function tratar_cabecalho_relatorios(tipo,mensal)
//{
//    var inicio = !mensal ? $("#inicio_relatorio") : $("#inicio_relatorio_mensal");
//    var fim = !mensal ? $("#fim_relatorio") : $("#fim_relatorio_mensal");
//    
//    var data_ini = inicio.html() ? inicio.html().trim() : null;
//    var data_fim = fim.html() ? fim.html().trim() : null;
//    
//    filtros_relatorios_iniciar(tipo);
//    
//    tratar_mudanca_periodo_cabecalho_relatorios(tipo);
//    
//    verificar_setas_periodo_relatorio(tipo);
//    
//    $("#mudar_periodo").click(function(){
//        $(this).hide().siblings("#cancelar_mudar_periodo,#buscar_mudar_periodo").show();
//        
//        if(!mensal)
//        {
//            /*Adiciona input texts para usuario digitar uma data qualquer*/
//            inicio.html("<input type='text' value='"+inicio.html().trim()+"' />").find("input").calendario({
//               onClose: function(){
//                   cria_campo_data_fim($(this).val().replaceAll(" ", "").formatDateMySql());
//               }
//            });
//            
//            fim.html("<input type='text' value='"+fim.html().trim()+"' />");
//
//            cria_campo_data_fim(inicio.find("input").val().replaceAll(" ", "").formatDateMySql());
//        }
//        else
//        {
//            /*Adiciona selects com meses para o usuario selecionar*/
//            inicio.hide().siblings("#inicio_relatorio_mensal_select").show();
//            fim.hide().siblings("#fim_relatorio_mensal_select").show();
//        }
//        function cria_campo_data_fim(data_inicio)
//        {
//            data_inicio = data_inicio.split("-");
//            fim.find("input").calendario({
//                minDate : new Date(data_inicio[0],parseFloat(data_inicio[1]) - 1,data_inicio[2]),
//                maxDate : new Date(parseFloat(data_inicio[0]) + 2,11,31) /*1 ano a partir da data de inicio*/
//            });
//        }
//    });
//    
//    $("#cancelar_mudar_periodo").click(function(){
//        if(!mensal)
//        {
//            inicio.html(data_ini);
//            fim.html(data_fim);
//        }
//        else
//        {
//            $("#inicio_relatorio_mensal_select,#fim_relatorio_mensal_select").hide();
//            $("#inicio_relatorio_mensal,#fim_relatorio_mensal").show();
//        }
//        $(this).add("#buscar_mudar_periodo").hide().siblings("#mudar_periodo").show();
//        
//    });
//    
//    $("#buscar_mudar_periodo").click(function(){
//        var data_ok = true;
//        var data_ini_exibicao,data_fim_exibicao;
//        if(!mensal)
//        {
//            data_ini_exibicao = inicio.find("input").val().replaceAll(" ","");
//            data_fim_exibicao = fim.find("input").val().replaceAll(" ","");
//            
//            data_ini = data_ini_exibicao.formatDateMySql();
//            data_fim = data_fim_exibicao .formatDateMySql();
//            
//            if(datecmp(data_fim,data_ini) < 0 )
//            {
//               alert("Período inválido");
//               data_ok = false;
//            }
//            else if(data_fim.split("-")[0] - data_ini.split("-")[0] > 2)
//            {
//                alert("Intervalo deve ser menor ou igual a 2 anos");
//                data_ok = false;
//            }
//            else
//            {
//                switch(tipo)
//                {
//                    case "FLUXO_CAIXA":
//                    {
//                        data_ini_fluxo_caixa = data_ini;
//                        data_fim_fluxo_caixa = data_fim;
//                    }
//                    break;
//                    default:
//                    {
//                        data_ini_relatorios = data_ini;
//                        data_fim_relatorios = data_fim;
//                    }
//                    break;
//                }
//            }
//        }
//        else
//        { 
//            data_ini_exibicao = $("#inicio_relatorio_mensal_select option:selected").html();
//            data_fim_exibicao = $("#fim_relatorio_mensal_select option:selected").html();
//            
//            data_ini = $("#inicio_relatorio_mensal_select").val();
//            data_fim = $("#fim_relatorio_mensal_select").val();
//            
//            if(datecmp(data_fim,data_ini) < 0 )
//            {
//               alert("Período inválido");
//               data_ok = false;
//            }
//            else
//            {
//                data_ini_mensal_relatorios = data_ini;
//                data_fim_mensal_relatorios = data_fim;
//            }
//        }
//        
//        if(data_ok)
//        {
//            $("#conteudo_relatorios").hide();
//            $("#carregando_relatorios").show();
//            
//            /*Verificando filtros ativos para fazer consulta correta*/
//            var filtro = "";
//            if(tipo == "FLUXO_CAIXA") /*Por enquanto soh fluxo de caixa tem filtro online*/
//            {
//                filtro = filtros_ativos_fluxo_caixa ? filtros_ativos_fluxo_caixa.conta : undefined;
//            }
//            else if(tipo == "TOTAIS_CATEGORIA"){
//                filtro = $("#separar_subcategorias:checked")[0] ? "1" : "";
//            }
//
//            ControladorMeuDinheiro("RELATORIOS",tipo,data_ini,data_fim,filtro,function(relatorio){
//                
//                
//                $("#conteudo_relatorios").html(relatorio).fadeIn(0);
//                $("#carregando_relatorios").hide();
//                inicio.html(data_ini_exibicao).attr("data",data_ini);
//                fim.html(data_fim_exibicao).attr("data",data_fim);
//                $("#cancelar_mudar_periodo,#buscar_mudar_periodo").hide().siblings("#mudar_periodo").show();
//                
//                if(mensal)
//                {
//                    $("#inicio_relatorio_mensal_select,#fim_relatorio_mensal_select").hide();
//                    $("#inicio_relatorio_mensal,#fim_relatorio_mensal").show();
//                }
//                
//                
//                filtros_relatorios_iniciar(tipo);
//            });
//        }
//    });
//    
//    if(tipo != 'EVOLUCAO_RD' && tipo != 'EVOLUCAO_CAT'){
//    
//        escolha_regime_utilizacao(function(){
//            var sub = $("#separar_subcategorias")[0] ? $("#separar_subcategorias:checked").length : undefined;
//            carregar_relatorio_sem_cabecalho(tipo,sub);
//        },function(){
//            $("#conteudo_relatorios").hide();
//            $("#carregando_relatorios").show();
//        });
//    }
//    
//    $("#considerar-residuo-metas").unbind('click').click(function(){
//        ControladorConfiguracoes('ALTERNAR_RESIDUO_METAS',this.checked ? 1 : 0,function(r){
//            carregar_relatorio_sem_cabecalho(tipo);
//        });
//    });
//    
//    if(tipo == 'EVOLUCAO_CAT'){
//    
//
//        var _recarregaEvolucaoCat = function(){
//
//            var ano = $("#select-anos-relatorios").val(),
//            ini = ano+'-01-01',
//            fim = ano+'-12-31';
//            dataEvolucaoCat.ini = ini;
//            dataEvolucaoCat.fim = fim;
//
//            var subc = $("#separar_subcategorias:checked")[0] ? 1 : 0;
//            $("#carregando_relatorios,#conteudo_relatorios").toggle();
//            ControladorMeuDinheiro("RELATORIOS",tipo,ini,fim,subc,function(relatorio){
//                $("#conteudo_relatorios").html(relatorio);
//                $("#carregando_relatorios,#conteudo_relatorios").toggle();
//            });
//        };
//        $("#select-anos-relatorios").change(_recarregaEvolucaoCat);
//        $("#separar_subcategorias").click(_recarregaEvolucaoCat)
//        
//        escolha_regime_utilizacao(_recarregaEvolucaoCat);
//    }
//    
//    imprimir_relatorio();    
//}
//
//function tratar_mudanca_periodo_cabecalho_relatorios(tipo)
//{
//    var botao_mensal = $("#botao_periodo_mensal");
//    if(botao_mensal[0])
//    {
//        var inicio_diario = $("#inicio_relatorio");
//        var fim_diario = $("#fim_relatorio");
//        var inicio_mensal = $("#inicio_relatorio_mensal");
//        var fim_mensal = $("#fim_relatorio_mensal");
//        var botao_diario = $("#botao_periodo_diario");
//
//
//        botao_mensal.click(function(){
//            inicio_diario.hide();
//            fim_diario.hide();
//            inicio_mensal.show();
//            fim_mensal.show();
//            botao_mensal.hide();
//            botao_diario.show();
//            mensal_fluxo_caixa = true;
//            carregar_relatorio(tipo, null, null, true);
//        });
//        botao_diario.click(function(){
//            inicio_diario.show();
//            fim_diario.show();
//            inicio_mensal.hide();
//            fim_mensal.hide();
//            botao_mensal.show();
//            botao_diario.hide();
//            mensal_fluxo_caixa = false;
//            carregar_relatorio(tipo);
//        });
//    }
//}
//
//function verificar_setas_periodo_relatorio(tipo)
//{
//    var range = $("#period-range");
//    /*Nao estamos numa tela com setas*/
//    if(!range[0]) return;
//    
//    var inicio = range.attr('ini'),
//           fim = range.attr('fim'),
//           max = get_date('Y-m-d');
//             
//    var bg = $("#periodbg"), //Fast backward
//        b  = $("#periodb"), // backward
//        f  = $("#periodf"), // forward
//        fg = $("#periodfg"), // Fast forward
//        t  = $("#perioda"); // Esse semestre
//        
//    /*Visualizar por subcategorias*/    
//    var sub = $("#separar_subcategorias");
//    
//    sub.click(function(){
//        _load();
//    });
//    
//    /*Eventos de clique dos botoes*/
//    var _createEvents = function(){
//        
//        var __click = function(op,quant){
//            /*Cadastra evento de UM clique no botao que chamou*/
//            this.unbind('click').one('click',function(){
//                /*Verifica se botao esta habilitado*/
//                if(!_disabled.call(this))
//                    /*Chama operacao passada - Add ou Sub*/
//                    op(quant);
//            });
//        }
//        /*Cadastro de eventos*/
//        __click.call(bg,_sub,3);
//        __click.call(b,_sub,1);
//        __click.call(f,_add,1);
//        __click.call(fg,_add,3);
//        __click.call(t,_add);
//        
//        
//        escolha_regime_utilizacao(function(){
//            _load();
//        });
//        
//    }   
//    
//    /*Verifica/seta se um botao esta ativo ou nao*/
//    var _disabled = function (set){
//        if(set !== undefined)
//            return $(this).toggleClass('disabled',set);
//        else
//            return $(this).hasClass("disabled");
//    }
//    
//    function _verificaDatas(){
//        
//        var cmpFim = datecmp(fim,max),
//            cmpTri = datecmp( fim , sub_date(get_date("Y-m-d"),1,'MONTH') ) == 0;
//        
////        _disabled.call(f,cmpFim >= 0);
////        _disabled.call(fg,cmpFim >= 0);
//        _disabled.call(t,cmpTri);
//        
////        if(cmpFim > 0){
////            fim = max;
////            inicio = sub_date(fim,2,'MONTH');
////        }
//        
//    }    
//    
//    var _add = function(quant){
//        /*Senao foi passada quantidade, utiliza originais*/
//        if(quant !== undefined){
//            inicio = add_date(inicio,quant,'MONTH');
//            fim = add_date(fim,quant,'MONTH');
//        }else{
//            inicio = sub_date(get_date("Y-m-d"),3,'MONTH');
//            fim = sub_date(get_date("Y-m-d"),1,'MONTH');
//        }
//        
//        /*Atualiza botoes e valida as datas, inclusive atualizando elas*/
//        _verificaDatas();
//        
//        _load();
//    }
//    
//    var _sub = function(quant){
//        _add(quant * -1);
//    }
//    
//    var _load = function(){
//        
//        var subc = sub[0].checked ? 1 : 0;
//        $("#carregando_relatorios,#conteudo_relatorios").toggle();
//        ControladorMeuDinheiro("RELATORIOS",tipo,inicio,fim,subc,function(relatorio){
//            $("#conteudo_relatorios").html(relatorio);
//            $("#carregando_relatorios,#conteudo_relatorios").toggle();
//            
//            dataEvolucaoRD.ini = inicio;
//            dataEvolucaoRD.fim = fim;
//            
//            _createEvents();
//            
//        });
//    }
//    
//    _createEvents();
//    
//}
//
//function imprimir_relatorio()
//{
//    $("#botao_imprimir").unbind().click(function(){
//        window.print();
//    });
//}
//
///*Tratamentos especificos de cada tela de relatorio*/
//
//function tratar_tela_extrato_detalhado()
//{
////    filtros_extrato_detalhado();
//}
//
//function tratar_tela_totais_categorias(despesas,receitas)
//{
//    $("#separar_subcategorias").click(function(){
//        carregar_relatorio_sem_cabecalho("TOTAIS_CATEGORIA",this.checked ? 1 : 0);
//    });
//    
//    tratar_tela_totais_x({
//        despesas : despesas,
//        receitas : receitas,
//        tipo : 'TOTAIS_CATEGORIA',
//        alert : 'esta categoria'
//    });
//    
//}
//
//function tratar_tela_totais_centros(despesas,receitas)
//{
//     tratar_tela_totais_x({
//        despesas : despesas,
//        receitas : receitas,
//        tipo : 'TOTAIS_CENTRO',
//        alert : 'este centro'
//    });
//}
//function tratar_tela_totais_contatos(despesas,receitas)
//{
//     tratar_tela_totais_x({
//        despesas : despesas,
//        receitas : receitas,
//        tipo : 'TOTAIS_CONTATO',
//        alert : 'este contato'
//    });
//}
//
//function tratar_tela_totais_x(dados)
//{
//    var despesas = dados.despesas,
//        receitas = dados.receitas,
//        tipo = dados.tipo,
//        msg = dados.alert;
//    
//    
//    var aux = $("#relatorios_categorias");
//    var relatorio = {
//        ini : aux.attr("ini"),
//        fim : aux.attr("fim"),
//        sub : aux.attr("sub")
//    };
//
//    /*Closure relacionada aos eventos de clique na tela*/
//    (function(){
//        
//        var _load = function(pai){
//       
//            var ul = $(this).closest('ul'),
//                codigo = $(this).attr("cod"),
//                sinal = ul.closest('.quadro-detalhamento').hasClass('R') ? 'R' : 'D';
//
//            /*Conteudo ja esta carregado?*/
//            if(ul.hasClass('loaded')){
//                ul.toggleClass('closed');
//            /*Senao vai no servidor carregar*/
//            }else{
//                var loading = $('<li class="loading"></li>').appendTo(ul);
//                
//                ControladorMeuDinheiro('RELATORIOS',tipo,relatorio.ini,relatorio.fim,relatorio.sub,codigo,pai,sinal,function(r){
//                    
//                    loading.remove();
//                    
//                    r = r.trim();
//                    
//                    if(r.length){
//                        ul.addClass('loaded').toggleClass('closed').append(r);
//                        /*Adicionando evento de clique apenas se o clique foi no pai,
//                         * afinal, nao existe subcategoria de subcategorias..*/
//                        if(pai){
//                            ul.find(".linha-subcategoria").click(function(){
//                                _load.call(this,0);
//                            });
//                        }
//                    }else{
//                        jAlert('Não foram encontrados lançamentos para '+msg+'.<br><br>'+
//                                'Parece tratar-se de um erro. Por favor, entre em contato<br>'+
//                                'com <b>suporte@easyme.com.br</b>','Não foram encontrados lançamentos');
//                    }
//
//                });
//            }
//        }
//        
//        /*Clique na linha de categoria*/
//        $(".linha-categoria").click(function(){
//            _load.call(this,1);
//        });
//        
//    })();
//    
//    (function(){
//        
//        if(despesas.data.length > 0) imprime_relatorio_pizza('pizza_despesas',despesas);
//        if(receitas.data.length > 0) imprime_relatorio_pizza('pizza_receitas',receitas);
//        
//        function imprime_relatorio_pizza(renderTo,series){
//            var chart = new Highcharts.Chart({
//                chart:
//                {
//                    renderTo: renderTo,
//                    margin: [null],
//                    height: 270
//                },
//                title: null,
//                tooltip:
//                {
//                    formatter: function()
//                    {
//                        return 'Categoria: <b>'+ this.point.name +'</b><br>' +  
//                            'Percentual: <b>'+ this.percentage.number_format(2,',','.') +'%</b><br>' + 
//                            'Total: <b> R$ '+ this.y.number_format(2,',','.') +'</b><br>';
//                    }
//                },
//                plotOptions:
//                {
//                    pie:
//                    {
//                        size: "130",
//                        cursor: 'pointer',
//                        dataLabels:
//                        {
//                            enabled: true,
//                            formatter: function()
//                            {
//                                return '<b>'+ this.point.name +'</b>: '+ this.percentage.number_format(2,',','.') +' %';
//                            }
//                        },
//                        events : {
//                            click : function (e){
////                                alert('oi');
//                            }
//                        }
//                    }
//                },
//                series: [series]
//            });
//        }
//    })();
//}
//
//
//function tratar_tela_lancamentos_grupo(tipo)
//{
//}
//
//function tratar_tela_fluxo_caixa(data,portlet)
//{
//    if(!$("#graphFluxoCaixa")[0]) return;
//    
//   var x = data.x; /*Periodos*/
//   var y = data.y; /*Saldos*/
//   
//
//   if(!data.x.length) return;
//   
//   /*padding para o eixo x*/
//   var u = data.x[0].length > 5 ? 15 : 20;
//   /*Largura padrao do grafico*/
//   var w = !portlet ? $("#conteudo").width() - 10 : $("#conteudo").width() - 20 ;
//   
//   
//   var dest = $("#graphFluxoCaixa");
//   
//   dest.width(w);
//   
//   /*Calcula acrescimo na largura do grafico*/
//   var a = data.x.length > u ? (data.x.length - u) * (w/u) : 0;
//   
//   /*Aumenta largura padrao*/
//   w += a;
//   /*Teve acrescimo? coloca scroll na div do grafico*/
//   if(a != 0) dest.css("overflow-x","scroll");
//   
//   if(portlet){
//       
//        var p = dest.closest('.column').parent();
//
//        /*portlet nas colunas mais finas*/
//        if(p.attr('id') == 'top-grid'){
//            dest.closest('.portlet-content').css('overflow-x','scroll');
//        }
//        
//   }
//
//   var chart = {
//      chart: {
//         renderTo: 'graphFluxoCaixa',
//         width : w,
//         height : 300
//      },
//      title: {
//         text: 'Evolução do fluxo de caixa',
//         align : "left"
//      },
//      xAxis: {
//         categories: x,
//         tickLength : 15
//      },
//      yAxis: {
//         title: {
//            text: 'Saldo (R$)'
//         },
//         labels : {
//            formatter: function() {
//               return this.value.number_format(2,",",".");
//            }
//         },
//         lineWidth : 1,
//         gridLineDashStyle : "Dash"
//      },
//      tooltip: {
//         formatter: function() {
//                   return '<b>'+ this.series.name +'</b><br/>'+
//               this.x +': R$ '+ this.y.number_format(2,",",".");
//         }
//      },
//      plotOptions : {
//          line : {
//              lineWidth : 1
//          }
//      },
//      legend: {
//         enabled : false
//      },
//      series: [{
//              type: 'spline',
//         name: 'Saldos',
//         data: y
//      }]
//   };
//   
//   /*Plota o grafico*/
//   new Highcharts.Chart(chart);
//}
//
//function tratar_tela_evolucao_categorias(x,y,options){
//    
//    var colorO = {
//        i : 0,
//        max : Highcharts.getOptions().colors.length - 1
//    }
//    function _nextColor(){
//        if(colorO.i > colorO.max) colorO.i = 0;
//        return Highcharts.getOptions().colors[colorO.i++];
//    }
//
//    var width = $("#conteudo").width() - 2;
//    var chart;
//    
//    var _createPie = function(){
//                            
//        var catData = this.cat;
//        
//        var titulo = 'Distribuição das ' + this.series.name + ' de ' + this.category +' por categoria';
//        
//        var categorias = {
//            name : 'Categoria',
//            type : 'pie',
//            size : '60%',
//            dataLabels : { 
//                formatter: function() {
//                    if(this.percentage < 5) return null;
//                    var nome = this.point.name;
//                    var max = 10;
//                    if(nome.length > max) nome = nome.substring(0, max) + "...";
//                    return nome;
//                    
//                },
//                color: 'white',
//                distance: -30
//            },
//            data : []
//        },
//        centros = {
//            name : 'Centro',
//            type : 'pie',
//            innerSize : '60%',
//            dataLabels : {
//                formatter: function() {
////                    console.log(this);
//                    return this.percentage > 2 ? '<b>'+ this.point.name +':</b> R$'+ this.y.number_format(2,',','.')   : null;
//                },
//                distance: 30
//            },
//            data : []
//        };
//        
//        /*Montando dados para exibicao*/
//        $.each(catData,function(){
//            var cat = this;
//            var color = _nextColor();
//            this.color = color;
//            /*As categorias*/
//            categorias.data.push(this);
//            
//            /*Os centros de cada categoria*/
//            var lenCen = this.cen.length;
//            $.each(this.cen,function(i){
//                var brightness = 0.2 - (i/lenCen)/catData.length;//(j / data[i].drilldown.data.length) / 5 ;
//                this.color = Highcharts.Color(color).brighten(brightness).get();
//                /*Referencia a categoria pai (nao pode ser na posicao 'cat' por causa do grafico de colunas)*/
//                this.cate = cat.name;
//                centros.data.push(this);
//            });
//        });
//        
//        /*Usuario nao esta utilizando centros*/
//        if(centros.data.length == 0){
//            categorias.dataLabels = {
//                
//                formatter: function() {
//                    return this.point.name;
//                }
//
//
//
//           
//            };
//            
//            
//        }else{
//            titulo += ' e centro';
//        }
//        
//        titulo +=  ' (R$'+ this.y.number_format(2,',','.') +')';
//        
//        chart.setTitle({text: titulo},{text:options.p.subtitle});
//        
//        /*Removendo colunas*/
//        chart.series[0].remove(false);
//        chart.series[0].remove(false);
//        /*Criando pizzas*/
//        chart.addSeries(categorias,false);
//        chart.addSeries(centros,false);
//            
//        chart.redraw();
//        
////        console.log(categorias);
////        console.log(centros);
////        console.log(chart);
//    }
//    
//    var _createColumns = function(){
//        
//        chart.setTitle({text: options.c.title},{text: options.c.subtitle});
//        
//        chart.series[0].remove(false);
//        chart.series[0].remove(false);
//        chart.addSeries(y[0],false);
//        chart.addSeries(y[1],false);
//        
//        chart.redraw();
//
//    }
//    
//    chart = new Highcharts.Chart({
//            chart:
//            {
//                renderTo: 'graph',
//                height: 500,
//                width: width,
//                borderColor : '#fff',
//                plotBorderColor : "#fff"
//            },
//            title: {text: options.c.title},
//            subtitle: {text: options.c.subtitle},
//            tooltip:
//            {
//                formatter: function()
//                {
//                    
//                    var point = this.point;
//                    var s = '';
//                    var name = this.series.name;
//                    
//                    if (point.cat) {
//                        s = name + ':<b> R$ '+ this.y.number_format(2,',','.') +'</b><br/>'
//                        s += 'Clique para ver o detalhamento de '+ point.category +'.';
//                    } else {
//                        if(point.cate){
////                            console.log(point.cate);
//                            s = 'Categoria:<b> ' + point.cate+'</b><br/>';
//                        }
//                        s += name + ':<b> ' + point.name +'</b><br/>';
//                        s += 'Valor:<b> R$' + this.y.number_format(2,',','.') +'</b><br/>';
//                        if(point.cen){
//                            s += 'Percentual:<b> ' + this.percentage.number_format(2,',','.') +'%</b><br/>';
//                        }
//                        s += 'Clique para retornar';
//                    }
//                    return s;
//                }
//            },
////            legend : {
////                align : 'right',
////                verticalAlign : 'center',
////                layout : 'vertical'
////            },
//            plotOptions: {
//                column: {
//                    cursor: 'pointer',
//                    point: {
//                        events: {
//                            click: function() {
//                                _createPie.call(this);
//                            }
//                        }
//                    },
//                    dataLabels: {
//                        enabled: true,
//                        formatter: function(){
//                            return 'R$ ' + this.y.number_format(2,',','.') ;
//                        }
//                    }
//                },
//                pie: {
////                    size: "130",
//                    allowPointSelect: true,
//                    cursor: 'pointer',
//                    shadow: false,
////                    showInLegend : true,
////                    dataLabels:
////                    {
////                        formatter: function(){
////                            return '<b>'+ this.point.name +'</b>: '+this.percentage.number_format(2,',','.')+' %';
////                        }
////                    },
//                    events : {
//                        click : function (){
//                            _createColumns.call(this);
//                        }
//                    }
//                }
//            },
//            xAxis: {
//                categories: x
//                
//            },
//            yAxis : {
//                title : {
//                    text: 'Totais (R$)'
//                },
//                labels : {
//                    formatter : function(){
//                        return this.value.number_format(2,",",".");
//                    }
//                }
//            },
//            series: y
//        });
////        console.log(chart);
//}
//
///*Tratamento de filtros dos relatorios*/
//
//var filtros_ativos_extrato_detalhado,
//    filtros_ativos_lancamentos_categoria,
//    filtros_ativos_lancamentos_centro,
//    filtros_ativos_lancamentos_contato,
//    filtros_ativos_fluxo_caixa;
//
//function filtros_extrato_detalhado()
//{
//    /*Calculando saldos caso nao existam filtros ativos*/
//    if(!filtros_ativos_extrato_detalhado) atualizar_saldos_parciais();
//    
//    $("#dados_lancamentos #dados").filtro({
//        active_filters : filtros_ativos_extrato_detalhado,
//        event : {
//            update : function(active_filters){
//                 var ativos = $(".active_filter").length;
//                 $("#novo_fil").html( ativos > 0 ? "Filtros ativos ("+ativos+")" : "Exibir filtros") ;
//                 /* Guardando filtros ativos em 'sessao' */
//                 filtros_ativos_extrato_detalhado = active_filters;
//                 
//                 atualizar_saldos_parciais(active_filters);
//            },
//            close : function(fn){
//                __close_filtros_relatorios(fn);
//            },
//            empty : function(empty){
//                __empty_filtros_relatorios(empty)
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
//function filtros_lancamentos_grupo(tipo)
//{
//    var filtros_ativos;
//    
//
//    switch(tipo)
//    {
//        case "LANCAMENTOS_CATEGORIA" :filtros_ativos = filtros_ativos_lancamentos_categoria;break;
//        case "LANCAMENTOS_CENTRO" :filtros_ativos = filtros_ativos_lancamentos_centro;break;
//        case "LANCAMENTOS_CONTATO" :filtros_ativos = filtros_ativos_lancamentos_contato;break;
//    }
//    
//    soma_grupos();
//    
//    $("#dados_lancamentos #dados").filtro({
//        active_filters : filtros_ativos,
//        event : {
//            update : function(active_filters){
//                 var ativos = $(".active_filter").length;
//                 $("#novo_fil").html( ativos > 0 ? "Filtros ativos ("+ativos+")" : "Exibir filtros") ;
//                 /* Guardando filtros ativos em 'sessao' */
//                 switch(tipo)
//                 {
//                     case "LANCAMENTOS_CATEGORIA" :filtros_ativos_lancamentos_categoria = active_filters;break;
//                     case "LANCAMENTOS_CENTRO" :filtros_ativos_lancamentos_centro = active_filters;break;
//                     case "LANCAMENTOS_CONTATO" :filtros_ativos_lancamentos_contato = active_filters;break;
//                 }
//                 
//                 soma_grupos();
//                 
//            },
//            close : function(fn){
//                __close_filtros_relatorios(fn);
//            },
//            empty : function(empty){
//                __empty_filtros_relatorios(empty);
//            }
//        }
//    });
//    
//    function soma_grupos()
//    {
//        var j = 0 ,i = 0,parcial = 0, parcial_grupo = 0,parciald = 0, parcialr = 0;
//        
//        var receitas = 0, despesas = 0;
//        
//        $(".linha_dados").each(function(e){
//             /*Encontrei uma nova linha de total por grupo*/
//            if($(this).hasClass("linha_totais_grupo"))
//            {
//                if($(this).hasClass("geral"))
//                {
//                    if(j > 1)
//                        $(this).show().find(".total").html(parcial_grupo.number_format(2,",",".")).attr("v",parcial_grupo);
//                    else
//                        $(this).hide();
//                        
//                    parcial_grupo = 0;
//                    i = 0;
//                    j = 0;
//                }
//                /*Nao encontrei nenhuma linha para este somatorio parcial*/
//                else if(!i)
//                {
//                    $(this).hide();
//                }
//                else
//                {
//                    $(this).show().find(".total").html(parcial.number_format(2,",",".")).attr("v",parcial);
//                    /*Lancamentos por (Centro|Contato)*/
//                    if($(this).find(".receitas")[0]){
//                        $(this).find(".receitas").html(parcialr.number_format(2,",",".")).attr("v",parcialr);
//                        $(this).find(".despesas").html(parciald.number_format(2,",",".")).attr("v",parciald);
//                    }
//                    i = 0;
//                    j++;
//                }
//                parcial = 0,parciald = 0, parcialr = 0;
//            }
//            else if($(this).is(":visible"))/*Achou linha visivel de lancamento normal*/
//            {
//                var v = parseFloat($(this).attr("valor"));
//                parcial += v
//                
//                if(v < 0){
//                    parciald += v;
//                    despesas += v;
//                } 
//                if(v > 0){
//                    parcialr += v;
//                    receitas += v;
//                } 
//                
//                parcial_grupo += v;
//                i++; /*Encontrei pelo menos uma linha para este grupo, exibi-lo-ei acima*/
//            }
//        });
//        
////        $(".linha_totais_grupo:visible:not(.geral)").each(function(){
////            if($(this).find(".receitas")[0]){
////                $(this).find(".receitas").each(function(){
////                    var aux = parseFloat($(this).attr("v"));
////                    aux = parseFloat(aux.toFixed(2));
////                    receitas += aux;
////                });
////                $(this).find(".despesas").each(function(){
////                    var aux = parseFloat($(this).attr("v"));
////                    aux = parseFloat(aux.toFixed(2));
////                    receitas += aux;
////                });
////            }else{
////                $(this).find(".total").each(function(){
////                    var aux = parseFloat($(this).attr("v"));
////                    aux = parseFloat(aux.toFixed(2));
////                    if(aux > 0) receitas += aux;
////                    else        despesas += aux;
////                });
////            }
////        });
////        $(".linha_totais_grupo:visible:not(.geral) .total").each(function(){
////            var aux = parseFloat($(this).attr("v"));
////            aux = parseFloat(aux.toFixed(2));
////            if(aux > 0) receitas += aux;
////            else despesas += aux;
////        });
//        var total = receitas + despesas;
//        
//        $("#soma_despesas").html("R$ " + despesas.number_format(2,",","."));
//        $("#soma_receitas").html("R$ " + receitas.number_format(2,",","."));
//        $("#soma_total").html("R$ " + total.number_format(2,",",".")).
//            removeClass("saldo_negativo saldo_positivo saldo_zerado").
//            addClass(total<0 ? "saldo_negativo" : total > 0 ? "saldo_positivo" : "saldo_zerado" );
//    }
//}
//
//function filtros_fluxo_caixa()
//{
//    $("#dados_lancamentos #dados").filtro({
//        active_filters : filtros_ativos_fluxo_caixa,
//        event : {
//            ajax: function(active_filters){
//                 var ativos = $(".active_filter").length;
//                 $("#novo_fil").html( ativos > 0 ? "Filtros ativos ("+ativos+")" : "Exibir filtros") ;
//                 /* Guardando filtros ativos em 'sessao' */
//                 filtros_ativos_fluxo_caixa = active_filters;
//                carregar_relatorio_sem_cabecalho("FLUXO_CAIXA",active_filters.conta);
//            },
//            close : function(fn){
//                __close_filtros_relatorios(fn);
//            },
//            empty : function(empty){
//                __empty_filtros_relatorios(empty)
//            }
//        }
//    });
//}
//
///**
// * Rotina comum a todos os filtros nos relatorios
// */
//function filtros_relatorios_iniciar(tipo)
//{
//    $("#novo_fil").click(function(){
//        $("#filtros_relatorios").slideDown(100).attr({visible:true});
//        $(this).fadeOut(0);
//    });
//    
//    switch(tipo)
//    {
//        case "EXTRATO_DETALHADO":filtros_extrato_detalhado();break;
//        case "FLUXO_CAIXA":filtros_fluxo_caixa();break;
//        case "LANCAMENTOS_CATEGORIA": 
//        case "LANCAMENTOS_CENTRO": 
//        case "LANCAMENTOS_CONTATO":filtros_lancamentos_grupo(tipo);break;
//    }
//}
//
///**
// * Rotina comum a todos os filtros nos relatorios
// */
//function __close_filtros_relatorios(fn)
//{
//    $("#filtros_relatorios").slideUp(100,function(){
//        $(this).attr({visible:0});
//        $("#novo_fil").fadeIn(0,function(){
//            var ativos = $(".active_filter").length;
//            if(ativos > 0) $(this).html("Filtros ativos ("+ativos+")");
//            else $(this).html("Exibir filtros");
//        });
//    });
//}
//
///**
// * Rotina comum a todos os filtros nos relatorios
// */
//function __empty_filtros_relatorios(empty)
//{
//    if(empty)
//    {
//        $("#dados").fadeOut(0,function(){
//            $(this).siblings("#mensagem").remove();
//            $(this).before("<div id='mensagem'  class='mensagem-informativa float-left'>"+
//                "Não existem lançamentos cadastrados para os filtros escolhidos.</div>");
//        });
//    }
//    else
//    {
//        $("#dados").fadeIn(0,function(){
//            $(this).siblings("#mensagem").remove();
//        });
//    }
//
//}

(function(window,MD,$){
    
var 
/*Construtor*/
CartaoCredito = function(){},
/*Atalho*/
fn = CartaoCredito.prototype,
/*Calendario de periodos da agenda*/
calendario,
/*Filtros da tela de movimentacoes*/
filtros,
hashMonitor = new MD.HM(),
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('CARTOES');

/*Expondo metas ao MD Global*/
MD.CartaoCredito = new CartaoCredito;

MD.CartaoCredito.codigo = undefined;

var ultimoCodigo,ultimoVencimento;

/*Guarda os filtros ativos da tela de fatura*/
fn.filtros_ativos = undefined;
    
var pagina = fn.pagina = function(codigo,vencimento){
    preparaExibicao("link_cabecalho_cartao_de_credito");
    hashMonitor.init();
    Ajax("HEADER",codigo || MD.CartaoCredito.codigo,function(r){
        
        if(!hashMonitor.check()) return;
        
        conteudo(r,"#conteudo",function(){
            
            if(!$("#error")[0]){ // Sem cartoes cadastrados
                
                if(!hashMonitor.check()) return;
                eventosHeader();
                var padrao = $("#select_cartoes").val(),
                vencPadrao = $("#select_cartoes option:selected").attr('venc');
                fatura(codigo || padrao,vencimento || vencPadrao);
                filtros = criarFiltros();
            }
        });
        
    });
};

function eventosHeader(){
    
    /*Monitora scroll header*/
    $(".agenda-header").scrollwatchmd();
    
    var basico = $(".agenda-header").hasClass('b');
    
    var codigo = $("#select_cartoes").change(function(){
        pagina(this.value,$(this).attr('venc'));
    }).val();
    
    var vencimento = $("#select_cartoes option:selected").attr('venc');
        
    $("#botao_pagamento_cc").click(function(){
        if(!basico)
            MD.Lancamentos.editar(new MD.Lancamento({
                cadastros : {conta:codigo}
            }),'PAGAMENTO');
        else 
            erro_funcionalidade_premium();
    });
    
    $(".btn-novo-lancamento").click(function(){
        if(!basico){
            var tipo;
            
            if($(this).hasClass('transferencia')) tipo = 'T';
            else if($(this).hasClass('receita')) tipo = 'R';
            else tipo = 'D';
            
            MD.Lancamentos.editar(new MD.Lancamento({
                tipo : tipo,
                cadastros : {conta:codigo}
            }),'CARTAO');
        }
        else 
            erro_funcionalidade_premium();
    });
    
    $("#novo-lancamento-grupo").click(function(){
        if(!basico)
            MD.Lancamentos.editar(new MD.Lancamento({
                cartao : true,
                cadastros : {conta:codigo}
            }),'GRUPO');
        else 
            erro_funcionalidade_premium();
    });
    

    $("#print-fatura").click(function(){
        window.print();
    });
    
    $("#btn-importar-lancamentos").click(function(){
        if(!basico)
            MD.Importacao.escolhaModo({
                'conciliacao' : false,
                'importacao' : true
            },null,codigo);
        else 
            erro_funcionalidade_premium();
    });
    
    
    /*Se a fatura esta vencida (e nao existe outro alert ja aberto, pagamento por exemplo), notifica o usuario*/
    if( $("#header-cc").attr("vencida") == '1' && !$("#popup_container")[0] && $("#header-cc").attr("inativa") == '0'){
        jAlert('Recomendamos fortemente que você realize o fechamento desta fatura<br/>' + 
                ' para que a data de vencimento da mesma evolua para o próximo mês.'
                , 'Fatura vencida');
    }
        
    (function(){
        var exibicao = {
            aberta : $(".agenda-header .aberta"),
            display : $("#data-fatura"),
            rea : $("#botao_abrir_cc")
        } ,
        fechadas = $.parseJSON( $("#faturas-fechadas").html() );

        calendario = MD.headerPeriodos({
            text : {
                abutton : 'Fatura atual',
                escolhaPeriodoTitulo : 'Ir para fatura de'
            },
            exec : function(vencimento){
                fatura(codigo,vencimento);
            },
            exibicao: function(datas){

                var dataFaturaFechada = fechadas[datas.ini.substring(0,7)];
                /*Usa a data de fechamento original da fatura*/
                var ini = dataFaturaFechada ? dataFaturaFechada : datas.ini;
                /*Fatura aberta em exibicao*/
                var a = ini == datas.base,
                /*Penultima fatura em exibicao*/
                p = diff_date(datas.ini,datas.base,'MONTH') == -1; 

                $("#acoes-lote").toggle(!dataFaturaFechada);
                exibicao.aberta.toggle( a );
                exibicao.rea.toggle( p );
                

                /*Escrevendo nome personalizado para cartao*/
                this.desc.o.find('.nomeMeses').html( 'Fatura - ' + ini.format_date_br() );
            },
            validate : function(data){
                /*Antes da primeira fatura ?*/
                if( data < this.min ){
                    jAlert('A primeira fatura deste cartão é em: <b>' + this.min.format_date_br() +'</b>.', 'Periodo inválido');
                    return false ;
                }
                return true;
            }
        });
    })();
    
    FechamentoFatura.init();
    
    $("#botao_abrir_cc").click(function(){
        if(!basico) reabrirFatura()
        else erro_funcionalidade_premium();
    });
}

var fatura = fn.fatura = function(codigo,vencimento){ 
    ultimoCodigo = codigo || ultimoCodigo;
    ultimoVencimento = vencimento || ultimoVencimento;
    
    display_loading_gif_ajax("#lancamentos-fatura");
    Ajax("FATURA",ultimoCodigo,ultimoVencimento,function(r){
        conteudo(r,"#lancamentos-fatura",function(){
            eventosFatura(codigo,vencimento);
        });
        if($(".fatura-linha-plastico").length == 1) $(".fatura-linha-plastico").hide();
        
        
    });
};

function eventosFatura(codigo,vencimento){
    
                
    MD.RP.onChangeState = function(state){ MD.C.set('Cartoes.rightPanel.status',state); }
    MD.RP.changeState(MD.C.get('Cartoes.rightPanel.status'));
    
    MD.AcoesLote.eventos();
    FechamentoFatura.update();
    filtros.update();
    
    $('td.detailed i').detailedmd({p0:'LANCAMENTOS' , p1: 'DETAILED'});
    
    var codigo = $("#select_cartoes").val();
    
    actionsmd();
    
    $("#info-parcelas").click(function(){
       info_parcelamento(codigo,vencimento);
    });
    
    /*Abrir e fechar de cada plastico*/
    $('.fatura-linha-plastico span').click(function(){
        var cod = $(this).closest('tr').attr('cod');
        $(this).closest('tr').siblings('.fatura-linha-plastico-' + cod + ':not(.filtered)').toggle();
    });
      
    
    function _exec(link,fn){
        var linha      = $(link).closest("tr");
        var codigol     = linha.attr("cod");
        var virtual    = linha.attr("virtual");
        var grupo    = linha.attr("grupo");
        fn(codigol,virtual,codigo,grupo);
    }
    
    $(".editar_lancamento").click(function(){ _exec(this,editarLancamento); });
    $(".editar_pagamento").click(function(){ _exec(this,editarPagamento); });
    $(".editar_parcela").click(function(){ _exec(this,editarParcela); });
    $(".excluir_lancamento").click(function(){ _exec(this,excluirLancamento); });
    $(".clonar_lancamento").click(function(){ _exec(this,clonarLancamento); });
    $(".mover_lancamento").click(function(){ _exec(this,moverLancamento); });
    $(".conciliar_lancamento").click(function(){ _exec(this,conciliarLancamento); });
    $(".desconciliar_lancamento").click(function(){ _exec(this,function(codigo,_x,_y,grupo){
            desconciliarLancamento(codigo,grupo);
    }); });
    $(".mudar_fatura_lancamento").click(function(){ _exec(this,function(codigol,virtual,conta){
            mudarFaturaLancamento(codigol,virtual,conta,vencimento);
    }); });
    
    $(".data-row").off('dblclick').dblclick(function(){
        var a = $(this).find('.editar_lancamento,.editar_parcela,.editar_pagamento').not('.action-button-disabled');
        if(a[0]){
            var cod = $(this).attr('cod'),
                virtual = $(this).attr('virtual'),
                grupo = $(this).attr('grupo'),
                tipo = $(a).is('.editar_lancamento') ? 'CARTAO' : 
                       ($(a).is('.editar_parcela') ? 'PARCELA' : 'PAGAMENTO');
               
               if(tipo == 'CARTAO' && grupo) tipo = 'GRUPO';

            if(cod) MD.Lancamentos.editar(new MD.Lancamento({
                codigo : cod,
                virtual : virtual,
                cartao : true,
                grupo : grupo,
                cadastros : {conta: codigo}
            }),tipo)
        }
    });
}

function info_parcelamento(contaId,vencimento){
    
    var d = new jDialog({
        title : "Parcelas futuras",
        ajax : function(){
            Ajax('INFO_PARCELAMENTO',contaId,vencimento,function(r){
               d.html(r).center(); 
            });
        },
        buttons : {
            'Fechar' : function(){
                d.close();
            }
        }
    });
}

function reabrirFatura(){
    var aux = $("#info-fatura");
    var fatura = {
       codigo : aux.attr("cod"),
       conta : aux.attr("conta"),
       vencimento : aux.attr("venc")
    };
    jConfirm("Ao reabrir esta fatura a data do próximo vencimento"+
            "<BR/>passará a ser dia <b>" + fatura.vencimento.format_date_br() + 
            "</b> e o dia de vencimento <b>"+fatura.vencimento.substr(8,2)+
            "</b>.<BR/>Deseja reabrir esta fatura? ","Reabrir fatura",
       function(r){
        if(r){
            Ajax("REABRIR_FATURA",JSON.stringify(fatura),function(r){
                pagina();
            });
        }
    },{ok:"Sim",cancel:"Não"});
}

var FechamentoFatura = fn.FechamentoFatura =  (function(){
    
    var F = function(){},
    fn = F.prototype,
    filtrosFechamento,
    fechando = false;
    
    fn.init = function(){
        fechando = false;
        var basico = $(".agenda-header").hasClass('b');
        $("#botao_fechar_cc").click(function(){
            if(!basico){
                fechando = true;
                update();
                MD.RP.toggleStatic(true);
            }else{
                erro_funcionalidade_premium();
            }
                
        });
        _toggle();
    }
    
    var update = fn.update = function(){
        
        $("#cancelar_fechamento").off('click').click(function(){
            fechando = false;
            _toggle();
            MD.RP.toggleStatic(false);
        });
        
        $("#confirmar_fechamento").off('click').click(_fechar);
        
        _toggle();
        var inputs = $(".checkbox-fechamento:not(.checkbox-fechamento-master)"),
        master = $(".checkbox-fechamento-master");
        master.change(function(){ inputs.prop('checked',this.checked); });
        inputs.change(function(){ master.prop('checked',inputs.not(':checked').length == 0); })
        inputs.add(master).click(_updateResumo);
        
        if(fechando) _updateResumo();
    }
    
    function _updateResumo(){
        var anterior = $("#saldo_anterior").html().parseFloat(),
        totais = {
            p : 0, //Pagtos
            r : 0, //Receitas
            d : 0, //Despesas
            t : anterior  //Total
        },parciais = {};
        $(".checkbox-fechamento:not(.checkbox-fechamento-master):checked").each(function(){
            var l = $(this).closest('tr'),
            valor = parseFloat(l.attr('valor')),
            tipo = l.attr('tipo'),
            p = tipo == 'TRANSFERENCIA',
            plastico = l.attr('plastico');
            
            if(p && valor > 0) totais.p += valor;
            else if(valor > 0) totais.r += valor;
            else if(valor < 0) totais.d += valor;
            totais.t += valor;

            if(plastico){
                if(!parciais[plastico]) parciais[plastico] = 0;
                parciais[plastico] += valor;
            }
        });
        
        $("#pagamentos_fatura").html(totais.p.formatCurrency(true));
        $("#creditos_fatura").html(totais.r.formatCurrency(true));
        $("#despesas_fatura").html(totais.d.formatCurrency(true));
        $("#total_fatura").html(totais.t.formatCurrency(true)).corSaldo(totais.t);
        
        var z = 0;
        $(".total_adicional").html(z.formatCurrency(true)).corSaldo(z);
        $.each(parciais,function(k,v){
            $("#total_adicional"+k).html(v.formatCurrency(true)).corSaldo(v);
        })
    }
    
    function _fechar(){
        
        jConfirm("Confirma o fechamento desda fatura?<BR><BR>"+
                 "<b style='color:red;'>Importante:</b> após o fechamento, o valor da fatura "+
                 "deixa de aparecer nas suas movimentações<BR> e de compor seu fluxo "+
                "de caixa. Para que o valor continue compondo os mesmos, é "+
                "necessário<BR>agendar um pagamento para a fatura.", "Fechamento fatura", function(r){
            if(r)
            {
                /*Venciment desta fatura*/
                var vencimento = $("#total_fatura").attr("data");
                /*Valor total que sera pago nesta fatura*/
                var valor = $("#total_fatura").html().parseFloat();
                /*Codigo desta conta corrente*/
                var conta = $("#total_fatura").attr('cod');
                /*Array com os lancamentos que serao incluidos nesta fatura*/
                var lancamentos = [];

                /*Pega apenas os checkbox selecionados*/
                $(".checkbox-fechamento:not(.checkbox-fechamento-master):checked").each(function(){

                    var linha = $(this).closest("tr");
                    var codigo = linha.attr("cod");
                    var tipo = linha.attr("tipo").trim().charAt(0);
                    var virtual = linha.attr("virtual");
                    var valor = linha.attr("valor");
                    var data = linha.attr("data");
                    var plastico = linha.attr("plastico");
                    var numero_parcela = linha.attr("numero_parcela");
                    var grupo = linha.attr("grupo");

                    var l = new MD.Lancamento({
                        codigo: codigo,
                        tipo: tipo,
                        virtual : virtual,
                        grupo : grupo,
                        valor : { efetivo : valor },
                        data  : {efetiva:data, anterior : data},
                        status: { confirmado: 1, conciliado: 1 },
                        cadastros : { plastico : plastico},
                        repetir : {nparcela : numero_parcela}
                    });

                    lancamentos.push(l.options());
                });

                var fatura = {
                    lancamentos : lancamentos,
                    conta : conta,
                    valor : valor,
                    vencimento : vencimento
                };

                /*Deve ser antes da chamada AJAX pq senao vai recarregar a tela*/
                var gerar_pgto = $("#gerar_pagamento:checked")[0];

                Ajax("FECHAR_FATURA",JSON.stringify(fatura),function(r){

                    pagina();

                    if(gerar_pgto)
                    {
                        MD.Lancamentos.editar(new MD.Lancamento({
                            valor : {previsto: valor},
                            data : {prevista: vencimento},
                            cadastros : {conta: conta}
                        }),'PAGAMENTO');
                    }
                });
            }
        },{ok:"Sim",cancel:"Não"});
        
    }
    
    function _toggle(){
        $('.fechamento').toggle(fechando);
        $('.nfechamento').toggle(!fechando);
        
        if(filtros){
            if(fechando){
                filtrosFechamento = filtros.encode();
                filtros.clear();
            }else{
                filtros.loadFilters(filtrosFechamento);
            }
        }
    }
    
    return new F;
    
})();


    
/*Gerencia os filtros da tela de fatura.*/    
function criarFiltros(){ 

    var _save = function(){
        MD.C.set("Cartoes.filters.activeFilters",this.encode(),function(){
            jAlert("Suas configurações de filtros foram salvas com sucesso.","Salvar filtros");
        });

    },
    _update = function(){
        var eaf = this.encode();

        var visible = [], hidden = [];
        $.each(this.getRows(),function(){
            if(this.isOn()) visible.push(this);
            else hidden.push(this);
                
        });
        /*Salvando em sessao*/
        MD.C.setv("Cartoes.filters.activeFilters",!$.isEmptyObject(eaf) ? eaf : null);
        
        MD.AcoesLote.eventos();
        
        $('.fatura-linha-plastico').each(function(){
            var cod = $(this).attr('cod');
            $(this).toggle( $(this).siblings('.fatura-linha-plastico-' + cod + ':visible').length > 0 );
        });
        
        if(hidden.length > 0){
            $(".info_filtrado").html("RS 0,00").corSaldo(0);
            var pant = null, v = 0,vt=0,qtd = 0;
            
            $.each(visible,function(){
                var plastico = $(this.dom).attr('plastico');
                if(pant != plastico){
                    vt += v;
                    qtd++;
                    v = 0;
                }
                v += $(this.dom).find('.col-valor:first').html().parseFloat();
                $("#info_filtrado_"+plastico).html(v.formatCurrency(true)).corSaldo(v);
                pant = plastico;
            });
            vt += v;
            $("#linha_info_filtrado_total").toggle(qtd > 1).find("#info_filtrado_total").html(vt.formatCurrency(true)).corSaldo(vt);
        }
        $('.table_filtrados_fatura').toggle(hidden.length > 0);
        
    }

    return new TableFilter('.table-agenda',{
        activeFilters : MD.C.getv('Cartoes.filters.activeFilters') || MD.C.get('Cartoes.filters.activeFilters'),
        visible : MD.C.get('Cartoes.filters.opened'),
        events : {
            show : function(){MD.C.set('Cartoes.filters.opened',true)},
            hide : function(){MD.C.set('Cartoes.filters.opened',false)},
            save : _save,
            update : _update,
            restore : function(){  this.loadFilters( MD.C.get('Cartoes.filters.activeFilters') ); }
        }
    });
}

var editar = fn.editar = function(codigo){
    
    var d,
    f = {
        valor : null,
        limite : null,
        proxVenc : null,
        diaVenc : null,
        min : null,
        max : null
    },
    _tela = function(){
        Ajax('EDITAR',codigo,function(r){
            d.html(r).showButtons();
            
            qtitle();
            
            f.valor = $("#input_valor_novo_cartao").priceFormat();
            f.limite = $("#input_limite_novo_cartao").priceFormat();

             /*Campo de proximo vencimento*/
            f.proxVenc = $("#input_proximo_vencimento_novo_cartao");
            f.min = f.proxVenc.attr('min');
            f.max = f.proxVenc.attr('max');

            /*No blur do campo de dia, sugere proximo vencimento*/
            f.diaVenc = $("#input_dia_vencimento_novo_cartao");

            $("#compoe_saldo").click(function(){
                if(!this.checked) $(this).parent().siblings("td").hide();
                else  $(this).parent().siblings("td").show();
            });

            _sugestaoVencimento();

            var adicionais = $(".linha_adicional:not(.template)") , 
                num_adicionais = adicionais.length , 
                max_adicionais = 5,
                /*Template da linha de cartao adicional*/
                template_adicional = $(".linha_adicional.template"),
                table = template_adicional.closest("table"),
                /*Botao de adicioar linha*/
                add = $("#mais_adicional");

            if(num_adicionais >= max_adicionais) add.hide();
            /*Adiciona evento de rehabilitar uma linha adicional*/
            adicionais.find(".habilitar_adicional").click(function(){
                /*Remove linha com o clone*/
                $(this).hide().siblings("input").attr("disabled",false).siblings(".menos_adicional").show().siblings(".caixa_excluir_mover").hide();
            });
            adicionais.add(template_adicional).find(".menos_adicional").click(function(){
                if($(this).siblings("input").attr("cod") && $(this).siblings("input").attr("cod") != "")
                {
                    var that = this;
                    jConfirm("Os lançamentos associados a este cartão serão movidos para o cartão titular.","Remover cartão adicional",function(r){
                        if(r){
                            /*Remove linha com o clone*/
                            $(that).hide().siblings("input").attr("disabled",true).siblings(".habilitar_adicional,.caixa_excluir_mover").show();
                        }
                    },{ ok: 'Confirmar' })
                }
                else
                {
                    $(this).closest(".linha_adicional").remove();
                    /*Verifica limite*/
                    if(--num_adicionais < max_adicionais) add.show();
                }
                d.scroll.update();
            });
            
            add.click(function(){
                /*Cria uma copia profunda (eventos e filhos) do template*/
                var clone = template_adicional.clone(true,true);
                /*Adiciona linha com o clone*/
                $(".linha_adicional").last().after(clone);
                /*Exibe o clone*/
                clone.removeClass("template").show().find(".nome_adicional").focus();
                /*Verifica limite*/
                if(++num_adicionais >= max_adicionais) $(this).hide();
                
                d.scroll.update();
            });
            
        })
    },
    _salvar = function(){
        
        /*Eh para fechar ou continuar apos criacao?*/
        var fechar = $(this).hasClass("fechar");
        
        var nome = $("#input_nome_novo_cartao").validate({
            alert : true,
            msg : "Informe um nome para o cartão de crédito",
            func : function(f){
                return $(f).val().length > 0;
            }
        });
        /*Saldo inicial*/
        var saldo = f.valor.val().parseFloat();
        /*Limite*/
        var vLimite = f.limite.val().parseFloat();
        /*Saldo devedor ou credor?*/
        var sinal = $("input[name='sinal_saldo']:checked").val();
        saldo *= sinal;

        var vencimento = f.proxVenc.validate({
            alert: true,
            msg : "Dia de vencimento inválido. Deve estar entre 1 e 28.",
            func : function(f){
                var v = $(f).val(),
                    dia = parseFloat(v.substr(0, 2));
                
                return !isNaN(dia) && dia >= 1  && dia <= 28 ;
            }
        });
        
        var proximo_vencimento = f.proxVenc.val().replaceAll(" ","").formatDateMySql();
        var data_inicial = f.proxVenc.is(":disabled") ? f.proxVenc.attr("inicial") : sub_date(proximo_vencimento, 1, "MONTH");
        
        var titular_codigo = $("#input_titular_novo_cartao").attr("cod");
        var titular_nome = $("#input_titular_novo_cartao").validate({
           alert : true ,
           msg : "O cartão deve possuir um titular",
           func : function(f){
                return $(f).val().length > 0;
           }
        });
    
        var adicionais = [];
        $(".linha_adicional:not(.template)").each(function(){
            var i = $(this).find(".nome_adicional");
            var v = i.val().trim();
            var c = i.attr("cod");
            var h = i.attr("disabled") ? 0 : 1;
            
            if(v.length > 0) adicionais.push({
                codigo : c,
                nome   : v,
                habilitado: h
            });
        });
        
        var campo_da = $("#debito_automatico");
        var conta_debito_automatico = campo_da.is(":visible") ? campo_da.val() : "NULL";
        var compoe_saldo = $("#compoe_saldo:checked").length;
        var exibir_visao_geral = $("#exibir_visao_geral:checked").length;
        var exibir_app = $("#exibir_app:checked").length;
        
        var ativa = $("input[name='status-conta']:checked").val();
        
        /*Se existe limites, verifica se a data esta dentro deles*/
        var proximaValida = (!f.max && !f.min) || ( datecmp(proximo_vencimento,f.min) >= 0 && datecmp(proximo_vencimento,f.max) <= 0) ;
        
        if(!proximaValida){
            alert('Para mudar o mês do próximo vencimento, você deve primeiro fechar a fatura em aberto.');
        }
        /*Campos obrigatorios validos?*/
        if(nome && vencimento && titular_nome && proximaValida)
        {
            var cartao = {
                codigo            : codigo,
                nome              : nome.trim(),
                saldo             : saldo,
                limite            : vLimite,
                dia_vencimento    : f.diaVenc.val(),
                proximo_vencimento: proximo_vencimento,
                data_inicial      : data_inicial,
                titular           : {
                    codigo : titular_codigo.trim(),
                    nome   : titular_nome.trim()
                },
                adicionais        : adicionais,
                compoe_saldo      : compoe_saldo,
                exibir_visao_geral      : exibir_visao_geral,
                exibir_app      : exibir_app,
                conta_debito_automatico : conta_debito_automatico,
                ativa : ativa
            }
            Ajax("EDITAR_CARTAO_CREDITO",JSON.stringify(cartao),function(r){
                MD.Contas.pagina(); 
                d.close();
            });
            return true;
        }
        return false;
    },
    _sugestaoVencimento = function(){
        var sugestao;
        var data_anterior = $("#span_saldo_fatura_anterior"),
            prox_venc = $("#input_proximo_vencimento_novo_cartao");

        $("#input_dia_vencimento_novo_cartao").numeric();

        var min = prox_venc.attr('min'),
            max = prox_venc.attr('max');

        if(min){
            min = min.split('-');
            min = new Date(parseFloat(min[0]), parseFloat(min[1])-1,parseFloat(min[2]) );
        }

        if(max){
            max = max.split('-');
            max = new Date(parseFloat(max[0]), parseFloat(max[1])-1,parseFloat(max[2]) );
        }

         /*Campo de proximo vencimento*/
        prox_venc.current_date_format().calendario({
            minDate : min,
            maxDate : max,
            onClose : function(){
                /*Coloca data do saldo anterior como 1 mes atras do valor do campo no datePicker*/
                var data = $(this).val().length > 0 ? $(this).val().replaceAll(" ","").formatDateMySql() : null;
                data_anterior.html(!data ? "anterior" : get_date("d/m/Y",sub_date(data,1,"MONTH")));
            }
        }).blur(function(){
            /*Coloca data do saldo anterior como 1 mes atras do valor do campo no datePicker*/
            var data = $(this).val().length > 0 ? $(this).val().replaceAll(" ","").formatDateMySql() : null;
            data_anterior.html(!data ? "anterior" : get_date("d/m/Y",sub_date(data,1,"MONTH")));
        }).focus(function(){
            /*Coloca data do saldo anterior como 1 mes atras do valor do campo no datePicker*/
            var data = $(this).val().length > 0 ? $(this).val().replaceAll(" ","").formatDateMySql() : null;
            data_anterior.html(!data ? "anterior" : get_date("d/m/Y",sub_date(data,1,"MONTH")));
        });
    };
    
    var buttons = {};
    
    buttons['Salvar'] = _salvar;
    if(!codigo){
        buttons['Salvar e continuar'] = function(){
            if(_salvar()) 
                editar();
        };
    }
    buttons['Cancelar'] = function(){ d.close(); };
    
    d = new jDialog({
        title : (codigo ? 'Editar' : 'Novo') + ' cartão de crédito',
        showButtons : false,
        scroll : {
            enabled : true, 
            o : '.cad-main-ul'
        },
        ajax : _tela,
        buttons : buttons
    });
};
    
var excluir = fn.excluir = function(codigo,nome,auth){
    
    var _func = function(){
        MD.Contas.Ajax("EXCLUIR",codigo,0,function(){
            MD.Contas.pagina(); 
        });
    }
    
    jConfirm("<b>Conta: "+nome+"</b><br>Todos os lançamentos desta conta serão <b>permanentemente excluídos</b>.<br><b>Este é um processo irreversível!</b><br>Confirma a exclusão?","Excluir conta cartão",function(r){
        if(r){ 
            if(auth){
                popup_confirmacao_senha(_func);
            }else{
                _func();
            }
        }
    },{ok:"Sim",cancel:"Não"});
};


function _editarLancamento(codigo,virtual,conta,tipo,grupo){
    MD.Lancamentos.editar(new MD.Lancamento({
        cartao : true,
        codigo : codigo,
        virtual : virtual,
        grupo : grupo,
        cadastros : {conta: conta}
    }),tipo);
}

var editarLancamento = fn.editarLancamento = function(codigo,virtual,conta,grupo){
    _editarLancamento(codigo,virtual,conta,!grupo ? 'CARTAO' : 'GRUPO',grupo);
};

var editarPagamento = fn.editarPagamento = function(codigo,virtual,conta,grupo){
    _editarLancamento(codigo,virtual,conta,'PAGAMENTO',grupo);
};

var editarParcela = fn.editarParcela = function(codigo,virtual,conta,grupo){
    _editarLancamento(codigo,virtual,conta,'PARCELA',grupo);
};

var conciliarLancamento = fn.conciliarLancamento = function(codigo,virtual,conta,grupo){
    var 
    l = new MD.Lancamento({
        codigo : codigo,
        virtual : virtual,
        grupo : grupo,
        cadastros : {conta: conta}
    }),
    d = new jDialog({
        title : 'Conciliar lançamento',
        showButtons : false,
        ajax : function(){
            MD.Lancamentos.Ajax('TELA_CONCILIACAO_CARTAO',l.encode(),function(r){
                d.html(r).showButtons().center();
                
                if(d.dialog.find('#error')[0]){
                    var text = d.dialog.find('#error').html();
                    d.close();
                    jAlert(text,"Conciliar lançamento");
                    return;
                }
                
                /*Formata mascara do campo de valor*/
                $("#valor_efetivacao").priceFormat();
            });
        },
        buttons : {
            'Conciliar' : function(){
                var btn = this;
                
                var dados = $("#hiddendata"),
                tipo = dados.attr('tipo'),
                fator = dados.attr('fator') == 'R' ? 1 : -1,
                /*Valor da confirmacao*/
                valor = l.option('valor.efetivo',$("#valor_efetivacao").val().parseFloat() * fator);

                if($("#valor_efetivacao").validate({
                    func:function(){
                        return $(this).valida_campo_valor();
                    }
                }) === false) return;
                
                btn.disable('Conciliando...');
                
                Ajax('CONCILIAR_LANCAMENTO',l.encode(),function(r){
                   if(r != '0'){
                       d.close();
                       fatura();
                   }else{
                       jAlert('Houve um problema ao tentar conciliar este lançamento.<br>Por favor, tente novamente.','Falha ao conciliar');
                       btn.enable();
                   }
                });
            },
            'Cancelar' : function(){
                d.close();
            }
        }
    });
    
};

var desconciliarLancamento = fn.desconciliarLancamento = function(codigo,grupo){
    Ajax('DESCONCILIAR_LANCAMENTO',codigo,grupo,function(){
        fatura();
    });
};

var excluirLancamento = fn.excluirLancamento = function(codigo,virtual,conta,grupo){
    MD.Lancamentos.excluir(new MD.Lancamento({
        codigo : codigo,
        virtual : virtual,
        grupo : grupo,
        cadastros : {conta : conta}
    }));
};

var clonarLancamento = fn.clonarLancamento = function(codigo,virtual,conta,grupo){
    MD.Lancamentos.editar(new MD.Lancamento({
        clone : codigo,
        cartao : true,
        virtual : virtual,
        grupo : grupo,
        cadastros : {conta: conta}
    }),!grupo ? 'CARTAO': "GRUPO");
};
    
    
var moverLancamento = fn.moverLancamento = function(codigo,virtual,conta,grupo){
    var 
    l = {
        codigo : codigo,
        virtual : virtual,
        conta : conta,
        grupo : grupo
    },
    d = new jDialog({
        title : 'Mover lançamento para...',
        showButtons : false,
        ajax : function(){
           
            Ajax('MOVER_LANCAMENTO',JSON.stringify(l),function(r){
                d.html(r).showButtons().center();
                var sel_contas = $("#mover-lanc-contas"),
                _showPlasticos = function(){
                    var sel = sel_contas.val();
                    $(".mover-lan-plasticos").hide();
                    $("#mover-lanc-plasticos-" + sel).show();
                };
                sel_contas.change(_showPlasticos);
                _showPlasticos();
            });
        },
        buttons : {
            'Mover' : function(){
                
                var plastico = $(".mover-lan-plasticos:visible").val(),
                    conta = $('#mover-lanc-contas').val();
                
                l.conta = conta;
                l.plastico = plastico;
                
                Ajax('ALTERAR_CONTA_LANCAMENTO',JSON.stringify(l),function(r){
                    if(r == '0'){
                        jAlert('Ocorreu uma falha ao tentar mover este lançamento.<br>Por favor, tente novamente.','Falha ao mover este lançamento');
                    }else{
                        d.close();
                        fatura();
                        jAlert('O lançamento foi atualizado com sucesso','Lançamento atualizado');
                    }
                });
            },
            'Cancelar' : function(){d.close();}
        }
    });
    
};
  
  
//var moverLancamento = fn.moverLancamento = function(codigo,virtual,conta,vencimento){
//
//    
//};
 

})(window,window.MD,jQuery);
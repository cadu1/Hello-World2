(function(window,MD,$){
    
var 
/*Construtor*/
AcoesLote = function(){},
/*Atalho*/
fn = AcoesLote.prototype,
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('ACOESLOTE');

/*Expondo metas ao MD Global*/
MD.AcoesLote = new AcoesLote;


var eventos = fn.eventos = function(){
     
    var master = $(" .checkbox-lanc .checkbox-controler");
     
    var checkboxes = $(" .checkbox-lanc .checkboxsquare:not(.checkbox-controler):visible ").unbind('click').click(function(){
         /*Inverte este checkbox*/
         _toggle($(this));
         /*Checa master se todos estiverem marcados, ou desmarca caso contrario*/
         _toggle(master,_allChecked());
         master.prop('checked',_allChecked());
         /*Se tiver pelo menos um marcado, exibe barra*/
         $("#acoes-lote").toggleClass('disabled',_size() > 1);
         
         _atualiza_cabecalho_marcados();
     }); 
     
     master.unbind('click').click(function(){
         /*Se esta marcado...*/
         if($(this).hasClass("checked"))
             /*...desmarca todos*/
             _uncheck(checkboxes);
         else
             /*Marca todos*/
             _check(checkboxes);
         
         _atualiza_cabecalho_marcados();
         _init();
     });
     

    /**
    * Inverte estado atual do checkbox
    * @param checkbox Checkbox a ser checado
    * @param check Eh para checar ou nao ? [opcional]
    **/
    function _toggle(checkbox,check){
        
        if( check !== true && (checkbox.hasClass("checked") || check === false) )
            _uncheck(checkbox);
        else
            _check(checkbox);
    }

    /* Marca um checkbox */
    function _check(checkbox){
        checkbox.addClass("checked");
        checkbox.not('.checkbox-controler').addClass("icon-check").removeClass('icon-check-empty').closest('tr').addClass('checked');
    }

    /* Desmarca um checkbox */
    function _uncheck(checkbox){
        checkbox.removeClass("checked");
        checkbox.not('.checkbox-controler').addClass("icon-check-empty").removeClass('icon-check').closest('tr').removeClass('checked');
    }
    
    /*Todos estao checados ?*/
    function _allChecked(){
        /*Tamanho de todos os checkeboxes visiveis na tela*/
        var sizeAll = $(" .checkbox-lanc .checkboxsquare:not(.checkbox-controler):visible ").length,
        /*Tamanho de todos os checkeboxes visiveis na tela que estao checados*/
        sizeChecked = getChecked().length;
        /*Senao existe nenhum item na tela, retorna false*/
        return sizeAll > 0 ? sizeAll == sizeChecked : undefined;
    }
    
    /*Todos estao checados ?*/
    function _allUnchecked(){
        /*Tamanho de todos os checkeboxes visiveis na tela que estao checados*/
        return getChecked().length == 0;
    }

    function _size(){
        return getChecked().length;
    }
    
    function _init(){
        
        /*Checa master se todos estiverem marcados, ou desmarca caso contrario*/
        var all = _allChecked();
        
//        master.toggle(all !== undefined); 
        if(all !== undefined)
            _toggle(master,all); 
         
         _atualiza_cabecalho_marcados();
         
         _botoes_acao();
    }
    
    function _atualiza_cabecalho_marcados(){
        
        var checked = getChecked(),
            size = _size(),
            show = size > 1;
        
        $("#saldo_marcados").toggle(show);
        
        if( show ){
            $("#quantidade_marcados").html( size + " lancamento" + (size > 1 ? 's' : ''));
            
            var saldo = 0;
            checked.each(function(){
                var v = $(this).closest("tr").find('.col-valor:first').html().parseFloat();
                saldo += v;
            });
            
            saldo = parseFloat(saldo.toFixed(2));
            
            $("#saldo_marcados").html('<span style="font-weight:bold;">Total selecionados:</span> R$ ' + saldo.formatCurrency())
            .corSaldo(saldo);
        }
        
        /*Se tiver pelo menos um marcado, exibe barra*/
        $("#acoes-lote").toggleClass('disabled', !show );
    }
    
    function _botoes_acao(){
        
        var 
        conciliar = $(".confirmar-lote.conciliar"),
        conciliar_cc = $(".conciliar-cc-lote"),
        confirmar = $(".confirmar-lote"),
        editar    = $(".editar-lote"),
        excluir   = $(".excluir-lote"),
        /*Se tiver natela de cartao de credito, vai retornar a conta aberta*/
        cc   = $("#select_cartoes").val() || 0;
        
        editar.unbind('click').click(function(){
            var checked = getChecked();
            if(checked.length > 1) edicao_lote(cc);
        });
        
        excluir.unbind('click').click(function(){
            var checked = getChecked();
            if(checked.length > 1) exclusao_lote(checked.length);
        });
        
        confirmar.unbind('click').click(function(){
            var checked = getChecked();
            if(checked.length > 1)
                confirmacao_lote(checked.length);
        });
        
        conciliar.unbind('click').click(function(){
            var checked = getChecked();
            if(checked.length > 1)
                confirmacao_lote(checked.length,true);
        });
        
        conciliar_cc.unbind('click').click(function(){
            var checked = getChecked();
            if(checked.length > 1)
                conciliacao_cc_lote(checked.length);
        });
        
    }
    
    
    _init();
    
}

function getChecked(){
    return $(" .checkbox-lanc .checkboxsquare:not(.checkbox-controler).checked:visible ");
}

function edicao_lote(cc){
    
    var d , 
    _salvar = function(){
        
        var cc   = $("#select_cartoes").val();

        var checked = getChecked();
        
        var alterar_agenda = $("#repeticao_este:checked")[0] ? 'ESTE' : 'TODOS';
            
        var lancamentos = [];
        
        var cadastros = {
            categoriaDespesa : $("#categorias-despesa").val() || '-1',
            categoriaReceita : $("#categorias-receita").val() || '-1',
            conta            : $("#select_contas").val()      || '-1',
            plastico         : $("#select-plasticos").val()   || '-1',
            contaDestino     : $("#select_destino").val()     || '-1',
            centroDespesa    : $("#centros-despesa").val()    || '-1',
            centroReceita    : $("#centros-receita").val()    || '-1',
            contato          : $("#select_contatos").val()    || '-1',
            formapgto        : $("#select_formaspgto").val()  || '-1',
            projeto          : $("#select_projetos").val()    || '-1'
        };
        
        //console.log(cadastros);
        
        var updated = false;
        for(var i in cadastros){
            /*Se pelo menos um campo foi setado, deixa atualizar*/
            if( updated = cadastros[i] && cadastros[i] != '-1' ) break;
        }
        /*Nenhum campo marcado para atualizacao, apenas fecha janela*/
        if(!updated){
            cancelar_jAjax();
            return true;
        }
        
        var valido = true;
        
        checked.each(function(){
            
            var laux = MD.Lancamento.getLancamentoFromRow( $(this).closest('tr') );
            
            var codigo         = laux.option('codigo');
            var virtual        = laux.option('virtual');//linha.attr("virtual");
            var data_anterior  = laux.option('data.anterior');//linha.attr('data');
            var tipo           = laux.option('tipo');//linha.attr("tipo");
            var valor          = laux.option('valor.previsto');//parseFloat(linha.attr("valor"));
            var numero_parcela = laux.option('repetir.nparcela');//linha.attr("numero_parcela");
            var grupo          = laux.option('grupo');
            
            var conta,destino,centro;
            
            conta = cadastros.conta;
                
            if(valor < 0){
                if(tipo == 'TRANSFERENCIA'){
                    destino = cadastros.contaDestino;
                }else{
                    destino = cadastros.categoriaDespesa;
                }
                
                centro = cadastros.centroDespesa;

            }else{

                if(tipo == 'TRANSFERENCIA'){
                    destino = cadastros.conta;
                    conta   = cadastros.contaDestino;
                }else{
                    destino = cadastros.categoriaReceita;

                }
                centro = cadastros.centroReceita;
            }
            
            if( (conta != '-1' && destino != '-1') && conta == destino){
                alert('Você está editando uma ou mais transferências com a mesma conta de origem e destino.');
                return valido = false;
            }

            var l = new MD.Lancamento({
                codigo          : codigo,
                tipo            : tipo.trim().charAt(0),
                virtual         : virtual,
                grupo           : grupo,
                repetir         : {nparcela  : numero_parcela,alteracao: alterar_agenda},
                data            : {anterior : data_anterior},
                cadastros : {
                    conta           : conta,
                    destino         : destino,
                    centro          : centro,
                    contato         : cadastros.contato,
                    forma_pgto      : cadastros.formapgto,
                    plastico        : cadastros.plastico,
                    projeto         : cadastros.projeto
                }
            });
            
            lancamentos.push(l.options());

        });
        
        if(!valido) return false;
        
        Ajax("LOTE_EDITAR_LANCAMENTOS",JSON.stringify(lancamentos),function(r){
            d.close();
            if(cc) 
                MD.CartaoCredito.pagina(cc);
            else{
                MD.Agenda.movimentacoes();
            }
        });
        return true;
    }
    
    d = new jDialog({
        title : 'Editar lançamentos' + (cc ? ' - Cartão de Crédito' : ''),
        showButtons : false,
        ajax : function(){
            Ajax('EDITAR_LANCAMENTOS',cc,function(r){
                d.html(r).showButtons();
                d.dialog.find('.autocompleteselect').autocompleteselect();
            });
        },
        buttons : {
            'Salvar' : _salvar,
            'Cancelar' : function(){
                d.close();
            }
        }
    });
}

function exclusao_lote(size){
    
    var d,
    _excluir = function(){

        var cc   = $("#select_cartoes").val();
        
        var checked = getChecked();
        
        var alterar_agenda = $("#repeticao_este:checked")[0] ? 'ESTE' : 'TODOS';
            
        var lancamentos = [];
        
        checked.each(function(){
            
            var laux =  MD.Lancamento.getLancamentoFromRow( $(this).closest('tr') );
            
            
            var codigo         = laux.option("codigo");
            var virtual        = laux.option("virtual");
            var data           = laux.option('data.anterior');
            var tipo           = laux.option("tipo");
            var grupo          = laux.option('grupo');

            var l = new MD.Lancamento({
                codigo         : codigo,
                virtual        : virtual,
                grupo          : grupo,
                repetir        : {alteracao: alterar_agenda },
                data           : {anterior : data},
                tipo           : tipo.trim().charAt(0)
            });

            lancamentos.push(l.options());

        });
        
        Ajax("LOTE_EXCLUIR_LANCAMENTOS",JSON.stringify(lancamentos),function(r){
            d.close();

            if(cc) 
                MD.CartaoCredito.pagina(cc);
            else{
                MD.Agenda.movimentacoes();
            }

        });
        
    };
    
    d = new jDialog({
       title : 'Excluir lançamentos',
       showButtons : false,
       ajax : function(){
           Ajax('EXCLUIR_LANCAMENTOS',size,function(r){
               d.html(r).showButtons();
           })
       },
       buttons : {
           'Excluir' : _excluir,
           'Cancelar' : function(){d.close();}
       }
    });
}

function confirmacao_lote(size,conciliar){
    
    var d,
    campo_data ,
    data_fim,
    _confirmar = function(){
        
        var checked = getChecked();
        
        var lancamentos = [];
        
        var data_valida    = campo_data.validate({
            func:function(input){
                return $(input).valida_data_sistema(null,data_fim.join("-"));
            }
        });
        
        if(!data_valida) return;
        
        var dataConfirmacao = campo_data.val().replaceAll(" / ","/").formatDateMySql()
        
        checked.each(function(){
            var linha = $(this).closest('tr');
            var laux = MD.Lancamento.getLancamentoFromRow(linha);
            
            var status = linha.find(".col-status");
            
            /* Ignorando lancamentos confirmados/conciliados */
            var match = !conciliar ? status.hasClass('Confirmado') || status.hasClass('Conciliado') : status.hasClass('Conciliado');
            if(match) return;
            
            
            var codigo         = laux.option("codigo");
            var virtual        = laux.option("virtual");
            var grupo          = laux.option('grupo');
            
                            
            var data_anterior = laux.option('data.anterior'),
                data = status.hasClass('Confirmado') ? data_anterior : dataConfirmacao;
            
            var tipo           = laux.option("tipo");
            
            var valor = laux.option("valor.previsto");
            var nparcela = laux.option("repetir.nparcela");
            
            var l = new MD.Lancamento({
                codigo: codigo,
                virtual : virtual,
                tipo: tipo,
                grupo: grupo,
                valor : {efetivo:valor},
                data  : {efetiva:data,anterior:data_anterior},
                repetir : {nparcela : nparcela},
                status : {confirmado: 1,conciliado: conciliar}                
            });
            
            lancamentos.push(l.options());

        });
        
        if(lancamentos.length > 0){
            Ajax("LOTE_CONFIRMAR_LANCAMENTOS",JSON.stringify(lancamentos),function(r){
                //console.log(r);
                d.close();
                MD.Agenda.movimentacoes();
            });
        }else{
            d.close();
        }
    }
        
    d = new jDialog({
       title : (conciliar ? 'Conciliar' : 'Confirmar' ) + ' lançamentos',
       showButtons : false,
       ajax : function(){
           Ajax('CONFIRMAR_LANCAMENTOS',size,conciliar ? 1 : 0,function(r){
               d.html(r).showButtons();
               
                /*Exibe a data de hoje e cria uma mascara para datas*/
                campo_data = $("#data_efetivacao");

                campo_data.current_date_format();

                /*Adiciona caledario datepicker ao campo*/
                data_fim = get_date("Y-m-d").split("-");

                campo_data.calendario({
                    maxDate: new Date(data_fim[0],data_fim[1]-1,data_fim[2]) /*Data maxima = hoje*/
                });
           });
       },
       buttons : {
           'Confirmar' : _confirmar,
           'Cancelar' : function(){d.close();}
       }
    });
}

function conciliacao_cc_lote(size){
    
    var d = new jDialog({
        title : 'Conciliar lançamentos',
        html : "Deseja conciliar os <b>"+size+"</b> lançamentos selecionados?",
        buttons : {
            'Conciliar' : function(){
                 
                var checked = getChecked(), lancamentos = [];

                checked.each(function(){
                    var linha = $(this).closest('tr');
                    var laux = MD.Lancamento.getLancamentoFromRow(linha);
                    var codigo         = laux.option("codigo");
                    var virtual        = laux.option("virtual");
                    var grupo          = laux.option('grupo');

                    var l = new MD.Lancamento({
                        codigo: codigo,
                        grupo : grupo,
                        virtual : virtual
                    });

                    lancamentos.push(l.options());

                });

                if(lancamentos.length > 0){
                    this.disable('Conciliando...');
                    Ajax("LOTE_CONCILIAR_LANCAMENTOS_CC",JSON.stringify(lancamentos),function(r){
                        d.close();
                        MD.CartaoCredito.fatura();
                    });
                }else{
                    d.close();
                }
                
            },
            'Cancelar' : function(){ d.close(); }
        }
    });
    
}


    
    
})(window,window.MD,jQuery);

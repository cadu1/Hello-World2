(function(window,MD,$){
    
var 
/*Construtor*/
Sonhos = function(){},
/*Atalho*/
fn = Sonhos.prototype,
/*Controlador deste modulo*/
Ajax = fn.Ajax = new MD.Controlador('SONHOS');
/*Expondo metas ao MD Global*/
MD.Sonhos = new Sonhos;

var pagina = fn.pagina = function(){
    
    preparaExibicao("link_cabecalho_metas_economia");
    
    Ajax("HEADER",function(r){
        conteudo(r,'#conteudo',function(){
            cabecalho();
            carregar();
        })
    });
    
};

/**
 * Eventos do cabecalho
 */
var cabecalho = function(){

    $("#novo_sonho").click(function(){
        editar();
    });
};

var carregar = fn.carregar = function(){
    
    display_loading_gif_ajax("#sonhos_conteudo");
     Ajax("DADOS",function(r){
        conteudo(r,'#sonhos_conteudo',function(){
            eventosTela();
        });
    });
    
};
    
function eventosTela(){
    
    $(".sonho-editar").click(function(){
        editar($(this).closest('.painel-sonho').attr('cod'));
    });
    
    $(".sonho-excluir").click(function(){
        excluir($(this).closest('.painel-sonho').attr('cod'));
    });
    
    $(".sonho-detalhes").click(function(){
        detalhes($(this).closest('.painel-sonho').attr('cod'));
    });
    
    $(".sonho-novo-lanc").click(function(){
        novoLancamento($(this).closest('.painel-sonho').attr('cod'));
    });
}
    
var editar = fn.editar = function(id){
    
    var 
    /*Campos na tela*/
    campos = {},
    /*Referencia ao multipleSelect na tela*/
    MS,
    /*jDialog*/
    d,
    /*Capital que deve ser investido (utilizado para chamar a tela de inclusao de lancamento)*/
    C = 0.0,
    /*Tempo em meses que vai durar a aplicacao*/
    t = 1,
    
    _carregar = function _carregar(){

        Ajax('TELA_EDICAO_SONHO',id,function(r){
            d.html(r).showButtons();
            
            function _bindTips(field,target){
                
                var tips = function(text){
                    return {
                        content: {
                            text : text,
                            title:{
                                text: ""
                            }
                        },
                        position: {
                            my : "left center",
                            at : "right center",
                            target : target
                        },
                        style: {
                            classes: 'qtip-dark',
                            width: 200,
                            'left' : '200px;'
                        },
                        show : {
                            solo: true,
                            event : 'focus'
                        },
                        hide: {
                            fixed: true,
                            event : 'blur'
                        }
                    }
                };
                var t = target ? target.attr('tip') : field.attr('tip');
                field.qtip( tips( t ) );
                
            }

            campos.descricao = $("#novo-sonho-descricao");
            campos.valor  = $('#novo-sonho-valor').priceFormat();
            campos.mes = $('#novo-sonho-mes');
            campos.ano = $('#novo-sonho-ano');
            campos.taxa   = $("#novo-sonho-taxa").priceFormat({prefix : ''});
            campos.contas = $("#select-sonho-contas");
            campos.saldo = $("#sonho-saldo-inicial-conta").priceFormat();
            campos.dataSaldo = $("#sonho-data-saldo-inicial-conta").current_date_format().calendario();
            
            _bindTips(campos.descricao);
            _bindTips(campos.valor);
            _bindTips(campos.mes,campos.ano);
            _bindTips(campos.ano);
            _bindTips(campos.taxa);
            _bindTips(campos.contas);
            _bindTips(campos.saldo);
            _bindTips(campos.dataSaldo);
            
            
            _sugerirValorMensalAplicacao();
            
            $("#sonho-nova-conta").click(function(){
                MD.Contas.editar(undefined,function(conta){
                    var 
                    adicionado = false,
                    option = "<option value='"+conta.cod+"' saldo='"+conta.saldo+"'>"+conta.name+"</option>";
                    campos.contas.find('option').each(function(){
                         var name = $(this).html().trim();
                         if(conta.name < name && this.value != 0){
                             $(this).before(option);
                             adicionado = true;
                             return false;
                         }
                     });
                     /*Insere no final do select*/
                     if(!adicionado) campos.contas.append(option);
                     campos.contas.val(conta.cod).change();
                });
            });
            
            var __exibirSaldoConta = function(){
                
                var saldo = parseFloat(campos.contas.find('option:selected').attr('saldo')),
                cor = saldo > 0 ? 'saldo_positivo' : (saldo < 0 ? 'saldo_negativo' : 'saldo_zerado'),
                span = $("<span style='font-weight:bold;'> R$ " + saldo.number_format(2,',','.') + "</span>");
                
                span.removeClass('saldo_positivo saldo_negativo saldo_zerado').addClass(cor);
                
                $("#sonho-exibe-saldo-conta").html('Saldo atual: ').show().append(span);
            };
            
            campos.contas.change(__exibirSaldoConta);
            __exibirSaldoConta();

        });
       
    },
    _salvar = function _salvar(){
        var sonho = {
            id : id,
            descricao : campos.descricao.val().trim(),
            valor : campos.valor.val().parseFloat(),
            data : campos.ano.val()+ "-" + campos.mes.val() + '-01',
            taxa : campos.taxa.val().parseFloat(),
            contas : [{
                id : campos.contas.val(),
                saldoInicial : campos.saldo.val().parseFloat(),
                dataSaldoInicial : campos.dataSaldo.val().formatDateMySql()
            }]
        };
        
        if(campos.descricao.validate({
            alert: true,
            msg: "Informe uma descrição para sua meta.",
            func:function(){return $(this).val().trim() != "";}
        }) === false) return;
        
        if(campos.valor.validate({
            alert: true,
            msg: "Preencha o valor corretamente.",
            func:function(){return $(this).valida_campo_valor();}
        }) === false) return;
        
        /*Validacao padrao de campo de valor*/
        if(campos.saldo.validate({
            alert: true,
            msg: "Preencha o valor corretamente.",
            func:function(){return $(this).valida_campo_valor(true);}
        }) === false) return;
        
        /*Validacao padrao de campo de valor*/
        if(campos.saldo.validate({
            alert: true,
            msg: "O valor do saldo inicial desta meta deve ser menor ou igual ao saldo na conta associada.",
            func:function(){
                return parseFloat(campos.contas.find('option:selected').attr('saldo')) >= sonho.contas[0].saldoInicial
            }
        }) === false) return;
        
        /*Validacao padrao de campo de valor*/
        if(campos.saldo.validate({
            alert: true,
            msg: "O valor do saldo inicial da conta para esta meta deve ser menor que o valor alvo.",
            func:function(){
                return $(this).val().parseFloat() < campos.valor.val().parseFloat();
            }
        }) === false) return;
                
        /*Tentando agendar sonho pro passado..*/
        if(t <= 0){
            jAlert("O vencimento de sua aplicação deve ser posterior ao mês atual","Vencimento inválido");
            return;
        }
        
        if(campos.dataSaldo.validate({func:function(){
             return $(this).valida_data_sistema();   
        }}) === false) return;
        
        Ajax("ATUALIZAR_SONHO",JSON.stringify(sonho),function(r){
            id = r; //Sonho que foi criado
            //Antes de fechar o popup
            var agendar = $("#novo-sonho-agendar:checked:visible")[0];
            carregar();
            d.close();

            /*Usuario deseja incluir agendamento?*/
            if(agendar){
                novoLancamento(id,new MD.Lancamento({
                    descricao : "Aplicação agendada - " + sonho.descricao,
                    tipo : 'T',
                    cadastros : {
                        destino : sonho.contas[0]
                    },
                    valor : {
                        previsto : C
                    },
                    repetir: {
                        repetir : 'P',
                        quantidade : t + 1,
                        frequencia : 1,
                        intervalor : 'MONTH'
                    },
                    status : { confirmado : 0 }
                }));
            }
        });
    },
    
    _sugerirValorMensalAplicacao = function _sugerir(){
        
        var 
        dest = $("#novo-sonho-sugestao-aplicacao-valor"),
        __calcular = function(){
            var
            ini = campos.saldo.val().parseFloat() || 0,
            M = campos.valor.val().parseFloat() - ini,
            i = campos.taxa.val().parseFloat()/100,
            mesAnoInicio = campos.dataSaldo.val().formatDateMySql().left(7);
            t = diff_date(campos.ano.val()+"-"+campos.mes.val()+"-01" , mesAnoInicio+"-01");
            C = (M*i)/( Math.pow((1+i),t + 1) - 1 );
            var 
            nok = isNaN(C) || !M || C == Infinity || C < 0,
            ok = t > 0;
            
            if(!nok) dest.html("R$ " + C.number_format(2,',','.'))
            
            $("#novo-sonho-sugestao-aplicacao").closest('.cad-opcao').toggle(!nok);
            $("#novo-sonho-sugestao-ok").toggle(ok);
            $("#novo-sonho-sugestao-nok").toggle(!ok);
            
            d.center();
        }
        /*Cadastra eventos*/
        campos.taxa.keyup(__calcular);
        campos.valor.keyup(__calcular);
        campos.mes.change(__calcular);
        campos.ano.change(__calcular);
        campos.saldo.keyup(__calcular);
        campos.dataSaldo.change(__calcular);
        
        __calcular();
    };
    
    d = jDialog({
       title : (id ? 'Editar' : 'Nova') +  ' meta de economia',
       closeText : 'Fechar',
       showButtons : false,
       buttons : {
           'Salvar' : _salvar,
           'Cancelar' : function(){ d.close(); }
       },
       ajax : _carregar
    });
}
    
var excluir = fn.excluir = function(id){
    
    var d = jDialog({
       title : 'Excluir meta de economia',
       closeText : 'Fechar',
       showButtons : false,
       buttons : {
           'Excluir' : function(){
               
               var manterLancamentos = $("#radio_manter_lancamentos:checked")[0] ? 1 : 0;
                
                /*Excluir lancamentos desta categoria*/
                if(!manterLancamentos) confirmar_exclusao_grupo(function(){_excluir();})
                else _excluir();

                function _excluir(){
                    Ajax("EXCLUIR_SONHO",id,manterLancamentos,function(r){
                        carregar();
                        d.close();
                    });
                }
           },
           'Cancelar' : function(){
               d.close();
           }
       },
       ajax : function(){
           Ajax('TELA_EXCLUIR_SONHO',id,function(r){
               d.html(r).showButtons();
           });
       }
    });
}
    
var detalhes = fn.detalhes = function(id){
     
    if($("#tela-detalhes-sonho")[0]){
        $("#tela-detalhes-sonho").data('jDialog').close();
        $("#tela-detalhes-sonho").data('jDialog',null);
    }
     
    var d = jDialog({
       title : 'Detalhes meta de economia',
       closeText : 'Fechar',
       showButtons : false,
       buttons : {
//           'Imprimir' : function(){
//               alert('Imprimir..');
//           },
           'Fechar' : function(){
               d.close();
           }
       },
       ajax : function(){
           Ajax('TELA_DETALHES_SONHO',id,function(r){
              d.html(r);
               
               $("#tela-detalhes-sonho").data('jDialog',d);
               
               d.showButtons();
               actionsmd(function(){
                   /* Gabiarra =((
                    * Para nao executar a funcao padrao de show
                    */
               });
               
               $("#lancamentos-sonho").jScrollPane();
               
               var __montaLanc = function(img){
                   var l = new MD.Lancamento(),
                   linha = $(img).closest('tr');
                   
                   l.option('codigo',linha.attr('cod'));
                   l.option('virtual',linha.attr('virtual'));
                   l.option('sonho',id);
                   
                   return l;
               };
               $("#novo-lancamento-sonho-detalhe").click(function(){
                   novoLancamento(id);
               })
               $(".editar_lancamento").click(function(){
                    MD.Lancamentos.editar(__montaLanc(this),'SONHO');
                });
                $(".excluir_lancamento").click(function(){
                    MD.Lancamentos.excluir(__montaLanc(this));
                });
                $(".clonar_lancamento").click(function(){
                    var l = __montaLanc(this);
                    l.option('clone',l.option('codigo'));
                    l.option('codigo',0);
                    MD.Lancamentos.editar(l,'SONHO');
                });
           });
       }
    });
}
 
var novoLancamento = fn.novoLancamento = function(id,lanc){
   
   var l = lanc || new MD.Lancamento();
   l.option('sonho',id);
//   l.option('status.confirmado',1);
   MD.Lancamentos.editar(l,'SONHO');
}
 
})(window,window.MD,jQuery);






//    _carregar = function _carregar(){
//
//        ControladorMeuDinheiro.call(this,'TELA_EDICAO_SONHO',id,function(r){
//            $(this).html(r);
//            d.showButtons();
//
//            campos.descricao = $("#novo-sonho-descricao");
//            campos.valor  = $('#novo-sonho-valor').priceFormat();
//            campos.mes = $('#novo-sonho-mes');
//            campos.ano = $('#novo-sonho-ano');
//            campos.taxa   = $("#novo-sonho-taxa").priceFormat({prefix : ''});
//            campos.contas = $("#select-sonho-contas");
//            
//            _sugerirValorMensalAplicacao();
//            
//            var contas = {};
//            /*Soh busca contas ativas caso seja edicao*/
//            !id || campos.contas.find('option').each(function(){
//                if($(this).attr('active') == '1'){
//                    contas[this.value] = {
//                        value : this.value,
//                        name : $(this).html().trim()
//                    };
//                 }
//            });
//
//            var MS = campos.contas.multipleSelect({
//                dest : "#contas-associadas",
//                items : contas,
//                createItem : function(id,nome){
//                    var saldo;
//                    
//                    $(this).find('option').each(function(){
//                        if(this.value==id){
//                            saldo = parseFloat($(this).attr('saldo'));
//                            return false; // Breaks the loop
//                        }
//                    })
//                    
//                    var
//                    cor = saldo < 0 ? "saldo_negativo" : (saldo > 0 ?"saldo_positivo" : "saldo_zerado"),
//                    item = $("<span class='novosonho-conta-box'></span>"),
//                    list =  "<ul>";
//                    list += "<li style='padding-bottom: 5px;'>";
//                    list += "<span style='font-weight:bold;padding-right:5px;'>"+nome+"</span>"
//                    list += "<span style='float:right;' class='multiple-select-item-choosen-del'></span>"
//                    list += "</li>";
//                    list += "<li>";
//                    list += "<span style='padding-right:8px;'>Saldo atual conta:</span>"
//                    list += "<span style='font-weight:bold;' class='"+cor+"'>R$ "+saldo.number_format(2,',','.')+"</span>"
//                    list += "</li>";
//                    list += "<li>";
//                    list += "<span style='padding-right:5px;'>Saldo inicial meta:</span>"
//                    list += "<input type='text' class='novosonho-conta-saldo' value=' ' />"
//                    list += "</li>";
//                    list += "</ul>";
//                    
//                    item.append(list).find(".novosonho-conta-saldo").priceFormat();
//                    
//                    return item;
//                },
//                events : {
//                    select : function(){
//                        $("#contas-associadas").closest('.cad-opcao').show()
//                        d.center();
//                    },
//                    unselect : function(id){
//                        /*Se a conta nao era associada, permite a exclusao*/          
//                        if( contas[id] === undefined ) return true;
//
//                        var dd = jDialog({
//                            title : "Desassociação de conta",
//                             closeText : 'Fechar',
//                             showButtons : false,
//                             ajax : function(){
//                                 ControladorMeuDinheiro.call(this,'TELA_DESASSOCIAR_CONTA_SONHO',id,function(r){
//                                     $(this).html(r);
//                                     /*Soh exibe os botoes se necessario*/
//                                     if($("#desassociar-conta-sonho-select")[0])
//                                         dd.showButtons();
//                                     /*Apenas centralizando mensagem na tela */
//                                     else dd.center();
//                                 });
//                             },
//                             buttons : {
//                                 'Confirmar' : function(){
//                                     var destino = {
//                                         value : $("#desassociar-conta-sonho-select").val(),
//                                         name : $("#desassociar-conta-sonho-select option:selected").html().trim()
//                                     };
//                                     ControladorMeuDinheiro('DESASSOCIAR_CONTA_SONHO',id,destino,function(r){
//                                         MS.remove(id);
//                                         MS.push(destino.value,destino.name);
//                                         /*Atualizando cache*/
//                                         delete contas[id];
//                                         contas[destino.value] = destino;
//                                         /*Fecha janela de desassociacao*/
//                                         dd.close();
//                                     });
//                                 },
//                                 'Cancelar' : function(){
//                                     dd.close();
//                                 }
//                             }
//                        });
//                        return false;
//                    },
//                    remove : function(){
//                        $("#contas-associadas").closest('.cad-opcao').toggle(MS.getValues().length != 0);
//                        d.center();
//                    }
//                }
//            }).data('multipleSelect');
//
//            $("#sonho-nova-conta").click(function(){
//                /*Hack para aproveitar tela de criacao de conta. Sera chamado
//                 *apos a criacao da conta*/
//                fn.novaContaAtiva = function(conta){
//                    var 
//                    adicionado = false,
//                    option = "<option value='"+conta.cod+"'>"+conta.nome+"</option>";
//                    campos.contas.find('option').each(function(){
//                         var name = $(this).html().trim();
//                         if(conta.nome < name && this.value != 0){
//                             $(this).before(option);
//                             adicionado = true;
//                             return false;
//                         }
//                     });
//                     /*Insere no final do select*/
//                     if(!adicionado) campos.contas.append(option);
//                     /*Inserindo nova conta na lista de escolhidas*/
//                     MS.push(conta.cod,conta.nome);
//                };
//                MD.Contas.editar();
//            });
//
//        });
//       
//    },
    
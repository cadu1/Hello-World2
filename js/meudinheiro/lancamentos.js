(function(window,MD,$){
    
var 
/*Construtor*/
Lancamentos = function(){},
/*Atalho*/
fn = Lancamentos.prototype;
/*Expondo metas ao MD Global*/
MD.Lancamentos = new Lancamentos;

/*Tela de criacao/edicao de lancamento*/
var editar = fn.editar = function(lancamento,tipo){
    
    var
    /*jDialog*/
    d,
    /*jDialog related Jquery object*/
    p,
    /*Objeto MD.Lancamento para enviar ao server*/
    l = new MD.Lancamento,
    id      = lancamento && lancamento.option('codigo'),
    campos  = {},
    virtual = lancamento && lancamento.option('virtual'),
    /*Auxiliar para saber se foi criado um novo cadastro dentro da tela de edicao*/
    novoCad = false,
    /*No momento que a tela carrega, informa se usuario eh basico*/
    basico,
    /*Controle do scroll no popup*/
    scroll,
    /*Caso tipo seja omitido ou nao existe, assume que eh NORMAL*/
    tipo = tipo && tipo.match(/^\s*(NORMAL|INICIAL|PAGAMENTO|CARTAO|PARCELA|SONHO|GRUPO)\s*$/i) ? tipo : 'NORMAL';

    /*Edicao de lancamentos normais*/
    function _normal(){
        /**
         * Esta rotina eh utilizada tambem para a tela de sonho
         * @afterCb Callback a ser executada apos o tratamento padrao.
         * */
        function __carregar(afterCb){
            
            _load(function(){
                
                _eventosNormal();
                
                /*Apenas novo lancamento*/
                if(!id){
                    /*Inicializa regras de preenchimento*/
                    _regras();
                    /*Previews da tela de novo lancamento*/
                    _previews.init();
                } 
                
                /*Executa afterCb() se foi declarada como funcao*/
                typeof afterCb == 'function' && afterCb();
            })

        }

        function __salvar(continuar){
               
            /*Seta os valores padrao de l*/
            if(!_setDefaultValues()) return;
            
            l.option('comprovante',comprovante.codigo);

            Ajax('EDITAR',l.encode(),function(r){
                _done(r,continuar);
                comprovante.closePopup();
            });        
        }

        return {
            title : (id ? 'Editar' : 'Novo') +  ' lançamento',
            showButtons : false,
            ajax : __carregar,
            buttons : _buttons(__salvar)
         }
    }
    
    /*Edicao de lancamentos de saldo inicial*/
    function _inicial(){
        
        function __carregar(){
            _load(function(){
                campos.tipo = p.find('.nl-tipo');
                campos.valor = p.find('.nl-valor-conf').priceFormat();
                campos.data = p.find('.nl-data-conf').current_date_format().calendario(); 
            });
        }
        
        function __salvar(){
            
            var 
            /*Lancamento destino*/
            l = new MD.Lancamento({
                'codigo' : id,
                'tipo' : campos.tipo.filter(':checked').val()
            });
            /*Validando e setando valor*/
            if(!_setValor(l,'efetivo',campos.valor,true)) return;
            /*Validando e setando data*/
            if(!_setData(l,'efetiva',campos.data,true)) return;
            
            Ajax('EDITAR_INICIAL',l.encode(),_done);
        }
        
        return {
            title : 'Saldo inicial',
            showButtons : false,
            ajax : __carregar,
            buttons : _buttons(__salvar)
         }
    }
        
    /*Edicao de lancamentos de cartao*/
    function _cartao(){
                
        function __carregar(){
            
            _load(function(){
               
               _eventosCartao();

                /*Apenas novo lancamento*/
                if(!id){
                    /*Inicializa regras de preenchimento*/
                    _regras();
                    /*Previews da tela de novo lancamento*/
                    _previews.init();
                }
                
            });
        }
        
        function __salvar(continuar){
            /*Se existe erro em alguma validacao interna, para*/
            if(!_setDefaultValues()) return;

            _setDefaultValuesCartao();
            Ajax('EDITAR_CARTAO',l.encode(),function(r){
                _done(r,continuar);
            });  
            
        }
        
        return {
            title : (id ? 'Editar' : 'Novo') +  ' lançamento - Cartão de Crédito',
            showButtons : false,
            ajax : __carregar,
            buttons : _buttons(__salvar)
         }
    }

    /*Edicao de pagamentos de cartao*/
    function _pagamento(){
        
        function __carregar(){
            _load(function(){
                
                if($('.jdialogerror')[0]){
                     var _t = $('.jdialogerror').html();
                     d.close();
                     jAlert(_t,'Editar pagamento');
                     return;
                 }
                
                /*Setando variavel com os campos presentes na tela*/
                _setCampos();
                /*Eventos padrao das telas*/
                _bindEventosPadrao();
                /*Campos de cadastros*/
                _cadastros();
                
                /*Alterna visualizacao da tela baseado nos elementos dela*/
                var toggleElementos = function(){
                    var 
                    data = campos.data.prevista.val().formatDateMySql(),
                    hoje = get_date("Y-m-d"),
                    cmp = datecmp(data,hoje),
                    conf = p.find('.nl-checkbox-confirmado:checked:visible')[0] ? true : false,
                    conc = p.find('.nl-checkbox-conciliado:checked:visible')[0] ? true : false;
//                    console.log(!conc && cmp>0);
                    /*Lancamento marcado para algum tipo de repeticao?*/
                    p.find(".nl-lembrete,.nl-automatico").toggle(!conc && cmp>0 );
                    /*Habilita concialiacao apenas no passado e confirmado*/
                    p.find('.nl-confirmado').toggle(cmp <= 0);
                    /*Habilita concialiacao apenas no passado e confirmado*/
                    p.find('.nl-conciliado').toggle(conf && cmp <= 0 );
                    scroll.update();
                }
                campos.confirmado.click(toggleElementos);
                campos.conciliado.click(toggleElementos);
                /*Sobreescreve calendario padrao criado em cima*/
                campos.data.prevista.blur(toggleElementos).datepicker('option','onClose', toggleElementos );
                
                toggleElementos();
            });
        }
        
        function __salvar(){
            
            var destino = campos.edicao.attr('destino') || lancamento.option('cadastros.conta');
            
            l.option('codigo',id);
            l.option('virtual',virtual);
            /*Pagamentos sao sempre transferencias*/
            l.option('tipo','T');
            /*Este eh um pagamento..*/
            l.option('pagamento',1);
            /*Tipo do lancamento*/
            l.option('automatico', campos.automatico.is(':checked:visible') ? 1 : 0);
            /*A opcao de conta eh sempre a conta de cartao de credito*/
            l.option('cadastros.conta',campos.cadastros.conta.contao.val());
            /*Plastico da conta de origem eh sempre o titular*/
            l.option('cadastros.plastico',campos.cadastros.conta.contao.find('option:selected').attr('plastico') || 0);
            /*A opcao de conta eh sempre a conta de cartao de credito*/
            l.option('cadastros.destino',destino);
            /*Observacoes*/
            l.option('observacoes',campos.observacoes.val());
            /*Validando e setando valor*/
            if(!_setValor(l,'previsto',campos.valor.previsto)) return;
            l.option('valor.efetivo',l.option('valor.previsto'));
            /*Validando e setando data*/
            if(!_setData(l,'prevista',campos.data.prevista)) return;
            
            l.option('data.anterior',virtual);
            l.option('data.efetiva',l.option('data.prevista'));
            l.option('data.compra',l.option('data.prevista'));
            
            /*Status*/
            l.option('status',{
                confirmado : campos.confirmado.is(":checked:visible") ? 1 : 0,
                /*Lancamento conciliado?*/
                conciliado : campos.conciliado.is(":checked:visible") ? 1 : 0
            });
            /*Lembrete via email..?*/
            l.option('notificacoes.email',{
                enviar: $("#checkbox_email:checked:visible")[0] ? 1 : 0 , 
                dias : $("#select_email_lancamento").val()
            });
            l.option('descricao',id || lancamento.option('residuo') ? campos.edicao.attr('descricao') :
               "Pagamento do cartão "+ $("#select_cartoes option:selected").html().trim());
           
           
//           console.log(l.options());
//           return;
//           
           
            Ajax('EDITAR',l.encode(),function(r){
//                console.log(r)
                _done();
            });
        }
        
        return {
            title : (id ? 'Editar' : 'Novo') +  ' pagamento',
            showButtons : false,
            ajax : __carregar,
            buttons : _buttons(__salvar)
         }
    }
    
    /*Edicao de parcelas de cartao*/
    function _parcela(){
        
        function __carregar(){
            _load(function(){  
                campos.tipo = p.find('.nl-tipo');
                campos.valor = p.find('.nl-valor-prev').priceFormat();
            });
        }
        
        function __salvar(){
            var
            /*Lancamento destino*/
            l = new MD.Lancamento({
                codigo : id,
                virtual : virtual,
                grupo : lancamento.option('grupo'),
                tipo : campos.tipo.filter(':checked').val()
            });
            /*Validando e setando valor*/
            if(!_setValor(l,'previsto',campos.valor)) return;
            
            Ajax('EDITAR_PARCELA',l.encode(),_done);
        }
        
        return {
            title : 'Editar parcela',
            showButtons : false,
            ajax : __carregar,
            buttons : _buttons(__salvar)
         }
    }
    
    /*Edicao/criacao de lancamentos de meta de economia*/
    function _sonho(){
        /*Eventos pos carregamento da tela*/
        function __eventos(){
            
            var e = function(){
                if($(this).val() == 'T'){
                    var aplic = $(this).attr('sonho') == "A";
                    p.find('.nl-transf-a').toggle(aplic);
                    p.find('.nl-transf-r').toggle(!aplic);
                }
                scroll.update();
            };
            /*Mudanca do tipo de lancamento*/
            campos.tipo.change(e);
            e.call(campos.tipo.filter(':checked'));
        }
        
        function __salvar(){
            
            
            /*Seta os valores padrao de l*/
            if(!_setDefaultValues()) return;
            
            /*Sonho de destino*/
            l.option('sonho',lancamento.option('sonho'));            
            
            Ajax('EDITAR',l.encode(),function(){
                
                if(!l.option('status.confirmado')){
                    jAlert('Seu lançamento foi agendado com sucesso.<br/><b>Ele só aparecerá nos detalhes desta meta quando for confirmado.</b><br/>Você pode visualizá-lo em suas movimentações.','Agendamento realizado com sucesso',function(){
                        _done();
                    });
                }else{
                    _done();
                }
                
            });
        }
        
        /*Carrega tratador da tela normal*/
        var config = _normal();
        
        return {
            title : (id ? 'Editar' : ' Novo') + ' lançamento - Meta de Economia',
            showButtons : false,
            buttons : _buttons(__salvar),
            ajax : function(){ config.ajax(__eventos); }
        };        
    }

    function _grupo(){
        
        var cartao = !!lancamento && !!lancamento.option('cartao');
        
        var __isParc = function(){
            return p.find('.nl-tipo-rep:checked')[0].value == 'P';
        }
        
        function Grupo(){
            
            var o, t, lsaldo, saldo = 0,count=0,interval = 0, ls = [],fatura,
            /*linha em edicao*/
            tre, editing=-1;
            
            var add = this.add = function(l){
                
                var tcadastros = [],
                _toggle_linha_saldo = function(){
                    lsaldo.closest('div').toggle(count > 0);
                };
                
                if(l.categoria.id) tcadastros.push(l.categoria.nome);
                if(l.centro.id) tcadastros.push(l.centro.nome);
                if(l.contato.id) tcadastros.push(l.contato.nome);
                
                /*Adiciona a lista de lancamentos*/
                ls.push(l);
                
                count++;
                _toggle_linha_saldo();
                
                var 
                /*Posicao deste lancamento no array*/
                i = ls.length - 1,
                /*Linha na tela*/
                tr = $(
                  "<tr>" +
                        "<td class='col-descricao'></td>" +
                        "<td class='col-valor'></td>" +
                        "<td style='width:25px;'>"+
                            "<i class='icon-pencil qtitle' qtitle-data-my='top right' qtitle-data-at='bottom center' title='Editar este lançamento'></i>"+
                            "<i class='icon-trash qtitle' qtitle-data-my='top right' qtitle-data-at='bottom center' title='Remover este lançamento do grupo'></i>"+
                        "</td>" +
                    "</tr>"
                );
                
                update_row(l,tr);
                        
                tr.find('.icon-trash').qtitle().click(function(){
                    tr.remove();
                    ls[i] = null;
                    count--;
                    _toggle_linha_saldo();
                    saldo -= l.valor;
                    lsaldo.html(saldo.formatCurrency(true)).corSaldo(saldo);
                });
            
                tr.find('.icon-pencil').qtitle().click(function(){
                    var le = ls[i];
                    tre = tr;
                    editing = i;
                    
                    saldo -= le.valor;
                    
                    o.find("input[name='nl-tipo'][value='"+(le.valor < 0 ? 'D' : 'R')+"']").prop("checked",true);
                    
                    o.find('.nl-desc').val(le.descricao),
                    o.find('.nl-valor-prev').val(Math.abs(le.valor).formatCurrency(true));
                    
                    var despesa = le.valor < 0;
                    
                    o.find('.nl-despesa').toggle(despesa);
                    o.find('.nl-receita').toggle(!despesa);
                    
                    if(despesa){
                        campos.cadastros.categoria.despesa.val(le.categoria.id).change();
                        campos.cadastros.centro.despesa.val(le.centro.id).change();
                        
                    }else{
                        campos.cadastros.categoria.receita.val(le.categoria.id).change();
                        campos.cadastros.centro.receita.val(le.centro.id).change();
                        
                    }

                    campos.cadastros.contato.val(le.contato.id).change();
                    
                    toggle_action(false,true);
                });
            
                t.prepend(tr);
                
            };
            
            var update = this.update = function(l){
                ls[editing] = l;
                update_row(ls[editing]);
                toggle_action(true,false);
            }
            
            var clear = this.clear = function(){
                
                o.find('.nl-desc').val('').focus();
                o.find('.nl-valor-prev').val("R$ 0,00");
            };
            
            var update_row = function(l,ptr){
                
                var tcadastros = [];
                
                var tr = ptr || tre;
                
                if(l.categoria.id) tcadastros.push(l.categoria.nome);
                if(l.centro.id) tcadastros.push(l.centro.nome);
                if(l.contato.id) tcadastros.push(l.contato.nome);
                
                tr.find('.col-descricao').html(l.descricao + "(" + tcadastros.join(",") + ")");
                tr.find('.col-valor').html(l.valor.formatCurrency()).corSaldo(l.valor);
                
                saldo += l.valor;
                lsaldo.html(saldo.formatCurrency(true)).corSaldo(saldo);
            };
            
            var toggle_action = function(insert,edit){
                o.find("#edit-lancamento-grupo").toggle(edit);
                o.find("#adicionar-lancamento-grupo").parent().toggle(insert && !fatura);
                if(edit===false){
                    editing = -1;
                }
            };
            
            var get = this.get = function(){
                
                var 
                tipo = o.find('input[name="nl-tipo"]:checked').val(),
                sinal = tipo == 'D' ? -1 : 1,
                desc = o.find('.nl-desc').val().trim(),
                valor = o.find('.nl-valor-prev').validate({
                    alert: true,
                    msg: "Preencha o valor corretamente.",
                    func:function(){return $(this).valida_campo_valor(true);}
                }),
                categoria,
                tcategoria='',
                centro,
                tcentro='',
                contato,
                tcontato='';

                if(valor === false) return false;

                valor = valor.parseFloat() * sinal;

                if(tipo == 'D'){
                    categoria = campos.cadastros.categoria.despesa.val();
                    tcategoria = campos.cadastros.categoria.despesa.find('option:selected').html();
                    centro = campos.cadastros.centro.despesa.val();

                    if(centro) tcentro = campos.cadastros.centro.despesa.find('option:selected').html();
                }else{
                    categoria = campos.cadastros.categoria.receita.val();
                    tcategoria = campos.cadastros.categoria.receita.find('option:selected').html();

                    centro = campos.cadastros.centro.receita.val();
                    if(centro) tcentro = campos.cadastros.centro.receita.find('option:selected').html();
                }

                contato = campos.cadastros.contato.val();
                if(contato) tcontato = campos.cadastros.contato.find('option:selected').html();
                
                return {
                    id : editing != -1 ? ls[editing].id : undefined,
                    descricao : desc,
                    valor : valor,
                    categoria : {
                        id : categoria,
                        nome : tcategoria
                    },
                    centro : {
                        id : centro,
                        nome : tcentro
                    },
                    contato: {
                        id : contato,
                        nome : tcontato
                    }
                 };
            }
            
            var cancelar_edicao = this.cancelar_edicao = function(){
                clear();
                saldo += ls[editing].valor;
                toggle_action(true,false);
            }
            
            this.isEditing = function(){
                return editing != -1;
            }
            
            this.init = function(cb){
                
                
                 Ajax('GRUPO',function(r){
                    var height = d.dialog.find('.cad-nl').height();
                    d.dialog.find('.cad-nl').after(r);
                    d.center();
                    setTimeout(function(){d.center();},1);
                    
                    
                    o = $('.nl-lancamentos-grupo').height(height).jScrollPane();
                    interval = setInterval(function(){ 
                        var height = d.dialog.find('.cad-nl').height(),
                        jsp = o.height(height).data('jsp');
                        if(jsp) jsp.reinitialise(); 
                        else clearInterval(interval);
                    },100);
                    
                    t = o.find('table');
                    
                    lsaldo = o.find('#lancamento-grupo-saldo');
                    
                    /*Campos de autocomplete para a parte direita*/
                    o.find('.autocompleteselect').autocompleteselect();
                    
                    cb();
                    
                    /*So tera referencia a fatura apos executar a cb() acima*/
                    fatura  = !!lancamento && !!lancamento.option('fatura');
                    if(fatura){
                        d.dialog.find('.nl-tipo').closest('.cad-opcao').hide();
                        d.dialog.find('.nl-valor-prev').closest('.cad-opcao').hide();
                    }
                    
                    o.find("#adicionar-lancamento-grupo").click(function(){
                        var l = get();
                        if(l){
                            clear();
                            add(l);
                        }
                    });
                    
                    o.find('#atualizar-lancamento-grupo').click(function(){
                        var l = get();
                        if(l){
                            update(l);
                            clear();
                        }
                    });
                    
                    o.find('#cancelar-lancamento-grupo').click(function(){
                        cancelar_edicao();
                    });
                    
                    toggle_action(true,false);
                    
                    var aux = $("#edicao-grupo-lancs");
                    if(aux[0]){
                        var ls_aux = $.parseJSON(aux.html());

                        aux.remove();
                        $.each(ls_aux,function(){
                            add(this);
                        });
                        
                        if(fatura) d.dialog.find('.icon-trash').remove();
                    }
                    
                });
                
                
            };
            
            this.destroy = function(){
                clearInterval(interval);
            };
          
            this.getLancamentos = function(){
                
                return $.grep(ls,function(n){
                    return n !== null;
                });
                
            };
            
            this.getSaldo = function(){
                return saldo;
            };
            
        };
        
        var grupo = new Grupo();
        
         /*Eventos pos carregamento da tela*/
        function __carregar(){
            _load(function(){
                grupo.init(function(){
                    if(!cartao) _eventosNormal();
                    else{
                        _eventosCartao();
                    
                        function __campo_valor(){
                            $(campos.valor.previsto.get(0)).closest('.cad-opcao').toggle(__isParc());
                        }

                        __campo_valor();

                        p.find('.nl-tipo-rep').change(__campo_valor);
                    }
                });
            });
        }
        
        function __salvar(continuar){
            /*Validacoes genericas*/
            if(!_setDefaultValues(true)) return;
                
            if(cartao) _setDefaultValuesCartao();
                
            var gls = grupo.getLancamentos();
            
            /*Lancamento foi digitado mais não incluido no grupo*/
            var non_checked = grupo.get();
            
            if(non_checked && (non_checked.descricao.length > 0 || non_checked.valor != 0) ){
                
                var editing = grupo.isEditing();
                
                var m1 = !editing ? 'Verificamos que você preencheu as informações do lançamento abaixo mas não o adicionou ao grupo.' :
                        'Verificamos que você iniciou a edição do item abaixo mas não atualizou a lista.';
                
                var m2 = !editing ? 'Deseja incluir este lançamento no grupo antes de salvar?' : 'Deseja atualizar antes de salvar?';
                
                
                var d1 = new jDialog({
                    title : 'Item de grupo não ' + (!editing ? 'adicionado' : 'atualizado'),
                    html : '<div style="width:350px;">' + m1 + ' </div>'+
                            '<div style="background-color: #FAFDD0;padding: 3px 5px;">Descrição: <b>'+non_checked.descricao+'</b><br/>'+
                            'Valor: <b>R$ '+non_checked.valor.number_format(2,',','.')+'</b></div>'+
                            '<div style="font-weight:bold;margin-top:10px;">'+ m2 +'</div>',
                    buttons : {
                        "Sim" : function(){
                            
                            grupo.clear();
                            
                            if(!editing){
                                grupo.add(non_checked);
                            }else{
                                grupo.update(non_checked);
                            }
                            gls = grupo.getLancamentos();
                            d1.close();
                            ___salvar();
                        },
                        "Não" : function(){
                            if(editing){
                                grupo.cancelar_edicao();
                            }
                            d1.close();
                            ___salvar();
                        },
                        "Cancelar" : function(){
                            d1.close();
                        }
                    }
                });
                
            }else{
                return ___salvar();
            }
            
            function ___salvar(){
                  
                if(gls.length < 1){
                    jAlert('Você deve adicionar pelo menos 1 lançamento ao grupo.','Grupo vazio');
                    return false;
                }
                if(grupo.getSaldo() === 0){
                    jAlert('A soma dos lançamentos agrupados deve ser diferente de zero.','Valor zerado');
                    return false;
                }
                
                var vc = parseFloat(l.option('valor.compra'));

//console.log(vc);

                if(cartao && __isParc() && grupo.getSaldo() !== vc){
                    
                    jAlert('A soma dos lançamentos agrupados deve ser igual ao valor da compra.','Valor de compra diferente');
                    return false;
                }

                Ajax("EDITAR_GRUPO",l.encode(),JSON.stringify(gls),function(r){
//                    console.log(r);
                    grupo.destroy();
                    _done(r,continuar);
                });
            }
        }
        
        function __cancelar(){
            grupo.destroy();
            d.close();
        }
        
        return {
            title : (id ? 'Editar' : ' Novo') + ' grupo de lançamentos',
            showButtons : false,
            buttons : _buttons(__salvar,__cancelar),
            ajax : __carregar
        };  
    }

    /**
     * Carrega a tela de edicao correspondente
     * @param [cb] Funcao de tratamento especifica da tela.
     */
    function _load(cb){
        Ajax('TELA_EDICAO',tipo,lancamento && lancamento.encode(),function (r){
            p = d.dialog;
            d.html(r);
            
            __clearEmptyBlocks();
            d.showButtons();
            scroll.init();
            
            $('.autocompleteselect').autocompleteselect();
            
            cb && cb.call(p);
        });
        /*Apaga os blocos sem conteudo*/
        function __clearEmptyBlocks(){
            $('.cad-bloco').each(function(){
               if(!$(this).find('.cad-opcao')[0]){
                   $(this).hide();
               }
            });
        }
    }
        
    /**
     * Retorna os botoes do dialog
     * @param _salvar Cb com acao do botao salvar 
     * @param [_cancelar] Cb com acao do botao cancelar
     */
    function _buttons(_salvar,_cancelar){
        var buttons = {};
        /*Botao salvar novo/edicao lancamento*/
        buttons['Salvar'] = function(){ _salvar.call(this); };
        /*Salvar e continuar apenas em inclusoes*/
        if(!id && !tipo.match(/^\s*(INICIAL|PAGAMENTO|PARCELA|SONHO)\s*$/i) ) buttons['Salvar e continuar'] = function(){ _salvar.call(this,true); };
        /*Botao cancelar novo/edicao lancamento*/
        buttons['Cancelar'] = function(){ 
            if(!_cancelar) d.close(); 
            else _cancelar.call(this);
        };
        
        return buttons;
    }
    
    /**
     * Terminou de realizar a operacao de inclusao/edicao
     * @param r Retorno do ajax
     * @param continuar Se eh para reabrir a tela
     * */
    function _done(r,continuar){
        if(r == -1){
            jAlert('Ocorreu um erro inesperado ao tentar salvar este lançamento.<br>Tente novamente ou entre em contato com o suporte.','Falha ao salvar lançamento');
            return;
        }
        
        if(!telaBuscaVisivel()){
            var pag = MD.Inicializar.pagina();
            if(pag == 'visaogeral') MD.Resumo.carregarPaineis();
            else if(pag == 'cartoes') MD.CartaoCredito.fatura();
            else if(pag == 'movimentacoes'){
                /*Nao criou nenhum cadastro novo, nao precisa recarregar tudo..*/
                if(!novoCad) MD.Agenda.movimentacoes();
                /*Recarrega tudo*/
                else MD.Agenda.pagina();
            }
            else if(pag == 'metas/economia'){
                MD.Sonhos.carregar();
                MD.Sonhos.detalhes(l.option('sonho'));
            } 
        } 
        /*Recarrega a tela de busca*/
        else MD.Busca.buscar();
        
        d.close();
        /*Chama novamente a tela de criar lancamento*/
        continuar && editar(l,tipo);
    }
    
    function _setDefaultValues(valorZero){
        
        var
        /*Salva tipo para acesso rapido*/
        tipo = campos.tipo.filter(':checked').val(),
        /*Tipo de repeticao para acesso rapido*/
        tipor = campos.repetir.repetir.filter(':checked').val(),
        /*Multiplicador do valor*/
        sinal = tipo == 'R' ? 1 : -1;

        /*Codigo do lancamento*/
        l.option('codigo', id );
        /*Lancamento eh uma agenda?*/
        l.option('virtual', campos.edicao.attr('data_anterior') );
        /*Tipo do lancamento*/
        l.option('tipo', tipo );
        /*Tipo do lancamento*/
        l.option('automatico', campos.automatico.is(':checked:visible') ? 1 : 0);
        /*Repeticao do lancamento*/
        l.option('repetir', !id ? {
            /*Lancamento se repete?*/
            repetir: tipor == 'U' ? 0 : 1,
            /*Quantidade de parcelas*/
            quantidade : tipor == 'P' ? campos.repetir.quantidade.val() : (tipor == 'U' ? 1 : -1),
            /*Parcela inicial*/
            primeira : campos.repetir.primeira.val(),
            /*Intervalo repeticao*/
            intervalo : campos.repetir.intervalo.val(),
            /*Frequencia repeticao*/
            frequencia : campos.repetir.frequencia.val(),
            /*Incluir parcelamento na descricao*/
            parcela_desc : campos.repetir.nparcela.is(":checked") ? 1 : 0,
            /*Numero da parcela*/
            nparcela : campos.repetir.alteracao.filter(':checked').val()
        } : {
            /*Lancamento se repete?*/
            repetir: campos.edicao.attr('data_anterior') ? 1 : 0,
            /*Quantidade de parcelas*/
            quantidade : campos.edicao.attr('quantidade'),
            /*Intervalo repeticao*/
            intervalo : campos.edicao.attr('intervalo'),
            /*Frequencia repeticao*/
            frequencia : campos.edicao.attr('frequencia'),
            /*Incluir parcelamento na descricao*/
            parcela_desc : campos.edicao.attr('parcela_desc'),
            /*Numero da parcela*/
            nparcela : campos.edicao.attr('nparcela'),
            /*Tipo da alteracao numa edicao de agenda*/
            alteracao : campos.repetir.alteracao.filter(':checked').val()
        });

        /*Descricao*/
        l.option('descricao',campos.descricao.val().trim());
        /*Eh para criar uma nova regra com os dados?*/
        l.option('regra',$('.nl-regra:visible:checked')[0] ? l.option('descricao') : 0 );
        /*Status*/
        l.option('status',{
            confirmado : campos.confirmado.is(":checked:visible") ? 1 : 0,
            /*Lancamento conciliado?*/
            conciliado : campos.conciliado.is(":checked:visible") ? 1 : 0
        });

        /*Lembrete via email..?*/
        l.option('notificacoes.email',{
            enviar: $("#checkbox_email:checked:visible")[0] ? 1 : 0 , 
            dias : $("#select_email_lancamento").val()
        });


        if(_setValor(l,'previsto',campos.valor.previsto,valorZero) === false) return false;

        if(campos.valor.efetivo.filter(':visible')[0])
            if(_setValor(l,'efetivo',campos.valor.efetivo,valorZero) === false) return false;


        /*Data invalida*/
        if(_setData(l,'prevista',campos.data.prevista) === false) return false;

        if(campos.data.efetiva.filter(':visible')[0])
            if(_setData(l,'efetiva',campos.data.efetiva) === false) return false;

        /*Data anterior*/
        l.option('data.anterior' , campos.edicao.attr('data_anterior'));
        /*Numero de documento*/
        l.option('ndocumento',campos.ndocumento.val());
        /*Observacoes*/
        l.option('observacoes',campos.observacoes.val());
        /*Operacao*/
        l.option('operacao',campos.edicao.attr('operacao'));
        
        
        /*Se nao eh transferencia, insere conta e categoria*/
        if(tipo == 'D' || tipo == 'R'){
            /*Cadastros associados*/
            l.option('cadastros',{
                forma : campos.cadastros.forma.val(),
                contato : campos.cadastros.contato.val(),
                projeto : campos.cadastros.projeto.val()
            });
            
            l.option('cadastros.conta',campos.cadastros.conta.conta.val());
            
            if(tipo == 'D'){
                l.option('cadastros.destino',campos.cadastros.categoria.despesa.val());
                l.option('cadastros.centro',campos.cadastros.centro.despesa.val());
            }else{
                l.option('cadastros.destino',campos.cadastros.categoria.receita.val());
                l.option('cadastros.centro',campos.cadastros.centro.receita.val());
            }
            
        /*Senao insere conta origem e destino*/
        }else{
            
            var sonhoOp = campos.tipo.filter(':checked').attr('sonho'),
            contao,contad;
            
            if(sonhoOp){
                var idx = sonhoOp == 'A' ? 0 : 1;
                contao = $(campos.cadastros.conta.contao[idx]);
                contad = $(campos.cadastros.conta.contad[idx]);
            }else{
                contao = campos.cadastros.conta.contao;
                contad = campos.cadastros.conta.contad;
            }
            
            l.option('cadastros.conta',contao.val());
            l.option('cadastros.destino',contad.val());
            
            /*Pode ou nao ter o autocompleteselect criado*/
            var f = contad.data('acs') ? contad.data('acs').input : contad;
            if(f.validate({
                alert: true,
                msg : "A conta de destino não pode ser igual a de origem",
                func : function(){
                    return l.option('cadastros.conta') != l.option('cadastros.destino');
                }
            }) === false) return false;
        }
        
        l.option('notificacoes.email',{
            enviar : campos.notificar.email.enviar.is(":checked:visible") ? 1 : 0,
            dias   : campos.notificar.email.dias.val()
        });
        
        if(lancamento){ 
            l.option('cartao',lancamento.option('cartao'));
            l.option('grupo',lancamento.option('grupo'));
        }
        
        /*Campos setados com sucesso*/
        return true;
    }

    function _setDefaultValuesCartao(){
        
        /*A opcao de conta eh sempre a conta de cartao de credito*/
        l.option('cadastros.conta',lancamento.option('cadastros.conta'));
        /*Plastico escolhido*/
        l.option('cadastros.plastico',campos.cadastros.plastico.val());
        /*O campo forma de pagamento tera valor fixo*/
        l.option('cadastros.forma' , p.find('.nl-forma').val());
        /*O campo forma de pagamento tera valor fixo*/
        l.option('cadastros.projeto' , p.find('.nl-projeto').val());

        /*O valor indicado eh apenas o valor da parcela?*/
        var ehParc = !!p.find('.nl-eh-valor-parc input:visible:checked')[0],
            valor = l.option('valor.previsto'),
            q = l.option('repetir.quantidade') || 1;

        /*Lancamento infinito? previsto e compra da no mesmo*/
        if(q == -1) q = 1;

        /*Indica se existe uma fatura associada a este lancamento*/
        l.option('fatura',campos.edicao.attr('fatura'));


        /*Atualiza campo de valor baseado no parcelamento*/
        l.option('valor',{
           'previsto' : (ehParc ? valor : valor/q).toFixed(2), 
           'compra' : (ehParc ? valor*q : valor).toFixed(2)
        });
        /*Data de compra eh igual a data prevista na criacao*/
        l.option('data.compra',l.option('data.prevista'));

        /*Eh para entrar nesta ou na proxima fatura?*/
        l.option('proxima_fatura',
            p.find(".nl-lancar-fatura input[name='entrar_fatura']:checked:visible").val() || 0);
        
        l.option('valor_parcela', !!p.find("#digitar-valor-parcela:checked:visible")[0] ? 1 : 0);

        /*Padroniza lancamentos de cartao sempre na Agenda*/
        l.option('repetir.repetir',1);
//            l.option('repetir.frequencia',1);
        l.option('repetir.intervalo','MONTH');
        l.option('repetir.parcela_desc',1);
        
        l.option('repetir.ajustar_parcelas',p.find('.nl-info-parc>select:visible').val());

    }

    /*Seta a variavel campos*/
    function _setCampos(){
        
        campos.edicao = p.find('.nl-edicao');
        campos.tipo = p.find('.nl-tipo');
        campos.repetir = {
            repetir : p.find('.nl-tipo-rep'),
            quantidade: p.find('.nl-rep-quant'),
            primeira: p.find('.nl-rep-ini'),
            frequencia : p.find('.nl-rep-freq'),
            intervalo: p.find('.nl-rep-inter'),
            nparcela : $("#incluir-nparcela-desc"),
            alteracao : $(".div_repeticao input[name='edicao_repeticao']")
        };
        campos.automatico = p.find(".nl-automatico");
        campos.confirmado = p.find('.nl-checkbox-confirmado');
        campos.conciliado = p.find('.nl-checkbox-conciliado');

        campos.descricao = p.find('.nl-desc');
        campos.valor = {
            previsto   : p.find('.nl-valor-prev'),
            efetivo : p.find('.nl-valor-conf')
        };
        campos.data= {
            prevista   : p.find('.nl-data-prev'),
            efetiva : p.find('.nl-data-conf')
        };
        
        campos.proximaFatura = p.find(".nl-lancar-fatura input[name='entrar_fatura']");

        campos.ndocumento = p.find('.nl-ndoc');
        campos.observacoes = p.find('.nl-obs');

        /*Cadastros da tela*/
        campos.cadastros = {
            categoria : {
                despesa : p.find('.nl-categorias-d'),
                receita : p.find('.nl-categorias-r')
            },
            conta : {
                conta : p.find('.nl-conta'),
                contao : p.find('.nl-conta-o'),
                contad : p.find('.nl-conta-d')
            },
            centro : {
                despesa : p.find('.nl-centro-d'),
                receita : p.find('.nl-centro-r')
            },
            forma : p.find('.nl-forma'),
            contato : p.find('.nl-contato'),
            plastico : p.find('.nl-plastico'),
            projeto : p.find('.nl-projeto')
        };
        
        campos.notificar = {
            email : {
                enviar : $('.nl-lembrete-email'),
                dias : $('.nl-lembrete-email-dias')
            }
        }
        
        campos.anexar = $("#anexar-comprovante");
    }
    
    /** 
     * Cria os eventos padrao de todas as telas
     * @param dataCb Callback para o campo de data*/
    function _bindEventosPadrao(dataCb){
        /*Eventos campos de valor*/
        campos.valor.previsto.priceFormat();
        campos.valor.efetivo.priceFormat();
        
        /*Eventos campos de data*/
        campos.data.prevista.current_date_format().calendario();
        campos.data.efetiva.current_date_format().calendario();
        
        /*Mudanca do tipo de lancamento*/
        campos.tipo.change(function(){
            p.find('.nl-normal').toggle(this.value.match(/D|R/) ? true : false);
            p.find('.nl-transf').toggle(this.value == 'T');
            p.find('.nl-despesa').toggle(this.value == 'D');
            p.find('.nl-receita').toggle(this.value == 'R');
            scroll.update();
        });
        
        p.find('.nl-tipo-rep').change(function(){
            p.find('.nl-rep').toggle(this.value != 'U').find('.nl-rep-parc').toggle(this.value == 'P');
            scroll.update();
        });
        
        /*Formata campo de quantidade apenas para numeros*/
        p.find(".nl-rep-freq,.nl-rep-quant,.nl-rep-ini").numeric();


        /*Formata campo de frequencia de repeticao apenas para numeros*/
        campos.repetir.frequencia.keyup(function(){
            /*Exibe texto do select no singular ou no plural de acordo com a quantidade*/
            var sing = ['Dia','Semana','Mês','Ano'],
                plu = ['Dias','Semanas','Meses','Anos'],
                lst = $(this).val() > 1 ? plu : sing;
            /*Troca valores das options*/
            campos.repetir.intervalo.find("option").each(function(e){
                $(this).html(lst[e]);
            });
        }).blur(function(){
            /*Caso o campo seja deixado em branco, seta valor como 1*/
            if($(this).val()=="" || parseInt($(this).val()) == 0) $(this).val(1);
        });

        campos.repetir.quantidade.blur(function(){
            if($(this).val()=="" || parseInt($(this).val()) == 0 ||  parseInt($(this).val()) == 1) $(this).val(2);
             _valida_primeira_parcela();
        });

        campos.repetir.primeira.blur(function(){
            var val = $(this).val();
            if( val == "" || parseFloat(val) == 0 ) $(this).val(1);
            else _valida_primeira_parcela();
        });
        
        function _valida_primeira_parcela()
        {
            var max = campos.repetir.quantidade.val();
            var p = campos.repetir.primeira;
            var val = p.val();
            if(parseFloat(val) > parseFloat(max)) p.val(parseFloat(max));
        }


        campos.notificar.email.dias.click(function(){
            campos.notificar.email.enviar.prop('checked',true);
        })

    }
    
    /**
     * Cria os eventos para tela de lancamento normal e grupo
     * @returns {undefined}
     */
    function _eventosNormal(){
        
        /*Setando variavel com os campos presentes na tela*/
        _setCampos();
        /*Eventos padrao das telas*/
        _bindEventosPadrao();
        /*Campos de cadastros*/
        _cadastros();
        /*Area de anexo de comprovantes*/
        _comprovante();

        /*Usuario eh basico?*/
        basico = p.find('.usr-basico').val() == '1';

        /*Alterna visualizacao da tela baseado nos elementos dela*/
        var toggleElementos = function(){
            var 
            data = campos.data.prevista.val().formatDateMySql(),
            hoje = get_date("Y-m-d"),
            cmp = datecmp(data,hoje),
            rep = p.find('.nl-tipo-rep:checked')[0].value.match(/P|F/) ? true : false,
            conf = p.find('.nl-checkbox-confirmado:checked:visible')[0] ? true : false;

            /*Lancamento marcado para algum tipo de repeticao?*/
            p.find(".nl-lembrete,.nl-automatico").toggle(rep || cmp > 0);
            /*Habilita confirmacao apenas no passado*/
            p.find('.nl-confirmado').toggle(cmp <= 0  || !!id);
            /*Habilita concialiacao apenas no passado e confirmado*/
            p.find('.nl-conciliado').toggle(cmp <= 0 && conf);
            campos.anexar.toggle(conf && !$("#anexar-comprovante-desfazer:visible")[0]);
            /*Tela de edicao*/
            campos.data.efetiva.closest('.cad-opcao').toggle(conf);
            campos.valor.efetivo.closest('.cad-opcao').toggle(conf);
            scroll.update();
            d.center();
        }

        toggleElementos();

        campos.confirmado.click(function(){
            toggleElementos();
            /*Valor efetivo eh sugerido igual ao valor previsto*/
            campos.valor.efetivo.val( campos.valor.previsto.val() );
        });
        /*Sobreescreve calendario padrao criado em cima*/
        campos.data.prevista.blur(toggleElementos).datepicker('option','onClose', toggleElementos );

        p.find('.nl-tipo-rep').change(function(){
           campos.repetir.nparcela.closest('div').toggle(this.value == 'P');
           toggleElementos();
        });

        /*Alterna campo de conciliado baseado no checkbox de confirmado*/
        p.find('.nl-checkbox-confirmado').click(function(){
            p.find('.nl-conciliado').toggle(this.checked);
        });
                
                
    }
    
    /**
     * Cria os eventos para tela de lancamento de cartao e grupo de cartao
     * @returns {undefined}
     */
    function _eventosCartao(){
         /*Setando variavel com os campos presentes na tela*/
        _setCampos();
        /*Eventos padrao das telas*/
        _bindEventosPadrao();
        /*Campos de cadastros*/
        _cadastros();
        
        if(lancamento) lancamento.option('fatura',campos.edicao.attr('fatura'));
        
        var infoParcelas = function(){
            /*Span destino*/
            var info = p.find('.nl-info-parc'),
                span = p.find('.nl-info-parc>span'),
                sel = p.find('.nl-info-parc>select'),
            /*Eh repeticao parcelada?*/
            parc = p.find('.nl-tipo-rep:checked')[0].value == 'P',
            /*Lancamento fixo ?*/
            fixo = p.find('.nl-tipo-rep:checked')[0].value == 'F',
            /*Esta marcado que eh uma parcela?*/
            ehParcela = !!p.find('.nl-eh-valor-parc input:checked')[0],
            /*Numero de parcelas marcado*/
            nParcelas = parseFloat(campos.repetir.quantidade.val() || campos.edicao.attr('quantidade')),
            /*Valor do lancamento*/
            valor = campos.valor.previsto.val().parseFloat(),
            texto = !ehParcela ? 'Parcela: R$ ' : 'Total: R$ ';
            /*Nao eh para exibir nada..*/
            if(!parc || !valor) return info.hide();
            
            info.show();
            
            /*Calcula o valor a ser exibido*/
            var total = ehParcela ? valor * nParcelas : valor/nParcelas;
            
            if(!ehParcela){
                
                total = parseFloat(total.toFixed(2));
                var retot = parseFloat((total * nParcelas).toFixed(2));
                
                if( retot == valor){
                    sel.hide();
                    span.show().html(nParcelas + " parcelas de R$ "+ total.number_format(2,",","."));
                }else{
                    var diff = total + valor - retot;
                    var ns = nParcelas-1 > 1 ? 's' : '';
                    
                    sel.find('option:first').html("1 parcela de " + diff.number_format(2,",",".") + " + " + (nParcelas-1) + "x de " + total.number_format(2,",",".")+"");
                    sel.find('option:last').html(""+(nParcelas-1) + " parcela" + ns + " de " + total.number_format(2,",",".") + " + 1x de " + diff.number_format(2,",",".") );
                    sel.show();
                    span.hide();
                }
            }else{
                sel.hide();
                span.show().html(texto + total.number_format(2,",","."));
            }

        }, toggleElementos = function(){
            /*Tipo de repeticao*/
            var rep = p.find('.nl-tipo-rep:checked')[0].value;
            p.find('.nl-rep').toggle(rep == 'P' || rep == 'F');
            p.find('.nl-eh-valor-parc').toggle(rep == 'P');
            scroll.update();

        }, campoProximaFatura = function(){

            var corte    = $("#info-fatura").attr("corte"),
                venc     = $("#info-fatura").attr("venc");

            if(!corte || !venc) return;
            var v = campos.data.prevista.val().formatDateMySql();
            var futuro = datecmp(v,corte) > 0;

            $('.nl-lancar-fatura').toggle( datecmp(v,venc) <= 0);
            campos.proximaFatura[0].checked = !futuro;
            campos.proximaFatura[1].checked = futuro;
        };             

        toggleElementos();
        infoParcelas();

        p.find('.nl-info-parc>select').change(function(){
            MD.Contas.Ajax('ALTERAR_AJUSTE_PARCELA',lancamento.option('cadastros.conta'),this.value);
        });

        /*Soh faz a chamada inicial na tela de novo*/
        if(!id) campoProximaFatura();

        p.find('.nl-tipo-rep').change(function(){
            infoParcelas();
            toggleElementos();
        });
        campos.repetir.quantidade.keyup(infoParcelas);
        p.find('.nl-eh-valor-parc input').click(infoParcelas);
        p.find('nl-tipo').change(infoParcelas);
        campos.valor.previsto.keyup(infoParcelas);  

        campos.data.prevista.blur(campoProximaFatura).datepicker('option','onClose', campoProximaFatura );
    }
    
    /*Evento das regras de preenchimento na tela*/
    function _regras(){
        /*Usuario nao utiliza regras...*/
        if(!campos.descricao.hasClass('campo-regras')) return;
        
        /*Pode exibir box perguntando se quer criar nova regra, precisa atualizar*/
        campos.descricao.blur(scroll.update);

        var onselect = function(regra){
            var t = gettype();
            _preencher( t == 'D' ? campos.cadastros.categoria.despesa : (t == 'R' ? campos.cadastros.categoria.receita : null),regra.categoria);
            _preencher(t == 'D' ? campos.cadastros.centro.despesa : (t == 'R' ? campos.cadastros.centro.receita : null),regra.centro);
            _preencher(campos.cadastros.contato,regra.contato);
            _preencher(campos.cadastros.forma,regra.formapgto);
            _preencher(campos.cadastros.conta.conta,regra.conta);
            _preencher(campos.cadastros.conta.contao,regra.conta);
            _preencher(campos.cadastros.conta.contad,regra.contaDestino);
            _preencher(campos.cadastros.plastico,regra.plastico);

            function _preencher(campo,regra){
                if(campo && campo[0]){
                    /*Muda valor e dispara evento de troca*/
                    campo.val(regra.id).change();
                }
            }
        },
        gettype = function(){ return campos.tipo.filter(":checked").val(); },
        novo = function(n){ $('.nl-nova-regra-box').toggle(n); };

        MD.Regras.autocomplete(gettype,onselect,novo);
    }
    
    /*Evento dos campos de cadastros na tela*/
    function _cadastros(){

        var 
        __criarCadastro = function(cad,push,tipo){
            cad.editar(undefined,function(o){ push(o); },null,tipo);
        },
        /*Cria os eventos para um cadastro especifico*/
        __bind = function(cad,cb){
            cad.o.siblings('.link-add').off('click').on('click',function(){
                cad.c( function(o){
                    var novo = $("<option value='"+o.cod+"'>"+o.name+"</option>"),
                        incluiu = false;
                    cad.o.find('option').each(function(e){
                        /*Se a primeira opcao for um 'Nenhum', continue*/
                        if(!e && !this.value) return;
                        var n = $(this).html().trim();
                        if(n >= o.name){
                            novo.insertBefore(this);
                            incluiu = true;
                            return false; //Breaks the loop
                        } 
                    });
                    /*Tera que ser incluido no fim da lista*/
                    if(!incluiu) cad.o.append(novo);
                    /*Seleciona opcao recem incluida*/
                    cad.o.val(o.cod).change();
                    /*Ao menos um novo cadastro foi criado nesta tela*/
                    novoCad = true;
                    cb && cb();
                 });    
            });
        },
        cadastros = {
             categoria : {
                 despesa : {
                     o : campos.cadastros.categoria.despesa,
                     c : function(push){__criarCadastro(MD.Categorias,push,'DESPESA');}
                 },
                 receita : {
                     o : campos.cadastros.categoria.receita,
                     c : function(push){__criarCadastro(MD.Categorias,push,'RECEITA');}
                 }
             },
             centro : {
                 despesa : {
                     o : campos.cadastros.centro.despesa,
                     c :  function(push){__criarCadastro(MD.Centros,push,'CUSTO');}
                 },
                 receita : {
                     o : campos.cadastros.centro.receita,
                     c :  function(push){__criarCadastro(MD.Centros,push,'LUCRO');}
                 }
             },
             conta : {
                 conta : {
                     o : campos.cadastros.conta.conta,
                     c :  function(push){__criarCadastro(MD.Contas,push);}
                 },
                 contao : {
                     o : campos.cadastros.conta.contao,
                     c :  function(push){__criarCadastro(MD.Contas,push);}
                 },
                 contad : {
                     o : campos.cadastros.conta.contad,
                     c :  function(push){__criarCadastro(MD.Contas,push);}
                 }
             },
             contato : {
                 o : campos.cadastros.contato,
                 c :  function(push){__criarCadastro(MD.Contatos,push);}
             },
             forma : {
                 o : campos.cadastros.forma,
                 c :  function(push){__criarCadastro(MD.Formas,push);}
             },
             projeto : {
                 o : campos.cadastros.projeto,
                 c :  function(push){__criarCadastro(MD.Projetos,push);}
             }
         };
         
         var 
         __metasReloader = function(){ return _previews.metas  && _previews.metas.reload(); },
         __contasReloader = function (){ return _previews.contas && _previews.contas.reload(); }
         
         /*Gerando autocompletes*/
         __bind(cadastros.categoria.despesa,__metasReloader );
         __bind(cadastros.categoria.receita,__metasReloader  );
         __bind(cadastros.conta.conta,__contasReloader );
         __bind(cadastros.conta.contao,__contasReloader );
         __bind(cadastros.conta.contad,__contasReloader );
         __bind(cadastros.centro.despesa);
         __bind(cadastros.centro.receita);
         __bind(cadastros.contato);
         __bind(cadastros.forma);
         __bind(cadastros.projeto);
    }
    
    /*Evento dos comprovantes nas telas*/
    function _comprovante(){
        comprovante.init();
    }
    
    /*Evento dos previews nas telas*/
    var _previews = (function _previews(){
        
        var 
        P = function(){}, 
        fn = P.prototype,
        /*Destino do preview*/
        dest,
        /*Janela do preview*/
        o = $("<div class='preview-novo-lancamento'></div>"),
        /*Representa um painel*/
        painel = function painel(c){

            if(!(this instanceof arguments.callee)) return new arguments.callee(c);   

            var 
            /*Template de um painel do preview*/
            panel_template = "<div class='panel-preview-novo-lancamento'><div class='title-panel-preview'></div><div class='title-panel-content'></div></div>",
            panel = this.panel = $(panel_template),
            config = c,
            that = this;

            var title = this.title = function(t){
                return panel.find('.title-panel-preview').html(t);
            }

            var html = this.html = function(t){
                panel.find('.title-panel-content').html(t);
                d.center();
                return that;
            }
            var show = this.show = function(t){
                panel.show();
                o.show();
                dest.toggleClass('preview',isEmpty() && !scroll.criado );
                d.center();
                return that;
            }
            var hide = this.hide = function(t){
                panel.hide();
                o.hide();
                dest.toggleClass('preview',isEmpty() && !scroll.criado);
                d.center();
                return that;
            }

            var loading = this.loading = function(){
                display_loading_gif_ajax(panel.find('.title-panel-content'));
            }

            this.remove = function(){
                panel.remove();
                d.center();
            }

            title(config.title);
            html(config.text);

            config.ajax && config.ajax.call(this);
        },
        /*Adiciona um painel ao preview*/
        add = function(config){
            var p = painel(config);
            o.append(p.panel);
            return p;
        },
        /*Verifica se preview esta com algum painel visivel*/
        isEmpty = function(){
            return !!$(".panel-preview-novo-lancamento:visible")[0];
        },
        /*Painel de metas*/
        metas = function(){
            var 
            _M = function(){},
            /*Cria novo painel*/
            _p = add({title:'Meta mensal'}),
            /*Array de metas*/
            metas,
            /*Guarda um cache das datas utilizadas para metas*/
            datas_cache = {},
            /*Busca no servidor informacoes sobre metas*/
            _carregar = function(cb){
                var data = campos.data.prevista.val().formatDateMySql(),
                    key = data.substr(0,7),
                    __exec = function(){
                        _p.show();
                        _exibirMeta();
                        typeof cb == 'function' && cb();
                    };
                
                if(!fun_validaData(data.format_date_br())) return;
                
                /*Este ano-mes ainda nao fora carregado?*/
                if(!datas_cache[key]){
                    _p.loading();
                    
                    MD.Metas.Ajax('METAS_MENSAIS_PREVIEW',data,function(r){
                        datas_cache[key] = metas = $.parseJSON(r);
                        __exec();
                    });
                }else{
                    metas = datas_cache[key];
                    __exec();
                }
            },
            /*Exibe meta da categoria selecionada*/
            _exibirMeta = function(){
                /*Esta selecionado uma transferencia, esconde este painel*/
                if(p.find('.nl-tipo:checked').val() == 'T'){
                    _p.hide();
                    return;
                }

                var 
                aux = campos.tipo.filter(':checked').val(),
                /*Codigo da categoria em exibicao*/
                cat = aux == 'D' ? campos.cadastros.categoria.despesa.val() : (
                      aux == 'R' ? campos.cadastros.categoria.receita.val() : null);
                      
                /*Possivelmente tela de transferencia - para*/
                if(!cat) return;
                
                var meta = metas[cat];

                var table = __createTable(meta);
                /*Se tem pai, faz um prepend em table*/
                if(meta.pai) table = __createTable(metas[meta.pai]) + table;
                /*Exibe preview metas*/
                _p.html(table);
                _p.show();

                $(".meta-preview-definir").click(function(){
                    var m = $(this).closest('.meta'),
                    id = m.attr("cod");

                    MD.Metas.novaMeta(id,metas[id].nome,false,function(){
                        /*Reinicia cache para pode forcar recarregamento*/
                        datas_cache={};
                        _carregar();
                    });
                });


                function __createTable(meta){

                    var v = campos.valor.previsto.val().replace(/R\$|\s/gi,'').parseFloat(),
                    e = campos.confirmado.filter(':checked:visible').length,
                    v_p = v + meta.proj,
                    v_e = e ? v + meta.conf : meta.conf;

                    var ncriada = meta.valor == null; 

                    var negativo = meta.D,
                        oproj = MD.Metas.percentuaisMeta(meta.valor,v_p,negativo),
                        oconf = MD.Metas.percentuaisMeta(meta.valor,v_e,negativo);

                    return "<table style='width:190px;' class='meta' cod='"+meta.id+"'>"+
                        "<tr>"+
                            "<td style='background:#F8F4F0; font-weight:bold;'>"+
                                 meta.nome + ": " +(!ncriada ? 'R$ ' + meta.valor.number_format(2,',','.') : '<a tabindex="-1" class="meta-preview-definir" href="javascript:void(0);" style="color: blue;">Definir</a>') + 
                            "</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Projetado: <span style='font-weight:bold;'>R$ "+ v_p.number_format(2,',','.') +"</span></td>"+
                        "</tr>"+
                        (!ncriada ? 
                        "<tr>" + 
                            '<td class="meta-valor-graf meta-prevista-perc">' + 
                                '<span class="meta-full-bar">' + 
                                    '<span class="meta-parc-bar meta-bar-proj ' + oproj.situacao + '" style="width:'+ (oproj.razao <= 100 ? oproj.razao : 100)+ '%;">'+ oproj.razao.number_format(2,',','.') + '%</span>' + 
                                '</span>' + 
                            '</td>' + 
                        '</tr>' : '' ) + 
                        "<tr>"+
                            "<td>Confirmado: <span style='font-weight:bold;'>R$ "+ v_e.number_format(2,',','.') +"</span></td>"+
                        "</tr>"+
                        (!ncriada ? 
                        "<tr>" + 
                            '<td class="meta-valor-graf meta-prevista-conf">' + 
                                '<span class="meta-full-bar">' + 
                                    '<span class="meta-parc-bar meta-bar-conf ' + oconf.situacao + '" style="width:'+ (oconf.razao<= 100 ? oconf.razao : 100)+ '%;">'+ oconf.razao.number_format(2,',','.') + '%</span>' + 
                                '</span>' + 
                            '</td>' + 
                        '</tr>' : '' ) + 
                    "</table>";
                }
            }
            _p.show();
            _p.loading();
            /*Os eventos sao criados apenas apos a primeira carga das metas*/
            _carregar(function(){
                /*Muda meta exibida quando mudar categoria selecionada*/
                p.find('.nl-categorias').on('change',_exibirMeta );
                /*Atualiza valor da meta com valor inputado*/
                campos.valor.previsto.keyup(_exibirMeta);
                /*Quando muda o tipo de lancamento atualiza..*/
                p.find('.nl-tipo').change(_exibirMeta);
                /*Se marcar que esta confirmado, atualiza*/
                campos.confirmado.change(_exibirMeta);
                campos.data.prevista.blur(function(){
                    /*Para que o blur ocorra depois do onClose do Datepicker*/
                    setTimeout( _carregar ,200);
                });

            });
            _M.prototype.reload = function(){datas_cache = {}; _carregar();};
            
            
            return new _M;
        },
        /*Painel de contas*/
        contas = function(){
            var
            _C = function(){},
            _p = add({title:'Saldo do mês atual'});

            var contas = {},
            ultimo_dia,
            /*Retorna o valor baseado na data*/
            _getValor = function(){
               var data = campos.data.prevista.val().formatDateMySql();
               return datecmp(data,ultimo_dia) <= 0 ? campos.valor.previsto.val().parseFloat() : 0;
            },
            _carregar = function(){

                _p.loading();
                ControladorMeuDinheiro('SALDO_CONTAS_PREVIEW',function(r){
                    _p.show();
                    r = $.parseJSON(r);
                    contas = r.contas;
                    ultimo_dia = r.max;
                    /*Deve estar dentro do retorno do ajax*/
                    p.find('.nl-contas').on( "change", _exibirConta );

                    campos.valor.previsto.keyup(_exibirConta);
                    /*Quando muda o tipo de lancamento atualiza..*/
                    p.find('.nl-tipo').change(_exibirConta);
                    /*Se marcar que esta confirmado, atualiza*/
                    campos.confirmado.change(_exibirConta);

                    campos.data.prevista.blur(function(){
                        /*Para que o blur ocorra depois do onClose do Datepicker*/
                        setTimeout(_exibirConta,200);
                    });

                    _exibirConta();
                });
            },
            /*Exibe informacoes da conta selecionada*/
            _exibirConta = function(){

                var 
                valor = _getValor(),
                e = campos.confirmado.filter(':visible:checked').length,
                r = p.find('.nl-tipo:checked'),
                cod, nome, table ,d;

                if(r.val() == 'T'){
                    /*Montando conta origem*/
                    cod = campos.cadastros.conta.contao.val();
                    nome = campos.cadastros.conta.contao.find('option:selected').html();
                    d = __dadosConta(cod,-1);
                    table = __createTable(nome,d.conf,d.cor_conf,d.proj,d.cor_proj);
                    /*Montando conta destino*/
                    cod = campos.cadastros.conta.contad.val();
                    nome = campos.cadastros.conta.contad.find('option:selected').html();
                    d = __dadosConta(cod,1);
                    table += __createTable(nome,d.conf,d.cor_conf,d.proj,d.cor_proj);
                }else{
                    /*Montando conta destino*/
                    cod = campos.cadastros.conta.conta.val();
                    nome = cod && !cod.match(/^(0|\s)$/) ? campos.cadastros.conta.conta.find('option:selected').html() : 'Sem conta';
                    d = __dadosConta(cod,r.val() == 'D' ? -1 : 1);
                    table = __createTable(nome,d.conf,d.cor_conf,d.proj,d.cor_proj);
                }

                _p.html(table);
                _p.show();

                function __dadosConta(cod,sinal){

                    cod = cod || 0;

                    var conf = contas[cod].conf + (e ? valor * sinal : 0),
                    proj = contas[cod].proj + valor * sinal,
                    cor_conf = conf > 0 ? 'saldo_positivo' : conf < 0 ? 'saldo_negativo' : 'saldo_zerado',
                    cor_proj = proj > 0 ? 'saldo_positivo' : proj < 0 ? 'saldo_negativo' : 'saldo_zerado';

                    return {
                        conf : conf,
                        proj : proj,
                        cor_conf : cor_conf,
                        cor_proj : cor_proj
                    };
                }

                function __createTable(nome,conf,cor_conf,proj,cor_proj){
                    conf = conf || 0;
                    proj = proj || 0;
                    return "<table style='width:190px;'>"+
                        "<tr>"+
                            "<td style='background:#F8F4F0; font-weight:bold;'>Conta: "+ nome +"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Saldo atual: <span class='"+cor_conf+"' style='font-weight:bold;'>R$ "+ conf.number_format(2,',','.') +"</span></td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Saldo projetado: R$ <span class='"+cor_proj+"'  style='font-weight:bold;'>"+ proj.number_format(2,',','.')  +"</span></td>"+
                        "</tr>"+
                    "</table>";
                }

            }
            _p.show();
            _carregar();
            _C.prototype.reload = _carregar;
            return new _C;
        };
        
        fn.init = function(){
            /*Se usuario eh basico...*/
            if(basico) return;
            /*Inicializa destino*/
            dest = d.dialog.find('.cad-nl');
            /*Cria area de preview*/
            o.insertAfter(dest).show();
            fn.metas = metas();
            /*Tela de cartao nao possui saldo..*/
            if(tipo != 'CARTAO') fn.contas = contas();
        }
        
        /*Classe estatica*/
        return new P;
    })();

    /**
     * Valida e seta o valor de um lancamento a partir de um campo.
     * @param l Objeto MD.Lancamento.
     * @param tipo Tipo do valor a setar.
     * @param campo Campo para pegar o valor.
     * @param valor_zero Se eh permitido que o valor seja zero.
     */
    function _setValor(l,tipo,campo,valor_zero){

        var aux = campo.validate({
            alert: true,
            msg: "Preencha o valor corretamente.",
            func:function(){return $(this).valida_campo_valor(valor_zero);}
        });
        /*Valor invalido*/
        if(aux === false) return false;
        /*Valor previsto*/
        l.option('valor.'+tipo ,aux.parseFloat() * (l.option('tipo') == 'R' ? 1 : -1) );

        return true;
    }

    /**
     * Valida e seta a data de um lancamento a partir de um campo.
     * @param l Objeto MD.Lancamento.
     * @param tipo Tipo do valor a setar.
     * @param campo Campo para pegar o valor.
     */
    function _setData(l,tipo,campo){
        var 
        /*Lancamento esta marcado como confimardo?*/
        conf = l.option('status.confirmado'),
        hoje = get_date("Y-m-d"),
        aux = campo.validate({
            func:function(){
                if(tipo == 'prevista'){
                    /*Data maxima prevista liberada se nao esta confirmado ou estamos na edicao*/
                    return $(this).valida_data_sistema(null, !conf || id ? null : hoje );
                }else if(tipo == 'efetiva'){
                    return $(this).valida_data_sistema(null, !conf ? null : hoje );
                }
            }
        });
        /*Valor invalido*/
        if(aux === false) return false;
        /*Valor previsto*/
        l.option('data.'+tipo ,aux.formatDateMySql());

        return true;
    }

    var func;
    
    switch(tipo.toLowerCase()){
        case 'inicial'  : func = _inicial; break;
        case 'cartao'   : func = _cartao; break;
        case 'pagamento': func = _pagamento; break;
        case 'parcela'  : func = _parcela; break;
        case 'sonho'    : func = _sonho; break;
        case 'grupo'    : func = _grupo; break;
        case 'normal'   : 
        default: 
            func = _normal; break;
    }
    
    var conf = func();
    
    conf.scroll = {
        enabled : true,
        o : '.cad-main-ul:first'
    }
    
    conf.closeButton = false;
    
    d = jDialog(conf);
    
    scroll = d.scroll;
};

var excluir = fn.excluir = function(lancamento){
    var codigo = lancamento.option('codigo'),
        virtual = lancamento.option('virtual'),
        grupo = lancamento.option('grupo'),
        d = jDialog({
        title : 'Excluir lançamento',//!grupo ? 'Excluir lançamento' : 'Excluir grupo de lançamentos',
        showButtons : false,
        ajax : _carregar,
        buttons : {
            'Excluir' : _excluir,
            'Cancelar' : function(){
                d.close();
            }
        }
     });
     
     function _carregar(){
         Ajax.call(this,'TELA_EXCLUSAO',lancamento.encode(),function(r){
             $(this).html(r);
             /*Verificando comportamento anormal nesta tela*/
             if($('.jdialogerror')[0]){
                 var _t = $('.jdialogerror').html();
                 d.close();
                 jAlert(_t,'Excluir lançamento');
                 return;
             }
             d.showButtons();
         });
     }
     
     function _excluir(){
         
        var l = new MD.Lancamento({
            codigo         : codigo,
            virtual        : virtual,
            grupo          : grupo,
            tipo           : $("#hiddendata").attr('tipo')
        });
        l.option('repetir.alteracao',$("input[name='edicao_repeticao']:checked").val() );
        l.option('data.anterior',$("#hiddendata").attr('data') );
                
        Ajax('EXCLUIR',l.encode(),function(r){
            d.close();
            if(!telaBuscaVisivel()){
                switch(MD.Inicializar.pagina()){
                    case 'movimentacoes': MD.Agenda.movimentacoes(); break;
                    case 'visaogeral': MD.Resumo.carregarPaineis(); break;
                    case 'cartoes': MD.CartaoCredito.fatura(); break;
                    case 'metas/economia': MD.Sonhos.detalhes(lancamento.option('sonho')); break;
                }
            }else{
                MD.Busca.buscar();                
            }
        });
     }
}

var confirmar = fn.confirmar = function(lancamento,conciliar){
    
    var 
    codigo = lancamento.option('codigo'),
    virtual = lancamento.option('virtual'),
    grupo = lancamento.option('grupo'),
    conciliar = conciliar ? 1 : 0,
    d = jDialog({
        title : (conciliar ? 'Conciliar' : 'Confirmar') + ' lançamento',
        showButtons : false,
        ajax : _carregar,
        buttons : {
            'Confirmar' : _confirmar,
            'Cancelar' : function(){
                d.close();
            }
        }
     }),
     /*Lancamentos grupo*/
     lgs = {};
     
     function _carregar(){
         Ajax.call(this,'TELA_CONFIRMACAO',lancamento.encode(),function(r){
            $(this).html(r);
            d.showButtons();
             
            var anexar = comprovante;

            if(grupo){
                lgs = $.parseJSON($("#valores-confirmacao-grupo").html());
                $("#valores-confirmacao-grupo").remove();
            }

            anexar.init();
            /*Formata mascara do campo de valor*/
            $("#valor_efetivacao").priceFormat();

            /*Exibe a data de hoje e cria uma mascara para datas*/
            $("#data_efetivacao").current_date_format();

            var data_fim = get_date("Y-m-d").split('-');
            $("#data_efetivacao").calendario({
                maxDate: new Date(data_fim[0],data_fim[1]-1,data_fim[2]) /*Data maxima = hoje*/
            });

            var valor_anterior  = parseFloat(d.dialog.find("#hiddendata").attr('valor'));

            $("#select_conta_confirmacao").change(function(){

                var toggle = $(this).find("option:selected").attr('plastico') ? true : false;
                $("#select_formapgto_confirmacao").toggle(!toggle);
                $("#select_formapgto_confirmacao_cc").toggle(toggle);

            });
            
            $("#link-detalhes-confirmacao-grupo").click(function(){
                var 
                saldo = 0,
                that = this;
                var dd = new jDialog({
                    title : "Editar valores confirmação",
                    showButtons : false,
                    ajax : function(){
                        Ajax("ALERT_VALORES_CONFIRMACAO_GRUPO",JSON.stringify({virtual:virtual,grupo:grupo}),function(r){
                           dd.html(r).showButtons().center(); 
                           dd.dialog.find('.campo-valor').priceFormat().keyup(_saldo);
                           dd.dialog.find('.sinal').click(_saldo);
                           
                           function _saldo(){
                               saldo = 0;
                               dd.dialog.find('.campo-valor').each(function(){
                                   var sinal = parseFloat($(this).closest('tr').find('.sinal:checked').val());
                                   saldo += $(this).val().parseFloat() * sinal;
                               });
                               $("#valor-confirmacao-grupo-saldo").html(saldo.formatCurrency(true)).corSaldo(saldo);
                           }
                           _saldo();
                           
                        });
                    },
                    buttons : {
                        'Atualizar valores' : function(){
                            
                            $(that).siblings('span').html(saldo.formatCurrency(true)).corSaldo(saldo);
                            
                            dd.dialog.find('.campo-valor').each(function(){
                                var sinal = parseFloat($(this).closest('tr').find('.sinal:checked').val()),
                                id = $(this).closest('tr').attr('cod');
                                lgs[id] = $(this).val().parseFloat() * sinal;
                            });
                            d.dialog.find("#hiddendata").attr('valor',saldo);
                            dd.close();
                        },
                        'Cancelar' : function(){
                            dd.close();
                        }
                    }
                });
                
            });
            
         });
     }
     
     function _confirmar(){
         
        var l = new MD.Lancamento({
            codigo : codigo,
            virtual : virtual,
            grupo : grupo
        }),
        dados = $("#hiddendata"),
        tipo = dados.attr('tipo'),
        fator = dados.attr('fator') == 'R' ? 1 : -1,
        valor_anterior = Math.abs(parseFloat(dados.attr('valor'))),
        residuo = $("#gerar_residuo:checked").length,
        pagamento = dados.attr('pagamento');
        /*Novo status do lancamento*/
        l.option('status',{
            confirmado : 1,
            conciliado : conciliar
        });
        /*Valor da confirmacao*/
        var valor = l.option('valor.efetivo',!grupo ? ($("#valor_efetivacao").val().parseFloat() * fator) : (valor_anterior * fator) );
        /*Data da confirmacao*/
        l.option('data.efetiva',$("#data_efetivacao").val().formatDateMySql());
        /*Tipo do lancamento*/
        l.option('tipo',tipo);
        /*Data antes da confirmacao*/
        l.option('data.anterior',dados.attr('data'));
        /*Dados de repeticao*/
        l.option('repetir',{
            nparcela : dados.attr('nparcela')
        });
        
        l.option('cadastros',{
            conta          : $("#select_conta_confirmacao").val(),
            plastico       : $("#select_conta_confirmacao option:selected").attr('plastico'),
            forma          : $(".select_formapgto_confirmacao:visible").val()
        });
        
        l.option('ndocumento',$("#ndocumento_confirmacao").val());

        l.option('comprovante',comprovante.codigo);

        if(!grupo){
            if($("#valor_efetivacao").validate({
                func:function(){
                    return $(this).valida_campo_valor();
                }
            }) === false) return;
        }else{
            if(valor_anterior == 0){
                jAlert("O valor de confirmação não pode ser igual a zero","Valor inválido");
                return;
            }
        }
        
        if($("#data_efetivacao").validate({
            func:function(){
                return $(this).valida_data_sistema(null,get_date("Y-m-d"));
            }
        }) === false) return;
        
        if(residuo == 1 && valor_anterior <= Math.abs(valor)){
            jConfirm("Não é possível gerar um resíduo.<br/>O valor informado"+
                        " é maior ou igual ao resíduo. Confirmar a operação? ",'Geração de resíduo', function(r){
                if(r) __submit();
            });
        } else __submit();
        
        function __submit(){


            Ajax("CONFIRMAR",l.encode(),JSON.stringify(lgs),function(r){

                var novo_codigo = r;

                /*Fecha janela do jAjax*/
                d.close();

                if(!telaBuscaVisivel()){

                    if(MD.Inicializar.pagina() == 'visaogeral') MD.Resumo.carregarPaineis();
                    else MD.Agenda.movimentacoes();
                } 
                else {
                    MD.Busca.buscar();
                }

                /*Atualiza informacoes*/
                var comp = novo_codigo != codigo ;
                codigo = comp ? novo_codigo : codigo;
                virtual = comp ? 0 : virtual;

                if(residuo == 1 && valor_anterior - Math.abs(valor) > 0)
                {
                    var diff = valor_anterior - Math.abs(valor);
                    diff = diff.toFixed(2);

                    editar(new MD.Lancamento({
                        residuo : codigo,
                        virtual : virtual,
                        data : {prevista : l.option('data.anterior')},
                        valor : {previsto: diff * fator}
                    }),pagamento ? 'PAGAMENTO' : 'NORMAL');
                }
            }); 
        }
     }
}


var conciliar = fn.conciliar = function(codigo,grupo){

    Ajax('CONCILIAR',codigo,grupo,function(){
        if(!telaBuscaVisivel()){
            if(MD.Inicializar.pagina() == 'visaogeral') MD.Resumo.carregarPaineis();
            else MD.Agenda.movimentacoes();
        } 
        else {
            MD.Busca.buscar();
        }
    });
}

var preview = fn.previewNovoLancamento = (function(){
                
    var 
    Preview = function(){},
    /*A area de preview*/
    prev,
    /*Template de um painel no preview*/
    panel_template = "<div class='panel-preview-novo-lancamento'><div class='title-panel-preview'></div><div class='title-panel-content'></div></div>",
    /*Referencia externa*/
    fn = Preview.prototype,
    /*Classe de um painel*/
    painel = function(config){
       
        if(!(this instanceof arguments.callee)) return new arguments.callee(config);   
        
        
        var 
        panel = this.panel = $(panel_template),
        that = this;
        
        var title = this.title = function(t){
            return panel.find('.title-panel-preview').html(t);
        }
        
        var html = this.html = function(t){
            panel.find('.title-panel-content').html(t);
            centerjDialog();
            return that;
        }
        var show = this.show = function(t){
            panel.show();
            prev.show(!isEmpty());
            return that;
        }
        var hide = this.hide = function(t){
            panel.hide();
            prev.hide(isEmpty());
            return that;
        }
        
        var loading = this.loading = function(){
            display_loading_gif_ajax(panel.find('.title-panel-content'));
        }
        
        this.remove = function(){
            panel.remove();
        }
        
        title(config.title);
        html(config.text);
        
        config.ajax && config.ajax.call(this);
        
    };
    
    function isEmpty(){
        return !!$(".panel-preview-novo-lancamento:visible")[0];
    }
    
    /*Adiciona um novo painel*/
    fn.add = function(config){
        
        if(!prev) return;
        
        var p = painel(config);
        prev.append(p.panel);
        return p;
    };
    
    fn.show = function(){
        if(!prev) return;
        prev.show();
    }
    
    fn.init = function(dest){
        /*Se usuario eh basico...*/
        if(dest.attr('vb') == '1') return;
        prev = this.o = $("<div class='preview-novo-lancamento'></div>");
        /*Cria area de preview*/
        prev.insertAfter(dest);
    }
    
    return new Preview;
})();
  
var comprovante = fn.anexarComprovante = (function(){
  
    var Anexar = function(){},
        fn = Anexar.prototype,
        o, // Botao de anexar
        u, // Botao de desfazer
        popup //Referencia ao popup window;
  
    function set(codigo){
        /*Salva para acesso posterior*/
        fn.codigo = codigo;
    }
      
    fn.init = function(){
        
        fn.codigo = null;
        /*Referencia ao link*/
        o = fn.o = $("#anexar-comprovante");
        
        /*Usuario nao usa comprovantes*/
        if(!o[0]) return false;
        
        o.click(function(){
            popup = fn.popup = window.open('gd','Comprovante','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=500,height=420');
        });

        u = $('#anexar-comprovante-desfazer').click(function(){
            jConfirm('O arquivo não será removido da sua pasta no Google Drive,<br>apenas desassociado deste lançamento.','Descartar comprovante',function(r){
                if(r){
                    fn.codigo = undefined;
                    u.add(o).toggle();
                }
            })
        }).attr('title','Clique para desassociar este comprovante');
        
        /*Se eh um codigo valido, estamos na tela de edicao com um comprovante ja existente*/
        if(!isNaN(parseFloat(u.attr('cod'))))
            /*Seta o codigo*/
            set(u.attr('cod'));
        
        return this;
    };
    
    fn.handle = function(codigo,comprovante){
        /*Houve algum erro!*/
        if(!codigo || !comprovante || !comprovante.alternateLink || !comprovante.webContentLink){
            jAlert('Ocorreu um erro inesperado ao tentar salvar este comprovante.','Erro inesperado');
            return;
        } 
        set(codigo);
        /*Troca exibicoes dos links*/
        o.add(u).toggle();
        
        /*Exibe o prwview de uma lancamento*/
//        var _showPreview = function(){
//            var span = $(this);
//
//            /*Removendo qualquer preview na tela*/
//            $("#actions-comprovante").remove();
//
//            var preview = $("<div id='actions-comprovante'></div>"),
//                actions = preview.append('<table><tr></tr></table>').find("tr"),
//                _closePreview = function(){ 
//                    preview.remove(); 
//                    span.one('mouseenter',_showPreview );
//                }
//
//            span.closest('span,td').one('mouseleave', _closePreview );
//
//            actions.append("<td><a href='"+comprovante.webContentLink+"'><img title='Baixar comprovante' src='./img/meudinheiro/download.png' /></a></td>");
//            actions.append("<td><a href='"+comprovante.alternateLink+"' target='_blank'><img title='Visualizar comprovante' src='./img/meudinheiro/eye.png' /></td>");
//            actions.append("<td id='cancelar-anexo'><img title='Desassociar comprovante' src='./img/delete.png' /></td>").find('#cancelar-anexo')
//            .click(function(){
//                /*Apaga qualquer comprovante previamente anexado*/
//                fn.codigo = undefined;
//                u.add(o).toggle();
//            });
//            
//            /*Insere na linha*/
//            span.append(preview);
//        };
//        
//        /**
//         * Se for i.e, quando fecha o popup, essa funcao perde a referencia pro
//         * callee e da pau!
//         */
//        if(!$.browser.msie) u.one('mouseenter', _showPreview );
        
        
    };
    
    fn.toggleLink = function(toggle){
        o.toggle(toggle);
    }
  
    fn.closePopup = function(){
        popup && popup.close();
    };
  
    return new Anexar;

})();

var Ajax = fn.Ajax = function(){
    ControladorMeuDinheiro.apply(this,['LANCAMENTOS'].concat(Array.prototype.slice.call(arguments)));
    
}


})(window,window.MD,jQuery);
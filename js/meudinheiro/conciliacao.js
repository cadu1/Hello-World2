(function(MD,$){
    
var Conciliacao = function(){},
fn = Conciliacao.prototype,
Ajax = new MD.Controlador('CONCILIACAO');

MD.Conciliacao = new Conciliacao;
    
var pagina = fn.pagina = function(){
    
    preparaExibicao("link_cabecalho_conciliacao");

    Ajax("TELA",function(r){
        conteudo(r,'#conteudo',function(){
            
            eventosTela();
        });
    });
    
}

function eventosTela()
{
    
//    var extrato = {
//        data_inicio : "2014-02-15",
//        data_fim    : "2014-02-28",
//        saldo       : "1235.23",
//        conta       : 23830,//15998,
//        lancamentos : [
//            {
//                descricao : "Grupo1",
//                valor : "-3",
//                data  : "2014-02-21"
//            },
//            {
//                descricao : "Grupo cartao",
//                valor : "-29",
//                data  : "2014-02-24"
//            },
//            {
//                descricao : "Lancamento 3",
//                valor : "14.52",
//                data  : "2014-02-24"
//            },
//            {
//                descricao : "Lancamento 4",
//                valor : "-234.52",
//                data  : "2014-02-22"
//            }
//        ]
//    }   
//    conciliacao(extrato);
    
    $("#botao-importar-extrato").click(function(){
//       jAjax("Importação de extrato","php/alert_importar_extrato.php") 

        MD.Importacao.escolhaModo({
            conciliacao : true,
            importacao : false
        },'Importação de extrato');

    });
    
    $(".editar_extrato").click(function(){
        var codigo = $(this).closest("tr").attr("cod");
        editarExtrato(codigo);
    });
}
    
var editarExtrato = fn.editarExtrato = function(codigo){

    var d,
    _carregar = function(){
        Ajax('TELA_EDICAO_EXTRATO',codigo,function(r){
            d.html(r).showButtons();
            $("#edicao-extrato-saldo").priceFormat();
            $("#edicao-extrato-data-inicio,#edicao-extrato-data-fim").calendario();
        })
    },
    _salvar = function(){
                
        var descricao = $("#edicao-extrato-descricao").val().trim();
        var saldo = $("#edicao-extrato-saldo").val().replace("R$ ","").parseFloat();
        
        saldo *= $("#extrato_positivo:checked")[0] ? 1 : -1;
        
        var data_inicio = $("#edicao-extrato-data-inicio").val().replaceAll(" ","").formatDateMySql();
        var data_fim = $("#edicao-extrato-data-fim").val().replaceAll(" ","").formatDateMySql();

        if (fun_validaData(data_inicio.format_date_br()) && fun_validaData(data_fim.format_date_br()) ){

            var extrato = {
                codigo      : codigo,
                descricao   : descricao,
                saldo       : saldo,
                data_inicio : data_inicio,
                data_fim    : data_fim
            };

            Ajax("ATUALIZAR_EXTRATO",JSON.stringify(extrato),function(r){
                d.close();
                pagina();
            });
        }else{
            alert("Período inválido");
        }
    }
    
    d = jDialog({
       title : 'Editar extrato',
       showButtons : false,
       ajax : _carregar,
       buttons : {
           'Salvar' : _salvar,
           'Cancelar' : function(){
               d.close();
           }
       }
    });

};

    
var conciliacao = fn.conciliacao = function(extrato){
    
    Ajax("INICIAR_CONCILIACAO",JSON.stringify(extrato),function(r){
        conteudo(r,'#conteudo',function(){
            iniciar_conciliacao_extrato();
            
//            iniciar_importacao_lancamentos();

        });
    });
}
    
    
function iniciar_conciliacao_extrato()
{
    evento_cancelar_processo_conciliacao();
    
    var 
    campos = {
        /*Campo de saldo do extrato*/
        saldo : $("#campo-saldo-extrato").priceFormat(),
        /*Data de inicio do extrato*/
        inicio_extrato : $("#campo-data-inicio-extrato").calendario(),
        /*Data de fim do extrato*/
        fim_extrato : $("#campo-data-fim-extrato").calendario(),
        /*Data de inicio da busca dos lanamentos de sistema*/
        inicio_lancamentos : $("#data-inicio-lancamentos-sistema").calendario(),
        /*Data de inicio da busca dos lanamentos de sistema*/
        fim_lancamentos : $("#data-fim-lancamentos-sistema").calendario()
    },
    botao = {
        buscar : $("#buscar-lancamentos-sistema"),
        pular : $("#botao-iniciar-importacao"),
        resetar : $("#botao-resetar-conciliacao"),
        conciliar: $("#botao-conciliar")
    },
    /*Id da conta que esta sendo importado*/
    conta = $("#info-extrato-importado").attr("conta"),
    conc = (function(){
        /*Construtor*/
        var C = function(){},
        fn = C.prototype;
        /*Atributos*/
        var 
        w , /*Largura do espaco de desenho*/
        h, /*Altura do espaco de desenho*/
        R; /*A prancha de desenho (Raphael Object)*/

        /**
        * Gera area onde serao geradas as linhas e atribui eventos aos radios.
        * @returns void.
        */
        fn.init = function(){
            w = $("#quadro_relacionamento_conciliacao").width();
            h = $("#lancamentos_importados").height() > $("#lancamentos_agendados").height() ?
                    $("#lancamentos_importados").height() : $("#lancamentos_agendados").height();

            $("#quadro_relacionamento_conciliacao").html("").height(h);
            /*Cria area no meio das caixas com as celulas*/
            R = Raphael("quadro_relacionamento_conciliacao", w, h);
            
            $("input[name='radiosis'],input[name='radioext']").unbind("click").click(function(){
                link(this);
                _buttons();
            });

            propor_associacoes();
            
        };

        var has= fn.has = function(){
            var a = $("#lancamentos-extrato input[type='radio']:checked").length;
            var b = $("#lancamentos-sistema input[type='radio']:checked").length;
            return a>0 && b>0;
        };

        var clear = fn.clear = function(){
            
            if(has()){
                jConfirm("Deseja realmente apagar as associações feitas?","Apagar associações",function(r){
                    if(r){
                        $("#lancamentos-extrato input[type='radio']").each(function(){
                            var origem = $(this);
                            if(origem.data("dest") && origem.data("dest").o){
                                var destino = origem.data("dest").o;
                                /*Apagando conector*/
                                if(origem.data("dest").p) origem.data("dest").p.remove();
                                /*Resetando campos*/
                                origem.attr({"name" : "radioext" , "checked" : false});
                                destino.attr({"name" : "radiosis" , "checked" : false});
                                /*Apagando dados guardados*/
                                destino.data("dest",{});
                                origem.data("dest",{});
                            }
                        });

                        _buttons();
                    }
                },{ok:"Sim" ,  cancel : "Não"});
            }
        };

        var conciliar = fn.conciliar = function(){
            var lancamentos = [];

            $("#lancamentos-sistema input[type='radio']:checked").each(function(){

                var o = $(this).data("dest").o;
                if( !o ) return;

                var linha     = $(this).closest("tr");

                var codigo    = linha.attr("cod");
                var tipo      = linha.attr("tipo").trim().charAt(0);
                var virtual   = linha.attr("virtual");
                var grupo     = linha.attr("grupo");
                var data_hora = linha.attr("data_hora");
                var numero_parcela = linha.attr("nparcela");
                var data_anterior = linha.attr("data");

                var data      = o.closest("tr").attr("data");
                var valor     = o.closest("tr").attr("valor");
                var status    = o.closest("tr").attr("status");
                var ndoc      = o.closest("tr").attr("ndocumento");

                var l = new MD.Lancamento({
                    codigo        : codigo,
                    tipo          : tipo,
                    virtual       : virtual,
                    grupo         : grupo,
                    data_hora     : data_hora,
                    data : {
                        anterior : data_anterior,
                        efetiva : data
                    },
                    valor : {efetivo : valor},
                    cadastros : {conta : conta},
                    status : {confirmado: 1, conciliado:1},
                    repetir : {nparcela: numero_parcela},
                    ndocumento : ndoc
                });

                lancamentos.push(l.options()); 
            });

            var extrato = carregar_objeto_extrato();

            /*Monta uma string em formato JSON para ser utilizada no PHP*/
            Ajax("CONCILIAR",JSON.stringify(lancamentos),
                JSON.stringify(extrato),function(r){
                    var codigo_extrato = r.split(",")[0];
                    $("#info-extrato-importado").attr("cod",codigo_extrato);
                    /*Inicia importacao sem ter pulado*/
                    iniciar_importacao_lancamentos(false);
            });
        };

        function propor_associacoes()
        {
            var destinos = $("input[name='radiosis']");
            if(destinos[0]){
                $("input[name='radioext']").each(function(){
                    for(var i=0;i<destinos.length;i++)
                    {
                        if(!destinos.eq(i).attr("checked"))
                        {
                            var valora = parseFloat(destinos.eq(i).closest("tr").attr("valor"));
                            var valorb = parseFloat($(this).closest("tr").attr("valor"));
                            var dataa = destinos.eq(i).closest("tr").attr("data");
                            var datab = $(this).closest("tr").attr("data");
                            if( (valora == valorb) && (dataa == datab) )
                            {
                                $(this).click();
                                destinos.eq(i).click();
                                break;
                            }
                        }
                    }
                });
            }
            _buttons();
        }
        
        function link(origem)
        {
            origem = $(origem);
            var 
            /*O clique foi num radio box vazio?*/
            disponivel = origem.attr("name").search(/^(radioext|radiosis)$/) != -1,
            /*O clique foi num radiobox da esquerda?*/
            esquerda = origem.attr("name").search(/^radioext/) != -1,
            destino;
            
            if(disponivel){
                /*Se esta na esquerda, busca alguem marcado na direita, e vice verca*/
                destino =  esquerda ? $("input[name='radiosis']:checked") : $("input[name='radioext']:checked");

                /*Se existe um lancamento selecionado na outra coluna */
                if(destino.length == 1)
                {
                    /*Muda o nome para desassociar de outros radios*/
                    destino.attr("name",destino.attr("id"));
                    origem.attr("name",origem.attr("id"));

                    /*Calcula as alturas dos pontos*/
                    var offset = $("#quadro_relacionamento_conciliacao").offset().top;
                    var h_origin = destino.offset().top - offset + 10;
                    var h_destin = origem.offset().top - offset + 10;

                    /*Liga os pontos utilizando padrao de string SVG*/        
                    var path = R.path( !esquerda ? "M0 "+h_origin+"L"+w+" "+h_destin : "M0 "+h_destin+"L"+w+" "+h_origin);

                    /*Associando lancamentos*/

                    origem.data("dest",{o : destino , p : path});
                    destino.data("dest",{o : origem , p : path});
                    
                    verifica_lancamento_grupo(origem,destino);

                } /*Senao nao faz nada..*/
            }
            /*Senao esta disponivel, desmarca o par (se existir)*/
            else {
                destino = origem.data("dest").o;
                /*Apagando conector*/
                origem.data("dest").p.remove();
                /*Resetando campos*/
                origem.attr({"name" : esquerda ? "radioext" : "radiosis" }).prop({"checked" : false});
                destino.attr({"name" : !esquerda ? "radioext" : "radiosis" }).prop({ "checked" : false});
                /*Apagando dados guardados*/
                destino.data("dest",{});
                origem.data("dest",{});
            }
        }

        

        function verifica_lancamento_grupo(o,d){
            /*Alguma das pontas tem um codigo de grupo associado?*/
            var 
            g1 = parseFloat(o.closest('tr').attr('grupo')),
            g2 = parseFloat(d.closest('tr').attr('grupo')),
            saldo = 0,
            diff = 0;
            if(g1 || g2){
                var 
                v1 = o.closest('tr').attr('valor'),
                v2 = d.closest('tr').attr('valor');
                if(v1 != v2){
                    var virtual = g1 ? o.closest('tr').attr('virtual') : d.closest('tr').attr('virtual'),
                        data = !g1 ? o.closest('tr').attr('data') : d.closest('tr').attr('data'),
                        data_anterior = g1 ? o.closest('tr').attr('data') : d.closest('tr').attr('data'),
                        valor = g1 ? v2 : v1;
                
                    var jd = new jDialog({
                        closeButton : false,
                        title : "Confirmação dos lançamentos do grupo",
                        showButtons: false,
                        ajax : function(){
                            Ajax('TELA_CONFIRMAR_GRUPO_LANCAMENTOS',JSON.stringify({
                                valor : valor,
                                grupo : g1 || g2,
                                virtual : virtual
                            }),function(r){
                                jd.html(r).showButtons().center();
                                /*Value fields*/
                                var vf = jd.dialog.find('.ajuste-grupo-valor').priceFormat().keyup(_update);
                                $("#ajuste-valor-grupo-lancamento input[type='radio']").click(_update);
                                _update();
                                
                                
                                function _update(){
                                    saldo = 0;
                                    vf.each(function(){
                                        var sinal = $(this).closest('tr').find('input[type="radio"]:checked').val();
                                        saldo += this.value.parseFloat() * parseFloat(sinal);
                                    });
                                    
                                    diff = valor-saldo;
                                    diff = Math.abs(parseFloat(diff.toFixed(2)));
                                    
                                    $("#ajuste-valor-grupo-saldo").html(saldo.formatCurrency(true)).corSaldo(saldo);
                                    $("#ajuste-valor-grupo-diff").html(diff.formatCurrency(true));//.corSaldo(diff);
                                };
                            });
                        },
                        buttons : {
                            'Salvar' : function(){
                                /*A diferença deve estar zerada para prosseguir*/
                                if(diff === 0){
                                    var ls = {};
                                    jd.dialog.find('.ajuste-grupo-valor').each(function(){
                                        var id = $(this).closest('tr').attr('cod'),
                                        sinal = parseFloat($(this).closest('tr').find('input[type="radio"]:checked').val());
                                        ls[id] = {
                                            id : id,
                                            data : data_anterior,
                                            valor : $(this).val().parseFloat() * sinal
                                        };
                                    });
                                    
                                    Ajax('CONFIRMAR_GRUPO_LANCAMENTOS',JSON.stringify({
                                        grupo : g1||g2,
                                        virtual : virtual,
                                        data : data,
                                        lancamentos : ls
                                    }),function(novo_grupo){

                                        var obj = g1 ? o : d;

                                        obj.closest('tr').attr('grupo',novo_grupo);
                                        obj.closest('tr').removeAttr('virtual');
                                        obj.closest('tr').attr('data',data).find('.coluna-data label').html(data.format_date_br());
                                        obj.closest('tr').attr('valor',saldo).find('.coluna-valor label').html(saldo.formatCurrency()).corSaldo(saldo);

                                        jd.close();
                                    });
                                }else{
                                    
                                    jAlert('O valor total do grupo deve ser igual ao valor no extrato.','Valor inconsistente');
                                    
                                }
                                
                                
                            },
                            'Cancelar' : function(){
                                jd.close();
                                /*Deixa marcado o campo com o grupo*/
                                if(g1) o.click();
                                else d.click();
                            }
                        }
                    });
                }
            }
        }

        return new C;

    })(),
    /*Carrega os lancamentos do sistema a partir da data nos campos de data*/
    _load = function(){
        var 
        data_inicio = campos.inicio_lancamentos.val().formatDateMySql(),
        data_fim =  campos.fim_lancamentos.val().formatDateMySql(),
        /*Auxiliar para carregar*/
        __load = function(){
            display_loading_gif_ajax($("#lancamentos-sistema"));
            conc.clear();
            Ajax("CARREGAR_LANCAMENTOS",data_inicio,data_fim,function(r){
                conteudo(r,'#lancamentos-sistema',function(){
                    $("#lancamentos-sistema .qtitle").qtitle();
                    /*Reinicializa espaco de conciliacao*/
                    conc.init();
                });
            });
        };
        /*Data de fim eh maior que a de inicio?*/
        if(datecmp(data_fim,data_inicio) >= 0){
            /*A diferente entre o inicio e fim eh de no maximo 2 meses?*/
            if(diff_date( data_fim,data_inicio, "MONTH",1) <= 2 ){
                
                 if(conc.has()){
                    jConfirm("As associações existentes serão apagadas.<BR/>Confirma a mudança de período?", "Mudança de período", function(r) {
                            if (r)  __load();
                        }, {ok: "Sim", cancel: "Não"});
                } else __load();
            } else jAlert("Não foi possível carregar os lançamentos agendados.<br/>A diferença máxima entre os períodos informados deve ser 2 meses.","Período dos lançamentos agendados inválido");
        } else jAlert("A data de início deve ser menor ou igual a data de fim.","Período inválido");
    },
    /*Atualiza o estado dos botoes na tela*/
    _buttons = function(){
        if(conc.has()){
            botao.conciliar.enableButton();
            botao.resetar.enableButton();
            botao.pular.disableButton();
        }else{
            botao.resetar.disableButton();
            botao.conciliar.disableButton();
            botao.pular.enableButton();
        }
    };

    
            
    botao.conciliar.unbind("click").click(function(){
        if(!$(this).hasClass("disabled")){
            jConfirm("Deseja realmente conciliar os lançamentos associados?","Conciliar lançamentos",function(r){
                if(r) conc.conciliar();
            },{ok:"Sim" ,  cancel : "Não"});
        }
    });
        
    botao.pular.unbind("click").click(function(){
        if(!$(this).hasClass("disabled")){
            jConfirm("Deseja realmente pular esta etapa e iniciar a importação?","Iniciar importação",function(r){
                /*Chama importacao indicando que pulou a tela..*/
                if(r) iniciar_importacao_lancamentos(true);
            },{ok:"Sim" ,  cancel : "Não"});
        }
            
    });
    
    botao.resetar.unbind("click").click(conc.clear);
    /*Cadastrando evento de busca*/
    botao.buscar.unbind('click').click(_load);
    /*Dando carga inicial de lancamentos*/
    _load();
}
  

var iniciar_importacao_lancamentos = fn.iniciar_importacao_lancamentos = function(pulou){

    var lancamentos = [];
    var conta     = $("#info-extrato-importado").attr("conta");

    $("#lancamentos-extrato input[name='radioext']").each(function(){
        var linha = $(this).closest("tr");
        var data = linha.attr("data");
        var valor = linha.attr("valor");
        var ndoc = linha.attr("ndocumento");
        var descricao = linha.find(".coluna-descricao label").html().trim();
        lancamentos.push({
            data : data,
            valor : valor,
            descricao: descricao,
            ndocumento : ndoc
        });
    });
    if(lancamentos.length > 0)
        MD.Importacao.importacaoLancamentos(lancamentos,conta,pulou);
    else 
        MD.Inicializar.hashes.reloadCurrentHash();
}


})(window.MD,jQuery);

/*Usado tambem na rotina de importacao*/
function carregar_objeto_extrato()
{
    if($("#info-extrato-importado.extrato")[0]){
        var conta     = $("#info-extrato-importado").attr("conta");
        var codigo = $("#info-extrato-importado").attr("cod");

        return {
            codigo : codigo,
            conta: conta,
            descricao: $("#campo-descricao-extrato").val().trim(),
            saldo: $("#campo-saldo-extrato").val().replace("R$ ","").parseFloat() * ( $("#extrato_positivo:checked")[0] ? 1 : -1 ),
            data_inicio : $("#campo-data-inicio-extrato").val().replaceAll(" ","").formatDateMySql(),
            data_fim : $("#campo-data-fim-extrato").val().replaceAll(" ","").formatDateMySql()
        }
    }
    return null;
}
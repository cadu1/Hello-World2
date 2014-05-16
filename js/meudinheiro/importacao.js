(function(window,MD,$){
    
var 
/*Construtor*/
Importacao= function(){},
/*Atalho*/
fn = Importacao.prototype,
Ajax = fn.Ajax = new MD.Controlador('IMPORTACAO');
/*Expondo metas ao MD Global*/
MD.Importacao = new Importacao;


var escolhaModo = fn.escolhaModo = function(config,title,conta){
    
    var d = new jDialog({
        title : title || 'Importação de lançamentos',
        ajax : function(){
            Ajax('ESCOLHA_MODO',JSON.stringify(config || { conciliacao : true , importacao : true }),function(r){
                d.html(r).center();
                $("#alert-importacao").tabs({
                    activate : function(){ d.center(); },
                    create : function(){ d.center(); }
                });
                /*Se o usuario puder importar o extrato, cria os eventos*/
                _upload_file('./php/upload_lancamentos.php',['ofx','ofc','xls','xlsx','csv','txt'],
                 function(id, file_name, json){
                    /*Existe erro no arquivo*/
                    if(json.conteudo.error){
                        alert(json.conteudo.error);
                    }else{
                        var lancamentos = json.conteudo;
                        _verificaInversaoSinal(lancamentos);
                        d.close();
                            display_loading_gif_ajax("#conteudo");
                        importacaoLancamentos(lancamentos,conta);

                    }
                },function(id, file_name){
                    return true;
                },'upload_lancamentos');

                _upload_file('./php/upload_extrato.php',['ofx','ofc'],
                 function(id, file_name, json){
                    /*Existe erro no arquivo*/
                    if(json.conteudo.error){
                        alert(json.conteudo.error);
                    }else{
                        var conta = $("#select_importar option:selected").attr("cod");
                        json.conteudo["conta"] = conta;
                        d.close();
                        _verificaInversaoSinal(json.conteudo.lancamentos);
                            display_loading_gif_ajax("#conteudo");
                        MD.Conciliacao.conciliacao(json.conteudo);
                    }
                },function(id, file_name){

                    if($("#select_importar option:selected").attr("cod") == 0)
                    {
                        alert("Escolha uma conta para iniciar o processo de conciliação.");
                        $("#select_importar").focus();
                        return false;
                    }
                    return true;
                },'upload_extrato');
                
            });
        },
        buttons : { 'Fechar' : function(){ d.close(); } }
    });
    
    
    function _upload_file(action,allowedExtensions,onComplete,onSubmit,id)
    {
        if(!$("#"+id)[0]) return false; // Elemento nao existe
        return new qq.FileUploader({
                element: document.getElementById(id),
                action: action,
                multiple: false,
                allowedExtensions: allowedExtensions,
                sizeLimit: 200*1024,
                messages: {
                    typeError: "Extensão inválida. Extensões permitidas: {extensions} .",
                    sizeError: "Arquivo muito grande.Tamanho máximo: {sizeLimit}.",
                    onLeave: "Caso você saia desta página, seu upload será cancelado."
                },
                template: $("#" + id).html(),            
                fileTemplate: '<li>' +
                    '<span class="qq-upload-file"></span>' +
                    '<span class="qq-upload-spinner"></span>' +
                    '<span class="qq-upload-size"></span>' +
                    '<a class="qq-upload-cancel" href="#">Cancelar</a>' +
                    '<span class="qq-upload-failed-text">Falha ao carregar arquivo</span>' +
                '</li>',
                onSubmit: onSubmit,
                onComplete: onComplete
            });
    }
    
    function _verificaInversaoSinal(lancamentos){
        if(!!$("#inverter-sinais:checked")[0]) 
            $.each(lancamentos,function(){ 
                this.valor = -parseFloat(this.valor); 
            });
    }
}

var importacaoLancamentos = fn.importacaoLancamentos = function(lancamentos,conta,pulou){
    
    Ajax("INICIAR_IMPORTACAO_LANCAMENTOS",JSON.stringify(lancamentos),conta,pulou,function(r){
        
        
        var d = $("#area-conciliacao")[0] ? "#area-conciliacao" : '#conteudo';
        conteudo(r,d);
        
        
        $(".md-header").scrollwatchmd();
        
        /*Muito lento para muitos lancamentos..*/
//        $(".autocompleteselect").autocompleteselect();
        
        evento_cancelar_processo_conciliacao();
    
        $(".checkbox-transf").click(function(){
            var table = $(this).closest("table"),
                transferencia = table.find(".transferencia"),
                normal        = table.find(".normal"),
                cc = $(this).attr("pgto");

           var desc = table.find(".campo-descricao-importacao");

           if(this.checked){
               transferencia.show();
               normal.hide();
           }else{
               transferencia.hide();
               normal.show();
           }

           if(cc){
               desc.toggle(!this.checked);
               var span = desc.siblings('span');
               if(!span[0]){
                   var nome = table.find('.select-contas-destino-importacao option:selected').html().trim();
                   span = $("<span>Pagamento da conta " + nome +"</span>").appendTo(desc.parent());
               }
               span.toggle(this.checked);
           }

        });
        
        $('.checkbox-grupo').click(function(){
           
            var 
            checkbox = this,
            table = $(this).closest("table"),
            detalhes = $(this).closest('span').find('.importacao-detalhes-grupo'),
            /*Lista de lancamentos desse grupo*/
            ls = $(this).data('lsg') || [],
            ngrupo = table.find(".ngrupo");
              
            ngrupo.toggle(!this.checked);
            
            var linha_checked = !!$(this).closest("table").find(".td-checkbox-importacao input:checked")[0];
            $(this).closest("table").find(".linha-checkbox-criar-regra").toggle(!this.checked && linha_checked);
            
            if(!this.checked){
                detalhes.hide();
                return;
            }
            
            detalhes.unbind('click').click(function(){
                _editar();
            });
            
            _editar();
            
            function _editar(){
                var 
                valor = parseFloat($(checkbox).closest('.celula-lancamento-importacao').find(".campo-valor-importacao").attr("valor")),
                saldo = 0,
                d = jDialog({
                    closeButton: false,
                    showButtons: false,
                    title : "Detalhar lançamentos do grupo",
                    ajax : function(){
                        Ajax('DETALHAR_LANCAMENTOS_GRUPO',JSON.stringify({valor:valor}),function(r){
                            d.html(r).showButtons();

                            /*Contador de lancamentos incluidos*/
                            var count = 0;

                            function _add(l){

                                var 
                                tmp = d.dialog.find('.linha-template'),
                                nr = tmp.clone(),
                                __toggle = function(){
                                    var despesa = parseFloat(nr.find('.sinal').val()) == -1;
                                    nr.find('.d').toggle(despesa);
                                    nr.find('.r').toggle(!despesa);
                                };

                                count++;
                                
                                d.dialog.find('.linha-saldo').before(nr);

                                /*Adicionando eventos a nova linha*/
                                nr.toggleClass('linha-template linha-detalhe').find('.autocompleteselect').autocompleteselect();
                                nr.find('.campo-valor').priceFormat().keyup(_saldo);
                                nr.find('.sinal').change(function(){
                                    _saldo();
                                    __toggle();
                                });
                                nr.find('.qtitle').qtitle();

                                
                                nr.find('.add-link-img').click(function(){
                                    eventosAdicionarCadastros(this);
                                });

                                if(count > 1){
                                    nr.find('.remove').show().click(function(){
                                        $(this).closest('tr').remove();
                                        _saldo();
                                        d.center();
                                    });

                                }

                                if(l){
                                    
                                    
                                    var despesa = l.valor <= 0 ,
                                        c = despesa ? '.d' : '.r';
                                
                                    nr.find('.sinal').val(despesa ? -1 : 1);
                                    nr.find('.campo-descricao').val(l.descricao);
                                    nr.find('.campo-valor').val(Math.abs(l.valor).formatCurrency(true));
                                    nr.find(c + ' .categorias').val(l.categoria.id).change();
                                    nr.find(c + ' .centros').val(l.centro.id).change();
                                    nr.find('.contatos').val(l.contato.id).change();
                                }

                                _saldo();
                                __toggle();

                                d.center();
                            }


                            function _saldo(){
                                saldo = 0;
                                d.dialog.find('.campo-valor').each(function(){
                                    var sinal = parseFloat($(this).closest('tr').find('.sinal').val());
                                    saldo += $(this).val().parseFloat() * sinal;
                                });
                                saldo = parseFloat(saldo.toFixed(2));
                                var diferenca = valor - saldo;
                                $("#importacao-lancamentos-grupo-saldo").html(saldo.formatCurrency(true)).corSaldo(saldo);
                                $("#importacao-lancamentos-grupo-diferenca").html(diferenca.formatCurrency(true)).corSaldo(diferenca);
                            }


                            $("#importacao-adicionar-lancamento-grupo").click(function(){
                                _add();
                            });

                            if(ls.length == 0){
                                _add();
                                _add();
                            }else{
                                $.each(ls,function(){
                                    _add(this);
                                });
                            }

                        });
                    },
                    buttons : {
                        'Salvar' : function(){

                            if(valor == saldo){

                                ls = [];

                                d.dialog.find('.linha-detalhe').each(function(){
                                    var 
                                    sinal = parseFloat($(this).find('.sinal').val()),
                                    desc = $(this).find('.campo-descricao').val().trim(),
                                    valor = $(this).find('.campo-valor').val().parseFloat() * sinal,
                                    contato = $(this).find('.contatos').val(),
                                    categoria,centro;

                                    if(sinal == -1){
                                        categoria = $(this).find('.d .categorias').val();
                                        centro = $(this).find('.d .centros').val();
                                    }else{
                                        categoria = $(this).find('.r .categorias').val();
                                        centro = $(this).find('.r .centros').val();
                                    }

                                    ls.push({
                                        descricao : desc,
                                        valor : valor,
                                        categoria: {id:categoria},
                                        centro : {id:centro},
                                        contato : {id:contato}
                                    });
                                });

                                /*Salva os lancamentos do grupo no checkbox*/
                                $(checkbox).data('lsg',ls);

                                detalhes.show();

                                d.close();
                                
                                $(checkbox).closest('.celula-lancamento-importacao').find('.td-checkbox-importacao input').prop('checked',true).change();
                                
                            }else{
                                jAlert('O valor total do grupo deve ser igual ao valor na importação.','Valor inconsistente');
                            }
                        },
                        'Cancelar' : function(){
                            d.close();
                            if(ls.length == 0){
                                $(checkbox).prop('checked',false);
                                ngrupo.toggle(true);
                            }
                        }
                    }

                });
            }
            
        })
        

        $(".tipo-repeticao").click(function(){
            var celrepeticao = $(this).closest("td").siblings(".celrepeticao"),
                        tipo = this.value,
                        cc   = celrepeticao.hasClass("cc");

            /*Exibe se for diferente de normal*/
            if(cc)
                celrepeticao.toggle( tipo == 'p' );
            else
                celrepeticao.toggle( tipo != 'n' );

            /*Exibe area de parcelamento se for parcelado*/
            celrepeticao.find(".span_parcelado").toggle(tipo == 'p'); 
            /*Se eh tela de cartao de credito, nao exibe area de intervalo*/
            if(cc) celrepeticao.find(".span_intervalo").hide(); 
        });

        $(".input_repete_lancamento,.input_repete_quantidade,.input_primeira_parcela").numeric();

        $(".input_repete_lancamento").keyup(function(){

            var v = parseFloat(this.value);
            $(this).siblings('.singular').toggle( v <= 1).siblings('.plural').toggle(v > 1);
        }).blur(function(){/*Caso o campo seja deixado em branco, seta valor como 1*/

            if(this.value == "" || parseInt( this.value ) == 0 ) this.value = 1;
        });

        $(".input_repete_quantidade").blur(function(){
            if(this.value=="" || parseInt(this.value) == 0 ||  parseInt(this.value) == 1) this.value = 2;
            _valida_primeira_parcela(this)
        });

        $(".input_primeira_parcela").blur(function(){
            var val = this.value;
            if( val == "" || parseFloat(val) == 0 ) this.value = 1;
            else _valida_primeira_parcela(this);
        })

        function _valida_primeira_parcela(obj)
        {
            var pai = $(obj).closest("td"),
                max = pai.find(".input_repete_quantidade").val(),
                p   = pai.find(".input_primeira_parcela"),
                val = p.val();
            if(parseFloat(val) > parseFloat(max)) p.val(parseFloat(max));
        }

        var botao_importar        = $("#botao-importar"),
            botao_editar          = $("#botao-editar-marcados"),
            inputs = $(".td-checkbox-importacao > input"),
            master = $("#checkall-importacao"),
            _updateBotoes = function(){
        
                botao_importar.toggleClass('disabled',inputs.filter(':checked').length == 0);
                botao_editar.toggleClass('disabled',inputs.filter(':checked').length <= 1);
            }
        
        master.change(function(){ inputs.prop('checked',this.checked); });
        inputs.change(function(e){ 
            var grupo_checked = !!$(this).closest("table").find(".checkbox-grupo:checked")[0];
            master.prop('checked',inputs.not(':checked').length == 0); 
            $(this).closest("table").find(".linha-checkbox-criar-regra").toggle(this.checked && !grupo_checked);
            $(this).closest(".celula-lancamento-importacao").toggleClass('checked',this.checked);
        })
        inputs.add(master).change(_updateBotoes);

        botao_importar.click(function(){
            if($(this).isEnabledButton()){

                jConfirm("Confirma a importação dos lançamentos marcados?","Importar lançamentos",function(r){
                    if(r){
                        cancelar_jAjax();
                        importar_lancamentos_marcados();
                    }
                },{ok : "Sim" , cancel : "Não"});

            }
        });

        botao_editar.click(function(){
            if($(this).isEnabledButton()){
                edicaoLote();
            }
        })

        $(".celula-lancamento-importacao").find("input:not([type='checkbox']),select").click(function(){
            
            var grupo_checked = !!$(this).closest("table").find(".checkbox-grupo:checked")[0];
            
            $(this).closest("table").find(".td-checkbox-importacao input").prop("checked",false).click();
            $(this).closest("table").find(".linha-checkbox-criar-regra").toggle(!grupo_checked);
            botao_importar.enableButton();

            if($(".td-checkbox-importacao input:checked").length > 1)
                botao_editar.enableButton();
            else
                botao_editar.disableButton();
        });

        $(".duplicidade").each(function(){
            var codigo = $(this).attr("cod"),
            grupo = $(this).attr("grupo");
            if(codigo){
                $(this).detailedmd({
                    p0:'LANCAMENTOS' , 
                    p1: 'DETAILED',
                    codigo :codigo, 
                    grupo :grupo, 
                    virtual: undefined, 
                    cartao: undefined
                },{
                    my : "right center",
                    at : "left center"
                });
                
                /*Se tem codigo eh porque tem que ir no servidor buscar as outras info*/
//                $(this).preview({
//                    position : "right center",
//                    ajax : {
//                        url : "php/carregar_lancamento_tooltip.php",
//                        type : "POST",
//                        data : {p1 : codigo},
//                        dataType : 'json',
//                        success : function(data,status){
//                            var titulo = data["Descrição"];
//                            var conteudo = $("<table class='detailed_table'></table>");
//
//                            var corValor = data["corValor"];
//                            for(var i in data){
//                                if( ! i.match(/^(Descrição|corValor)$/) ){ /*Ignorando estes indices*/
//                                    conteudo.append("<tr>"+
//                                        "<td class='detailed_label'>"+i+"</td>"+
//                                        "<td class='detailed_data "+(i=="Valor" ? corValor : "")+"'>"+data[i]+"</td>"+
//                                    "</tr>");
//                                }
//                            }
//
//                            this.set('content.title.text', titulo);
//                            this.set('content.text', conteudo);
//                        }
//                    }
//                });
            }else{

                var nome = $(this).attr("desc").trim();
                var data = $(this).attr("data").trim();
                var valor = parseFloat($(this).attr("valor").trim());
                var categoria = $(this).attr("categoria").trim();
                var centro = $(this).attr("centro").trim();
                var contato = $(this).attr("contato").trim();
                var plastico = $(this).attr("plastico").trim();

                var table  = "<table class='detailed_table'>";
                table += table_line("Descricao",nome);
                table += table_line("Valor", 'R$ ' + valor.number_format(2,",","."),valor < 0 ? "saldo_negativo" : "saldo_positivo");
                table += table_line("Data",data);
                table += table_line("Categoria",categoria);
                table += table_line("Centro",centro);
                table += table_line("Contato",contato);
                table += table_line("Cartão",plastico);
                table += "</table>";

                $(this).preview({
                    text : table,
                    title : nome,
                    position : "right center"
                });

                function table_line(title,value,fmt)
                {
                    var tr = ""
                    tr += "<tr>";
                        tr += "<td  class='detailed_label'>";
                            tr += title;
                        tr += "</td>";
                        tr += "<td  class='detailed_data "+(fmt?fmt:"")+"'>";
                            tr += value;
                        tr += "</td>";
                    tr += "</tr>";
                    return tr;
                }
            }
        });


        $('.add-link-img').click(function(){
            eventosAdicionarCadastros(this);
        });

    });
}


function importar_lancamentos_marcados()
{
    var lancamentos = _carregar_objeto_lancamentos_importacao();

    var extrato = carregar_objeto_extrato();

    if(lancamentos){
        display_loading_gif_ajax($("#area-conciliacao"));
        ControladorMeuDinheiro( "IMPORTAR_LANCAMENTOS",JSON.stringify(lancamentos),JSON.stringify(extrato),
            function(retorno){
                MD.Inicializar.hashes.reloadCurrentHash();
        });
    }
 
    function _carregar_objeto_lancamentos_importacao()
    {
        var lancamentos   = [],
            valido        = true,
            conta_extrato = $("#info-extrato-importado").attr("conta");
            
        $(".td-checkbox-importacao input:checked").each(function(){
            var l = $(this).closest(".celula-lancamento-importacao");
            var descricao = l.find(".campo-descricao-importacao").val().trim();
            var valor     = l.find(".campo-valor-importacao").attr("valor");
            var data      = l.find(".campo-data-importacao").attr("data");
            var tipo      = l.find(".checkbox-transf:checked")[0] ? "TRANSFERENCIA" : "NORMAL";
            var pagamento = l.find(".checkbox-transf:checked")[0] ? l.find(".checkbox-transf:checked").attr('pgto') : 0;
            var ndoc      = l.find(".campo-ndocumento-importacao")[0] ? l.find(".campo-ndocumento-importacao").val().trim() : "";
            var obs      = l.find(".campo-observacoes-importacao")[0] ? l.find(".campo-observacoes-importacao").val().trim() : "";
            
            var grupo     = l.find(".checkbox-grupo:visible:checked").data('lsg');
            
            var conta      = conta_extrato ? conta_extrato : l.find(".select-contas-importacao").val();
            var destino    = l.find(".select-categorias-importacao").val();
            
            var nome_conta = '';
            
            if(tipo == "TRANSFERENCIA"){
                
                valor = parseFloat(valor);
                /*Importacao sem ser a partir da tela de extrato*/
                if(!conta_extrato){
                    
                    conta      = l.find(".select-contas-origem-importacao").val();
                    destino    = l.find(".select-contas-destino-importacao").val() 
                    
                    
                    nome_conta = l.find(".select-contas-destino-importacao option:selected").html().trim();
                    
                    valor *= (valor > 0) ? -1 : 1;
                    
                }else{
                    if(valor < 0){
                        destino = l.find(".select-contas-importacao").val();
                        conta = conta_extrato;
                    }else{
                        destino = conta_extrato;
                        conta = l.find(".select-contas-importacao").val();
                        valor *= -1;
                    }
                }
                
                valor  = valor.toFixed(2);
                
                if(conta == destino){
                    alert("Um ou mais lançamentos possuem contas de origem e destino iguais");
                    valido = false;
                    return false; /*Interrompendo excucao .each()*/
                }
                
            }
            
            
            var centro     = l.find(".select-centros-importacao").closest('td:visible')[0] ? l.find(".select-centros-importacao").val() : "NULL";
            var contato    = l.find(".select-contatos-importacao").closest('td:visible')[0] ? l.find(".select-contatos-importacao").val() : "NULL";
            var forma_pgto = l.find(".select-formaspgto-importacao").closest('td:visible')[0] ? l.find(".select-formaspgto-importacao").val() : "NULL";
            var plastico   = l.find(".select-plasticos-importacao").closest('td:visible')[0] ? l.find(".select-plasticos-importacao").val() : "NULL";
            var projeto    = l.find(".select-projetos-importacao").closest('td:visible')[0] ? l.find(".select-projetos-importacao").val() : "NULL";
            
            
            
            var regra      = l.find(".descricao-lancamento-extrato").html().trim();
            var nova_regra = l.find(".checkbox-criar-nova-regra:checked:visible")[0] ? 1 : 0;
            
            var status = l.find(".select-status")[0] ? l.find(".select-status").val() : (conta_extrato ? 2 : 0),
                conciliado = status == 2,
                confirmado = conciliado || status == 1;
            
            
            /*Repeticao*/
            var repetir = 0, frequencia = 1, intervalo = "MONTH" , quantidade = 1,primeira = 0;

            repetir = l.find(".tipo-repeticao:checked:visible")[0] && l.find(".tipo-repeticao:checked").val() != 'n' ? 1 : 0;

            if(repetir){


                quantidade = l.find(".tipo-repeticao:checked").val() != 'f' ? l.find(".input_repete_quantidade").val() : -1;

                primeira = l.find(".tipo-repeticao:checked").val() != 'f' ? l.find(".input_primeira_parcela").val() : 0;
                
                frequencia = l.find(".input_repete_lancamento").val();

                intervalo = l.find(".select_repete_lancamento").val();

            }
            
            var lancamento = new MD.Lancamento({
                descricao            : !pagamento || pagamento == "0" ? descricao : 'Pagamento do cartão ' + nome_conta,
                valor : {previsto: valor, compra : quantidade >= 1 ?  valor*quantidade : valor },
                repetir : {
                    repetir      : repetir,     
                    frequencia   : frequencia,
                    intervalo    : intervalo,
                    quantidade   : quantidade,
                    primeira     : primeira,
                    parcela_desc : 1
                },
                data : {prevista: data, compra: data},
                tipo                 : tipo,
                ndocumento     : ndoc,
                pagamento           : pagamento,
                observacoes :       obs ,
                cadastros : {
                    conta                : conta,
                    destino              : destino,
                    centro               : centro,
                    contato              : contato,
                    forma                : forma_pgto,
                    plastico             : plastico,
                    projeto : projeto
                },
                regra                :  nova_regra ? regra : undefined,
                status : {
                    confirmado : confirmado,
                    conciliado : conciliado
                },
                automatico           : 0,
                grupo : grupo
            });
            
            lancamentos.push(lancamento.options());
            
        });

        return valido ? lancamentos : null;
    }
}



function eventosAdicionarCadastros(link){
    
    link = $(link); // Span da imagem
    
    var 
    cad = link.siblings('select'), // Select vizinho da imagem
    types = ['Categoria','Conta','Contato','Centro','Forma','Projeto'], //Tipos mapeados
    cbs = {'Categoria':MD.Categorias,'Conta':MD.Contas,'Contato':MD.Contatos,'Centro':MD.Centros,'Forma' : MD.Formas,'Projeto' : MD.Projetos},
    tipo = link.hasClass('D') ? 'DESPESA' : (link.hasClass('R') ? 'RECEITA' : undefined),
    /*Sera utilizado para armazenar os grupos de selects*/
    grupo,
    _push = function(o){
        grupo.each(function(){
            var novo = $("<option value='"+o.cod+"'>"+o.name+"</option>"),
                incluiu = false;
            $(this).find('option').each(function(e){
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
            if(!incluiu) $(this).append(novo);
            $(this).change();
        });
        /*Seleciona opcao recem incluida*/
        $(cad[0]).val(o.cod).change();
    };
    $.each(types,function(){
        var c = 'add-'+this.toLowerCase();
        grupo = undefined;
        if(link.hasClass(c)){
            grupo = $('.'+c+( link.hasClass('D') ? '.D' : (link.hasClass('R') ? '.R' : ''))).siblings('select')
            if(!grupo[0]) grupo = cad;
            cbs[this].editar(undefined,_push,null,tipo);
            return false;
        }
    });
}
    
    
function edicaoLote()
{
    var d = jDialog({
        title : "Edição dos lançamentos marcados",
        showButtons : false,
        ajax : function(){
            var cc = $("#area-importacao.cc")[0] ? $("#area-importacao.cc").attr("cod") : 0;
            Ajax('EDICAO_LOTE',cc,function(r){
                d.html(r).showButtons();
            })
        },
        buttons : {
            'Aplicar' : function(){
                _completar_lancamentos({
                    categoriaDespesa : $("#categorias-despesa").val(),
                    categoriaReceita : $("#categorias-receita").val(),
                    conta            : $("#select_contas").val(),
                    plastico         : $("#select-plasticos").val(),
                    contaDestino     : $("#select_destino").val(),
                    centroDespesa    : $("#centros-despesa").val(),
                    centroReceita    : $("#centros-receita").val(),
                    contato          : $("#select_contatos").val(),
                    formapgto        : $("#select_formaspgto").val(),
                    projeto          : $("#select_projetos").val()
                });
                d.close();
            },
            'Cancelar' : function(){
                d.close();
            }
        }
    });
    
    function _completar_lancamentos(dados){
        
        $(".td-checkbox-importacao input:checked").each(function(){
            var l = $(this).closest(".celula-lancamento-importacao");
            if(dados.categoriaDespesa != -1 && dados.categoriaDespesa !== undefined)
                l.find(".select-categorias-importacao.despesa").val(dados.categoriaDespesa).change();
            if(dados.categoriaReceita != -1 && dados.categoriaReceita !== undefined)
                l.find(".select-categorias-importacao.receita").val(dados.categoriaReceita).change();
            if(dados.conta != -1 && dados.conta !== undefined)
                l.find(".select-contas-importacao").val(dados.conta).change();
            if(dados.conta != -1 && dados.conta !== undefined)
                l.find(".select-contas-origem-importacao").val(dados.conta).change();
            if(dados.contaDestino != -1 && dados.contaDestino !== undefined)
                l.find(".select-contas-destino-importacao").val(dados.contaDestino).change();
            if(dados.plastico != -1 && dados.plastico !== undefined)
                l.find(".select-plasticos-importacao").val(dados.plastico).change();
            if(dados.centroDespesa != -1 && dados.centroDespesa !== undefined)
                l.find(".select-centros-importacao.despesa").val(dados.centroDespesa).change();
            if(dados.centroReceita != -1 && dados.centroReceita !== undefined)
                l.find(".select-centros-importacao.receita").val(dados.centroReceita).change();
            if(dados.contato != -1 && dados.contato !== undefined)
                l.find(".select-contatos-importacao").val(dados.contato).change();
            if(dados.formapgto != -1 && dados.formapgto !== undefined)
                l.find(".select-formaspgto-importacao").val(dados.formapgto).change();
            if(dados.projeto != -1 && dados.projeto !== undefined)
                l.find(".select-projetos-importacao").val(dados.projeto).change();
        });
    }
    
}
    
    
})(window,window.MD,jQuery);

///**
// * Atribui evento do botão de importação de lancamentos nas telas.
// * @param conta codigo da conta [opcional]
// **/
//function botao_importar_lancamentos(conta)
//{
//    $(".importar-lancamentos").click(function(){
//        jAjax("Importar lançamentos","php/alert_importar_lancamentos.php",{p1:conta});
//    })
//}

//
//function tratar_tela_importacao_lancamentos(conta,lancamentos)
//{
//
////     ControladorMeuDinheiro("INICIAR_IMPORTACAO_LANCAMENTOS",lancamentos,conta,function(r){
////                    cancelar_jAjax();
////                    $("#conteudo").html(r);
////                });
////    return;
////    
//    $("input[name='tipo-importacao']").click(function(){
//        $("#upload_lancamentos,#ajuda-imp-lancamentos").toggle(this.value == 'L');
//        $("#upload_extrato,#escolha_conta_importacao,#fechar-importacao-extrato,#ajuda-imp-extrato").toggle(this.value != 'L');
//        centerjDialog();
//        if($("#upload_extrato")[0]) $("#fechar-comum").hide();
//    });
//    
//    /*Se o usuario puder importar o extrato, cria os eventos*/
//    if($("#upload_extrato")[0]) tratar_tela_importacao_extrato();
//    upload_file('./php/upload_lancamentos.php',['ofx','ofc','xls','xlsx','csv','txt'],
//     function(id, file_name, json){
//        /*Existe erro no arquivo*/
//        if(json.conteudo.error){
//            alert(json.conteudo.error);
//        }else{
//            var lancamentos = json.conteudo;
//            verificaInversaoSinal(lancamentos);
//            ControladorMeuDinheiro("INICIAR_IMPORTACAO_LANCAMENTOS",JSON.stringify(lancamentos),conta,function(r){
//                cancelar_jAjax();
//                $("#conteudo").html(r);
//            });
//            
//        }
//    },function(id, file_name){
//        return true;
//    },'upload_lancamentos');
//    
//    $(".popup_cancel").click(function(){
//        cancelar_jAjax();
//    });
//}
//
//function tratar_tela_importacao_extrato()
//{
//    upload_file('./php/upload_extrato.php',['ofx','ofc'],
//     function(id, file_name, json){
//        /*Existe erro no arquivo*/
//        if(json.conteudo.error){
//            alert(json.conteudo.error);
//        }else{
//            var conta = $("#select_importar option:selected").attr("cod");
//            json.conteudo["conta"] = conta;
////            json.conteudo.lancamentos = 
//                verificaInversaoSinal(json.conteudo.lancamentos);
//                MD.Conciliacao.conciliacao(json.conteudo);
////            ControladorMeuDinheiro("INICIAR_CONCILIACAO_EXTRATO",JSON.stringify(),function(r){
////                cancelar_jAjax();
////                $("#conteudo").html(r);
////            });
//        }
//    },function(id, file_name){
//        
//        if($("#select_importar option:selected").attr("cod") == 0)
//        {
//            alert("Escolha uma conta para iniciar o processo de conciliação.");
//            $("#select_importar").focus();
//            return false;
//        }
//        return true;
//    },'upload_extrato');
//    
//    $("#popup_cancel").click(function(){
//        cancelar_jAjax();
//    });
//}
//



function evento_cancelar_processo_conciliacao()
{
    $("#botao-cancelar-conciliacao").click(function(){
        var c = $(this).hasClass("naopulou");
       jConfirm( !c ? "Deseja realmente cancelar o processo de importação do extrato?" : "Deseja encerrar o processo sem fazer a importação?" , 
                 !c ? "Cancelar processo" : "Cancelar importação",function(r){
           if(r) MD.Inicializar.hashes.reloadCurrentHash();
       },{ok : "Sim",cancel:"Não"}); 
    });
}

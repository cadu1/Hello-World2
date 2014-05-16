(function(window,MD,$){
    
var 
/*Construtor*/
Contas = function(){},
/*Atalho*/
fn = Contas.prototype,
Ajax = fn.Ajax = new MD.Controlador('CADASTROS','contas'),
Cadastro = new MD.Cadastro(fn);
/*Expondo metas ao MD Global*/
MD.Contas = new Contas;

var pagina = fn.pagina = function(){ Cadastro.pagina("link_cabecalho_contas",eventosTela); }

function eventosTela(){
    
    $(".botao_excluir_cc").click(function(){
        var linha = $(this).closest('tr'),
        cod = linha.attr("cod"),
        nome = linha.find('.col-nome').html().trim(),
        auth = $(this).hasClass('auth');
        MD.CartaoCredito.excluir( cod,nome ,auth);
    });
    
    $(".botao_editar_cc").click(function(){
        MD.CartaoCredito.editar( $(this).closest('tr').attr("cod") );
    });
    
    $(".botao_fatura").click(function(){
        MD.CartaoCredito.pagina( $(this).closest('tr').attr("cod") );
    });
    
    $('.novo-cartao').click(function(){
        
        if(!Cadastro.checkBsc()) MD.CartaoCredito.editar();
    })
    
    $('td.detailed i').detailedmd({
        'p0' : 'CADASTROS' , 'p1' : 'CONTAS' , 'p2' : 'DETAILED'
    });
}

/**
 * Tela de criacao/edicao categorias.
 * @param [codigo] Codigo da categoria para editar.
 * @param [salvarCb] Evento apos clicar em salvar.
 * @param [cancelarCb] Evento apos clicar em cancelar.
 */
var editar = fn.editar = function(codigo,salvarCb,cancelarCb){

    var 
    _salvar = function(){

        var tipo          = $("#select_nova_conta option:selected").html().toUpperCase();
        var nome          = $("#input_nome_nova_conta").val();
        var saldo         = $("#input_valor_nova_conta").val().replace("R$ ","").parseFloat();
        var data          = $("#input_data_nova_conta").val().replaceAll(" / ","/").formatDateMySql();
        var compoe_saldo  = $("#checkbox_compoe_saldo:checked").length;
        var apenas_transf = $("#checkbox_apenas_transferencias:checked").length;
        var exibir_visao_geral  = $("#checkbox_exibir_visao_geral:checked").length;
        var exibir_app     = $("#checkbox_exibir_app:checked").length;
        var fator         = parseInt($("input[name='sinal_saldo']:checked").val());

        /*Informacoes adicionais*/
        var limite        = $("#input_limite:visible");
        var n_conta       = $("#input_n_conta:visible");
        var n_agencia     = $("#input_n_agencia:visible");
        var banco         = $("#input_banco:visible");
        var telefone      = $("#input_telefone_banco:visible");
        var contato       = $("#input_contato_banco:visible");
        var ativa         = $("input[name='status-conta']:checked").val();

        limite = limite[0] ? limite.val().replace("R$ ","").parseFloat() : "";
        n_conta = n_conta[0] ? n_conta.val().trim() : "";
        n_agencia = n_agencia[0] ? n_agencia.val().trim() : "";
        banco = banco[0] ? banco.val().trim() : "";
        telefone = telefone[0] ? telefone.val().trim() : "";
        contato = contato[0] ? contato.val().trim() : "";

        /*Atualiza saldo*/
        saldo *= fator;

        var data_valida = $("#input_data_nova_conta").validate({
                func : function(elem){return $(elem).valida_data_sistema();}
            });
        var nome_valido = $("#input_nome_nova_conta").validate({
                alert: true,
                msg: "Indique um nome para a conta.",
                func : function(elem){return $(elem).val().length > 0 ? true : false ;}
            });

        if(data_valida && nome_valido)
        {
            var conta = {
                codigo : codigo,
                tipo: tipo,
                nome: nome,
                saldo: saldo,
                data: data,
                compoe_saldo: compoe_saldo,
                apenas_transferencia: apenas_transf,
                exibir_visao_geral: exibir_visao_geral,
                exibir_app: exibir_app,
                limite: limite,
                nConta : n_conta,
                nAgencia : n_agencia,
                banco : banco,
                telefone : telefone,
                contato : contato,
                ativa : ativa
            };

            Ajax("EDITAR",JSON.stringify(conta),function(cod){
                d.close();
                if(salvarCb){
                    salvarCb({
                        cod : cod,
                        name : nome,
                        saldo : saldo
                    });
                } 
                else pagina();
            });
            
            return true;
        }
        
        return false;
       
    }, buttons = {};
    
    buttons['Salvar'] = function(){ 
        _salvar();
    };
        
    /*Se esta na tela de criacao, habilita botao de continuar*/
    if(!codigo){
        buttons['Salvar e continuar'] = function(){ 
            if(_salvar())
                editar(codigo,salvarCb,cancelarCb); 
        };
    }
    
    buttons['Cancelar'] =  function(){
        d.close();
        cancelarCb && cancelarCb();
    };
        
    var d = jDialog({
        title : (!codigo ? 'Nova' : 'Editar') + " conta",
        showButtons : false,
        scroll : {
            enabled : true, 
            o : '.cad-main-ul'
        },
        ajax : function(){
            Ajax('TELA_EDITAR',codigo,function(r){
                d.html(r).showButtons().scroll.init();
                
                $("#input_valor_nova_conta,#input_limite").priceFormat();

                 $("#input_data_nova_conta").current_date_format().calendario();

                 $("#input_banco").numeric().blur(function(){
                     busca_bancos_brasil(this);
                 });

                $("#show-extra-info").click(function(){
                    $(this).find('i').toggleClass('icon-caret-down icon-caret-up');
                    $("#info-adicionais").toggle();
                    d.center().scroll.update();
                    
                });
                
                $("#select_nova_conta").change(function(){

                    var tipo = $(this).val().toUpperCase();

                    $("#input_nome_nova_conta").focus();

                    if(tipo == "CONTA CORRENTE" || tipo == "DINHEIRO")
                    {
                        $("#checkbox_compoe_saldo").attr("checked",true);
                        $("#checkbox_apenas_transferencias").attr("checked",false);
                    }
                    else
                    {
                        $("#checkbox_compoe_saldo").attr("checked",false);
                        $("#checkbox_apenas_transferencias").attr("checked",true);
                    }

                    if($("#nova_conta_direita").length)
                    {
                        $("#nova_conta_direita p").html(tipo=="CONTA CORRENTE"?conta_corrente:tipo=="DINHEIRO"?dinheiro:outros);
                    }
                });
                
            });
        },
        buttons : buttons
    });    
}

var excluir = fn.excluir = function(codigo,auth){
        
    var d = jDialog({
        title : "Excluir conta",
        showButtons : false,
        ajax : function(){
            Ajax('TELA_EXCLUIR',codigo ,function(r){
                d.html(r);
                if(d.dialog.find('#error')[0]){
                    d.close();
                    jAlert(r,"Excluir conta");
                }
                d.showButtons();
                $("[name='escolha']").click(function(){
                    $(".cadastro-exclusao-destino").toggle($(this).val()=="mover");
                });
                
            });
        },
        buttons : {
            Excluir : function(){
                
                var conta_destino = "";
                if($("[name='escolha']:checked").val() == "mover"){
                    conta_destino = $(".cadastro-exclusao-destino select").val();
                }
                 /*Excluir lancamentos deste centro*/
                if(!conta_destino.length)
                    confirmar_exclusao_grupo(function(){excluir_conta();},auth);
                else
                    excluir_conta();

                function excluir_conta(){
                    Ajax("EXCLUIR",codigo,conta_destino,function(r){
                        d.close();
                        pagina();
                    });
                }
            },
            Cancelar : function(){
                d.close();
            }
        }        
    });
}



function busca_bancos_brasil(campo)
{
    campo = $(campo);
    var response_field = $("#info_banco_ajax");
    response_field.html("<img src='img/load.gif' width='17' />")
    $.post("php/_carregar_banco_brasil.php",{codigo:campo.val()},function(r){
        if(r != "")
        {
            var banco = $.parseJSON(r);
            r = "";
            if(!banco["img"].length) banco["img"] = "default.png"
            r = "<img src='res/meudinheiro/"+banco["img"]+"' width='17' title='"+banco["nome"]+"'/> ";
            r += "<span title='"+banco["nome"]+"'>"+banco["nome"].substr(0,27)+(banco["nome"].length > 30 ? "..." : "") + "</span>";
        }
        response_field.html(r);
    });
}


//function caixas_detalhamentos_contas()
//{
//    $(".detailed").each(function(){
//        var conta = $(this).parent();
//
//        var nome = conta.attr("nome");
//        var tipo = conta.find(".tipo_conta").html().trim();
//        var saldo_inicial = conta.attr("saldo");
//        var data_inicial = conta.find(".data_conta").html().trim();
//        var saldo_atual = conta.attr("saldo_atual");
//        var compoe = conta.attr("compoe_saldo") == 1 ? "Sim" : "Não";
//        var apenas_transf = conta.attr("apenas_transf") == 1 ? "Sim" : "Não";
//        
//        var banco = conta.attr("banco");
//        var contato = conta.attr("contato");
//        var telefone = conta.attr("telefone");
//        var nAgencia = conta.attr("nAgencia");
//        var nConta = conta.attr("nConta");
//        var limite = conta.attr("limite");
//        
//        var adicionais = banco.length || contato.length || telefone.length || nAgencia.length || nConta.length || limite.length;
//        
//        saldo_inicial = parseFloat(saldo_inicial);
//        saldo_atual   = parseFloat(saldo_atual);
//        
//        var table  = "<table class='detailed_table'>";
//            table += table_line("Nome",nome);
//            table += table_line("Tipo",tipo);
//            table += table_line("Saldo inicial","R$ "+saldo_inicial.number_format(2,",","."),saldo_inicial < 0 ? "saldo_negativo" : (saldo_inicial > 0 ? "saldo_positivo" : "saldo_zerado"));
//            table += table_line("Data inicial",data_inicial);
//            table += table_line("Saldo atual","R$ " + saldo_atual.number_format(2,",","."),saldo_atual < 0 ? "saldo_negativo" : (saldo_atual > 0 ? "saldo_positivo" : "saldo_zerado"));
//            table += table_line("Compõe saldo",compoe);
//            table += table_line("Apenas transf.",apenas_transf);
//            if(adicionais)
//            {
//                if(limite.length)
//                {
//                    limite = parseFloat(limite);
//                    limite = "R$ " + limite.number_format(2,",",".");
//                }
//                else limite = "-";
//                
//                table += "<tr><td class='detailed_label' colspan='2' style='text-align:center;color:#000099;'>Informações da conta</td></tr>"
//                table += table_line("Banco",banco.length ? banco : "-");    
//                table += table_line("Contato",contato.length ? contato : "-");    
//                table += table_line("Telefone",telefone.length ? telefone : "-");    
//                table += table_line("Agência",nAgencia.length ? nAgencia : "-");    
//                table += table_line("Número",nConta.length ? nConta : "-");    
//                table += table_line("Limite",limite,"saldo_positivo");    
//            }
//            table += "</table>";
//
//        $(this).preview({
//                text : table,
//                title : nome
//            });
//    });
//            
//    function table_line(title,value,fmt)
//    {
//        var tr = ""
//        tr += "<tr>";
//            tr += "<td  class='detailed_label'>";
//                tr += title;
//            tr += "</td>";
//            tr += "<td  class='detailed_data "+(fmt?fmt:"")+"'>";
//                tr += value;
//            tr += "</td>";
//        tr += "</tr>";
//        return tr;
//    }
//}



})(window,window.MD,jQuery);


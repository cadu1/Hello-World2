<div id="popup_aviso_premium">
    <div id="aviso">
        Você deve concordar com os termos abaixo para utilizar o Meu Dinheiro Premium.
    </div>
    <div id="validade">
        Ao concordar com estes termos, você passa a ter o direito de utilizar o serviço Meu Dinheiro Premium
        de forma integral e gratuita até <b>(21/05/2014)</b>. Após esta data, para você continuar
        utilizando a versão Premium precisará realizar o pagamento do valor da tarifa de utilização 
        (<a href="javascript: void(0);" id="precos-planos-tip" style="text-decoration: none;">conforme planos disponíveis</a>).
            Caso opte por não realizar o pagamento, você retornará automaticamente
         à versão básica do serviço. Neste caso, você não perderá suas informações
        (com exceção de lembretes via email cadastrados), mas passará a ter acesso apenas às funcionalidades
        e limitações do plano básico.
    </div>
    <div id="concordo">
        <input type="checkbox" id="concordo_input" />
        <label for="concordo_input">Li os termos de utilização da versão demonstração descritos acima.</label>
    </div>
    <div id="popup_panel"  class="btn-toolbar">
        <div class="btn-group pull-right">
            <a id="botao_aceitar_demo" class="btn">Concordo</a>
            <a id="botao_cancelar_demo" class="btn">Não concordo</a>
        </div>
    </div>
</div>
<script>
    $(function(){
         $("#precos-planos-tip").qtip({
            content: {
                text : "<table>"+
                            "<tr>" +
                                "<td style='text-align:right;'>Plano Anual = </td>" +
                                "<td> R$ 57,60 <b>(R$ 4,80/mês)</b></td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td style='text-align:right;'>Plano Semestral = </td>" +
                                "<td> R$ 38,40 (R$ 6,40/mês)</td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td style='text-align:right;'>Plano Trimestral = </td>" +
                                "<td> R$ 24,00 (R$8,00/mês)</td>" +
                            "</tr>" +
                        "</table>",
                title:{
                    text: "<b>Planos disponíveis</b>"
                }
            },
            position: {
                my : "left center",
                at : "right center"
            },
            style: {
                width: 280
            },
            show : {
                solo: true
            },
            hide: {
                fixed: true
            }
        }); 
        $("#concordo_input").click(function(){
            $("#botao_aceitar_demo").attr("disabled",!this.checked);
        })
        $("#botao_aceitar_demo").click(function(){
            if($("#concordo_input:checked")[0]) {
                ControladorMeuDinheiro("ADQUIRIR_VERSAO_PREMIUM","DEMO","2014-05-14","2014-05-21",function(r){
                    if(r==1) {
                        location.href = "meudinheiro";
                    } else {
                        cancelar_jAjax();
                        jConfirm("Você já utilizou ou utiliza a versão Premium. <br>Deseja realizar um pagamento?","Adquira a versão Premium",function(r) {
                            if(r) {
                                pagina_pagamento_meudinheiro();
                            }
                        },{ok:"Sim",cancel:"Agora não"});
                    }
                });
            } else {
                alert("Você deve marcar a caixa indicando que leu as condições de uso.");
            }
        });
        $("#botao_cancelar_demo").click(function(){
            cancelar_jAjax();
        });
    });
</script>
<style>
    #aviso{
        text-align: left;
        font-size: 12px;
        margin: 5px 0;
        font-weight: bold;
    }
    #validade{
        text-align: justify;
        font-family: Verdana;
        font-size: 12px;
        height: 130px;
        letter-spacing: 0.8px;
        overflow-y: scroll;
        width: 520px;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        padding: 5px 10px;
    }
    #concordo{
        margin-top: 10px;
        text-align: left;
    }
    #concordo label{
        font-size: 12px;
    }
</style>
<?php
    if($_POST["p0"] == "CONFIGURACOES" && $_POST["p1"] == "LOAD"){
        include("configuracoes/Ajax.php");
    }
    if($_POST["p0"] == "LEMBRETES" && $_POST["p1"] == "CARREGAR"):
?>
[{"id":"10556","title":"Conhe\u00e7a a nova vers\u00e3o!","content":"Acesse o nosso <a href=\"http:\/\/blog.meudinheiroweb.com.br\/nova-versao-deixa-o-meu-dinheiro-ainda-mais-moderno-e-completo\/\" target=\"_blank\">Blog<\/a> e conhe\u00e7a as novidades da nova vers\u00e3o!"}]
<?php endif; ?>
<?php
    if($_POST["p0"] == "VISAOGERAL"){
        if($_POST["p1"] == "INICIAR") {
            include("visao/resumo_inicio.php");
        }
        if($_POST["p1"] == "CARREGAR_CONTEUDO_PORTLET") {
            if ($_POST["p2"] == "visao-geral") {
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-visao-geral.php");
            }
            if($_POST["p2"] == "saldo-contas"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-saldo-contas.php");
            }
            if($_POST["p2"] == "saldo-cartoes"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-saldo-cartoes.php");
            }
            if($_POST["p2"] == "projecao-contas"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-projecao-contas.php");
            }
            if($_POST["p2"] == "metas-despesa"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-metas-despesa.php");
            }
            if($_POST["p2"] == "contas-pagar"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-contas-pagar.php");
            }
            if($_POST["p2"] == "despesas-categorias"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-despesas-categorias.php");
            }
            if($_POST["p2"] == "metas-receita"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-metas-receita.php");
            }
            if($_POST["p2"] == "metas-economia"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-metas-economia.php");
            }
            if($_POST["p2"] == "contas-receber"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-contas-receber.php");
            }
            if($_POST["p2"] == "receitas-categorias"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-receitas-categorias.php");
            }
            if($_POST["p2"] == "fluxo-caixa"){
            //p3:2014-05-01
            //p4:2014-05-31
                include("visao/portlet-fluxo-caixa.php");
            }
        }
    }
    if($_POST["p0"] == "AGENDA"){ 
        if($_POST["p1"] == "HEADER") {
            include("agenda/header.php");
        }
        if($_POST["p1"] == "MOVIMENTACOES") {
            include("agenda/movimentacoes.php");
        }
    }
    if($_POST["p0"] == "CARTOES"){ 
        if($_POST["p1"] == "HEADER") {
            include("cartoes/header.php");
        }
        if($_POST["p1"] == "FATURA") {
            include("cartoes/fatura.php");
        }
        if($_POST["p1"] == "ESCOLHA_CONTA_NOVO_LANCAMENTO") {
            include("cartoes/alert_escolha_conta_novo_lancamento.php");
        }
    }
    if($_POST["p0"] == "METAS"){ 
        if($_POST["p1"] == "HEADER") {
        //p3:M
            include("metas/header.php");
        }
        if($_POST["p1"] == "DADOS") {
        //p2:2014-05-01
        //p3:2014-05-31
            include("metas/dados.php");
        }
        if($_POST["p1"] == "METAS_MENSAIS_PREVIEW") {
        //p2:2014-05-15
            include("metas/preview.php");
        }
        if($_POST["p1"] == "TELA_NOVA_META") {
        //p2:{"id":"968510","nome":"Outras despesas","data":null}
            include("metas/alert_nova.php");
        }
    }
    if($_POST["p0"] == "SONHOS"){ 
        if($_POST["p1"] == "HEADER") {
        //p3:M
            include("sonhos/header.php");
        }
        if($_POST["p1"] == "DADOS") {
        //p2:2014-05-01
        //p3:2014-05-31
            include("sonhos/dados.php");
        }
        if($_POST["p1"] == "DETAILED") {
        //codigo:2439
        //cartao:0
        //grupo:0
            include("sonhos/dados.php");
        }
        if($_POST["p1"] == "TELA_EDICAO_SONHO") {
            include("sonhos/_painel_dados.php");
        }
    }
    if($_POST["p0"] == "RELATORIOS"){ 
        if($_POST["p1"] == "HEADER") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            include("relatorios/header.php");
        }
        if($_POST["p1"] == "RELATORIO") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":"2014-01-01","fim":"2014-12-31","periodo":null,"visualizarSubcat":null}
            $pag = json_decode($_POST["p2"]);
            $url = "relatorio_" . strtolower($pag->tipo);
            include("relatorios/$url.php");
        }
    }
    if($_POST["p0"] == "CADASTROS"){
        if($_POST["p1"] == "categorias") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/categorias/dados_print.php");
            }
            if($_POST["p2"] == "TELA_EDITAR") {
                include("cadastros/categorias/dados.php");
            }
        }
        if($_POST["p1"] == "centros") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/centros/dados_print.php");
            }
            if($_POST["p2"] == "TELA_EDITAR") {
                include("cadastros/centros/dados.php");
            }
        }
        if($_POST["p1"] == "contas") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/contas/dados_print.php");
            }
            if($_POST["p2"] == "TELA_EDITAR") {
                include("cadastros/contas/dados.php");
            }
        }
        if($_POST["p1"] == "contatos") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/contatos/dados.php");
            }
            if($_POST["p2"] == "CONTATOS") {
                include("cadastros/contatos/contatos.php");
            }
        }
        if($_POST["p1"] == "formas") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/formas/dados.php");
            }
        }
        if($_POST["p1"] == "projetos") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/projetos/dados.php");
            }
        }
        if($_POST["p1"] == "regras") {
        //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
            if($_POST["p2"] == "DADOS") {
                include("cadastros/regras/dados.php");
            }
        }
    }
    if($_POST["p0"] == "CONCILIACAO") {
    //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
        if($_POST["p1"] == "TELA") {
            include("conciliacao/tela.php");
        }
    }
    if($_POST["p0"] == "EXPORTACAO") {
    //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
        if($_POST["p1"] == "INICIO") {
            include("exportacao/inicio.php");
        }
    }
    if($_POST["p0"] == "BUSCA") {
    //p2:{"tipo":"EVOLUCAO_CAT","ini":null,"fim":null,"periodo":null,"visualizarSubcat":null}
        if($_POST["p1"] == "HEADER") {
            include("busca/header.php");
        }
        if($_POST["p1"] == "BUSCAR") {
            include("busca/buscar.php");
        }
    }
    if($_POST["p0"] == "LANCAMENTOS") {
        if($_POST["p1"] == "DETAILED") {
        //codigo:2439
        //virtual:0
        //cartao:0
        //grupo:0
            include("lancamentos/detailed.php");
        }
        if($_POST["p1"] == "TELA_EDICAO") {
            include("lancamentos/TelaEdicao.php");
        }
        if($_POST["p1"] == "GRUPO") {
            include("lancamentos/grupo/iniciar.php");
        }
    }
    if($_POST["p0"] == "SALDO_CONTAS_PREVIEW") {
        include("contas/preview.php");
    }
    
?>
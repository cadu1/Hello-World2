<!DOCTYPE html>
<html>
    <head>
        <title>My Money</title>
        <link rel="shortcut icon" type="image/png" href="img/favicon/icon-16.png" sizes="16x16"/>
        <link rel="shortcut icon" type="image/png" href="img/favicon/icon-32.png" sizes="32x32"/>
        <meta name="author" content="Easyme"/>
        <meta http-equiv="content-language" content="pt-br"/>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <meta name="keywords" content="gerenciador financeiro, controle financeiro, sistema financeiro, financeiro web, controle financeiro online,finanças pessoais, finanças online, fluxo de caixa, contas pagar, contas receber, software financeiro, controle orçamento, orçamento pessoal"/>
        <meta name="description" content="O Meu Dinheiro é um sistema financeiro online pessoal e empresarial, ágil, fácil de usar, ideal para um completo controle das suas finanças ou do seu negócio. Com ele é possível controlar seu orçamento, cartões de crédito, conta bancárias, contas a pagar, contas a receber e investimentos." />
        <!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->        
        <link type="text/css" rel="stylesheet" href="css/producao/meudinheiro.css" media="screen" />
        <link type="text/css" rel="stylesheet" href="css/meudinheiro/impressao.css" media="print" />
        <script type="text/javascript" charset="utf-8" src="js/producao/meudinheiro.js"></script>
        <script>
            $(function(){
                inicializar();
                
                $(".testar-gratis").click(function(){
                    jAjax("Termos de uso do Meu Dinheiro Premium","php/alert_aviso_premium.php");
                });
            });
        </script>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-33684332-1']);
            _gaq.push(['_trackPageview']);
    
            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </head>
    <body class="navbar-fixed">
        <input id='i_a' type='hidden' value='ddfda348b7e64115ac59bd615f49354f'/>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>

                <!-- Be sure to leave the brand out there if you want it shown -->
                <a class="brand" href="javascript:void(0);"></a>

                <div class="nav-no-collapse header-nav">
                    <ul class="nav pull-right" id="top-nav">
                        <li>
                            <a href="versoes#precos" id="info-pagto" class="qtitle " title="O seu período de experiência do Meu Dinheiro Premium vai até o dia 19/05/2014" qtitle-data-my="top center" qtitle-data-at="bottom center">Assinar a versão Premium</a>
                        </li>
                        <li>
                            <a href="#!/outros/busca" title="Buscar lançamentos" class="qtitle" qtitle-data-my="top center" qtitle-data-at="bottom center"><i class="icon-search icon-large"></i></a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="pdi" title="Indique o Meu Dinheiro e utilize a versão Premium gratuitamente" class="qtitle" qtitle-data-my="top center" qtitle-data-at="bottom center">
                                <i class="icon-group icon-large"></i>
                            </a>
                        </li>
                        <li class="dropdown">
                            <a href="#" title="Ajuda" target="_blank" class=" dropdown-toggle qtitle" data-toggle="dropdown" qtitle-data-my="top center" qtitle-data-at="bottom center">
                                <i class="icon-question-sign icon-large"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="ajuda">Ajuda</a></li>
                                <li><a href="faq">Perguntas frequentes</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);" title="Mensagens" id="lembretes" class="qtitle" qtitle-data-my="top center" qtitle-data-at="bottom center">
                                <i class="icon-envelope-alt icon-large"></i>
                                <span class="badge badge-warning"></span>
                            </a>
                        </li>
                        <li>
                            <a href="suporte" target="_blank" title="Fale conosco" class="qtitle" qtitle-data-my="top center" qtitle-data-at="bottom center"><i class="icon-phone icon-large"></i></a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" title="Configurações" id="configuracoes" class="qtitle" qtitle-data-my="top center" qtitle-data-at="bottom center"><i class="icon-cog icon-large"></i></a>
                        </li>
                        <!-- start: User Dropdown -->
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                tffmf<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="sair"><i class="icon-off"></i> Sair</a></li>
                            </ul>
                        </li>
                        <!-- end: User Dropdown -->
                    </ul>
                </div> <!-- Everything you want hidden at 940px or less, place within here -->
                <div class="nav-collapse collapse"></div>
                <div id="preview-lembretes" class="">
                    <i id="preview-lembretes-close" class="icon-remove-sign icon-white" title="Fechar esta caixa"></i>
                    <div id="preview-lembretes-title"></div>
                    <div id="preview-lembretes-content"></div>
                    <div id="preview-lembretes-footer">
                        <div id="preview-lembretes-counter"></div>
                        <div id="preview-lembretes-actions">
                            <div class="btn-group">
                                <button class="btn btn-small read" title="Marcar como lida"><i class="icon-ok"></i></button>
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-small prev" title="Mensagem anterior"><i class="icon-chevron-left"></i></button>
                                <button class="btn btn-small next" title="Próxima mensagem"><i class="icon-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid min-sidebar" id="main-container">
            <div id="sidebar" class="fixed">
                <ul  id="main-menu"class="nav nav-list nav-stacked">
                    <li  >
                        <a class='link-main-menu function qtitle' qtitle-data-my="left center" qtitle-data-at="right center" 
                                                   href='javascript:void(0);' 
                          hash='visaogeral'
                          title="Visão Geral"
                          id='link_cabecalho_resumo'>
                          <i class="icon-th icon-fixed-width"></i>
                          <span class="">Visão Geral</span></a>
                    </li>
                    <li  >
                        <a class='link-main-menu function qtitle' qtitle-data-my="left center" qtitle-data-at="right center" href='javascript:void(0);' 
                          hash='movimentacoes'
                          title="Movimentações"
                          id='link_cabecalho_inicio'>
                          <i class="icon-money icon-fixed-width"></i>
                          <span class="">Movimentações</span></a>
                    </li>
                    <li  >
                        <a class='link-main-menu function qtitle' qtitle-data-my="left center" qtitle-data-at="right center" href='javascript:void(0);' 
                          hash='cartoes'
                          title="Cartões de Crédito"
                          id='link_cabecalho_cartao_de_credito'>
                          <i class="icon-credit-card icon-fixed-width"></i>
                          <span class="">Cartões de Crédito</span></a>
                    </li>
                    <li  class='dropdown'>
                        <a class='link-main-menu dropdown-toggle qtitle' qtitle-data-my="left center" qtitle-data-at="right center" 
                         data-toggle="dropdown" data-target="#" href='javascript:void(0);' 
                          hash='metas'
                          title="Metas"
                          id='link_cabecalho_metas'>
                          <i class="icon-tasks icon-fixed-width"></i>
                          <span class="">Metas</span></a>
                        <ul class="dropdown-menu dropdown-right" role="menu">
                            <li >
                                <a class='link-main-menu function sub'
                                  href='javascript:void(0);' 
                                  hash='metas/orcamento'
                                  id='link_cabecalho_metas_orcamento'>Orçamento</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                                  href='javascript:void(0);' 
                                  hash='metas/economia'
                                  id='link_cabecalho_metas_economia'>Economia</a>
                            </li>
                        </ul>
                    </li>
                    <li  class='dropdown'>
                        <a class='link-main-menu dropdown-toggle qtitle' qtitle-data-my="left center" qtitle-data-at="right center" 
                         data-toggle="dropdown" data-target="#" href='javascript:void(0);' 
                          hash='relatorios'
                          title="Relatórios"
                          id='link_cabecalho_relatorios'>
                          <i class="icon-bar-chart icon-fixed-width"></i>
                          <span class="">Relatórios</span></a>
                        <ul class="dropdown-menu dropdown-right" role="menu">
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='relatorios/contaspagarreceber'
                              id='link_cabecalho_relatorio_contas_pagar_receber'>Contas a pagar e receber</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='relatorios/evolucaocat'
                              id='link_cabecalho_relatorio_evolucao_cat'>Evolução por categoria</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='relatorios/evolucaord'
                              id='link_cabecalho_relatorio_evolucao_rd'>Evolução receitas/despesas</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='relatorios/extrato'
                              id='link_cabecalho_relatorio_extrato_detalhado'>Extrato detalhado</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='relatorios/fluxodecaixa'
                              id='link_cabecalho_relatorio_fluxo_caixa'>Fluxo de caixa</a>
                            </li>
                            <li class='dropdown-submenu'>
                                <a class='donone'
                              href='javascript:void(0);' 
                              hash='relatorios/'
                              id='link_cabecalho_relatorio_lancamentos'>Lançamentos por</a>
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/lancamentoscategoria'
                                            id='link_cabecalho_relatorio_lancamentos_categoria'>Categoria</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/lancamentoscentro'
                                            id='link_cabecalho_relatorio_lancamentos_centro'>Centro</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/lancamentoscontato'
                                            id='link_cabecalho_relatorio_lancamentos_contato'>Contato</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/lancamentosprojeto'
                                            id='link_cabecalho_relatorio_lancamentos_projeto'>Projeto</a>
                                    </li>
                                </ul>
                            </li>
                            <li class='dropdown-submenu'>
                                <a class='donone'
                              href='javascript:void(0);' 
                              hash='relatorios/'
                              id='link_cabecalho_relatorio_totais'>Totais por</a>
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/totaiscategoria'
                                            id='link_cabecalho_relatorio_totais_categoria'>Categoria</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/totaiscentro'
                                            id='link_cabecalho_relatorio_totais_centro'>Centro</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/totaiscontato'
                                            id='link_cabecalho_relatorio_totais_contato'>Contato</a>
                                    </li>
                                    <li>
                                        <a class='link-main-menu function sub' 
                                            href='javascript:void(0);' 
                                            hash='relatorios/totaisprojeto'
                                            id='link_cabecalho_relatorio_totais_projeto'>Projeto</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li  class='dropdown'>
                        <a class='link-main-menu dropdown-toggle qtitle' qtitle-data-my="left center" qtitle-data-at="right center" 
                         data-toggle="dropdown" data-target="#"                          href='javascript:void(0);' 
                          hash='cadastros'
                          title="Cadastros"
                          id='link_cabecalho_cadastros'>
                          <i class="icon-list-alt icon-fixed-width"></i>
                          <span class="">Cadastros</span>
                        </a>
                        <ul class="dropdown-menu dropdown-right" role="menu">
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/categorias'
                              id='link_cabecalho_categorias'>Categorias</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/centros'
                              id='link_cabecalho_centros'>Centros</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/contas'
                              id='link_cabecalho_contas'>Contas e cartões</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/contatos'
                              id='link_cabecalho_contatos'>Contatos</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/formaspagto'
                              id='link_cabecalho_formaspgto'>Formas de pagamento</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/projetos'
                              id='link_cabecalho_projetos'>Projetos</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='cadastros/regras'
                              id='link_cabecalho_regras'>Regras de preenchimento</a>
                            </li>
                        </ul>
                    </li>
                    <li  class='dropdown'>
                        <a class='link-main-menu dropdown-toggle qtitle' qtitle-data-my="left center" qtitle-data-at="right center" 
                         data-toggle="dropdown" data-target="#"                          href='javascript:void(0);' 
                          hash='outros'
                          title="Outros"
                          id='link_cabecalho_outros'>
                          <i class="icon-ellipsis-horizontal icon-fixed-width"></i>
                          <span class="">Outros</span>
                        </a>
                        <ul class="dropdown-menu dropdown-right" role="menu">
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='outros/extratos'
                              id='link_cabecalho_conciliacao'>Extratos Bancários</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='outros/exportacao'
                              id='link_cabecalho_exportacao'>Exportar dados</a>
                            </li>
                            <li >
                                <a class='link-main-menu function sub'
                              href='javascript:void(0);' 
                              hash='outros/busca'
                              id='link_cabecalho_busca'>Buscar lançamentos</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div id="sidebar-collapse">
                    <i class="icon-chevron-sign-right"></i>
                </div>
            </div><!--/#sidebar-->
            <div id="center-panel" class="clearfix">
                <div id="conteudo"></div>
            </div>
            <div id="right-panel-toggle">
                <button class="btn btn-danger">
                    Resumo
                    <i class="icon-chevron-sign-down"></i>
                </button>
            </div>
            <div id="right-panel">
                <div id="right-panel-content"></div>
                <div id="right-panel-config">
                    <span id="right-panel-close">
                        <i class="icon-remove"></i>
                    </span>
                    <i class='icon-cog action-begin'></i>
                    <ul class='actions-menu'>
                        <li>
                            <span class='action-button right-panel-action pin-right-panel active '>
                                <span>
                                    <i class="icon-sign-blank icon-fixed-width icon-transparent"></i>
                                    <i class="icon-ok icon-fixed-width"></i> Sempre visível
                                </span>
                            </span>
                        </li>
                        <li>
                            <span class='action-button right-panel-action click-right-panel '>
                                <span>
                                    <i class="icon-sign-blank icon-fixed-width icon-transparent"></i>
                                    <i class="icon-ok icon-fixed-width"></i> Exibir ao clicar
                                </span>
                            </span>
                        </li>
                        <li>
                            <span class='action-button right-panel-action hover-right-panel '>
                                <span>
                                    <i class="icon-sign-blank icon-fixed-width icon-transparent"></i>
                                    <i class="icon-ok icon-fixed-width"></i> Exibir ao passar o mouse
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="print-footer" class="print">
                Easyme 2014 | Todos os direitos reservados<br/><br/>14/05/2014 09:47:28 - Usuário tffmf                
            </div>
        </div>
    </body>
</html>
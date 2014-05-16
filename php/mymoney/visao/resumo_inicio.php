<div class="btn-toolbar md-header">
    <div class="btn-group">
        <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
            <i class="icon-plus-sign"></i>
            Novo lançamento
            <span class="caret"></span>
        </button>               
        <ul class="dropdown-menu novo-lancamento-dropdown" role="menu" aria-labelledby="dropdownMenu">
            <li class="dropdown-submenu">
                <a tabindex="-1" href="#">Movimentações</a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento despesa" >
                            <i class="icon-circle-arrow-down icon-fixed-width"></i>
                            Despesa
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento receita">
                            <i class="icon-circle-arrow-up icon-fixed-width"></i>
                            Receita
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);"  class="btn-novo-lancamento transferencia" >
                            <i class="icon-exchange icon-fixed-width"></i>
                            Transferência
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento grupo" >
                            <i class="icon-sitemap icon-fixed-width"></i>
                            Grupo de lançamentos
                        </a>
                    </li>
                </ul>
            </li>
            <li class="dropdown-submenu">
                <a tabindex="-1" href="#">Cartões de crédito</a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento despesa cc" >
                            <i class="icon-circle-arrow-down icon-fixed-width"></i>
                            Despesa
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento receita cc ">
                            <i class="icon-circle-arrow-up icon-fixed-width"></i>
                            Receita
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);"  class="btn-novo-lancamento transferencia  cc" >
                            <i class="icon-exchange icon-fixed-width"></i>
                            Transferência
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="javascript:void(0);" class="btn-novo-lancamento grupo cc" >
                            <i class="icon-sitemap icon-fixed-width"></i>
                            Grupo de lançamentos
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="header-calendar">{"min":"2014-05-01","ini":"2014-05-01","fim":"2014-05-31"}</div>
    <div class="btn-group pull-right">
        <span class="btn btn-small qtitle"  title="Projetar saldo futuro com o resíduo das metas" qtitle-data-at="bottom center" qtitle-data-my="top center">
            <label style="margin: 0;font-size: 12px;" >
                <input id="considerar-residuo-metas" type="checkbox"  style="margin:0;"/>
                 Resíduo das metas
            </label>
        </span>
        <button id="personalizar-resumo" class="btn btn-small qtitle" title="Personalizar esta pagina" qtitle-data-at="left center" qtitle-data-my="right center">
            <i class="icon-cog"></i>
        </button>
    </div>
</div>
<div id="resumo-hidden">
    <div id="resumo-hidden-top">Para adicionar algum painel, arreste-o para alguma área abaixo.
        <a href="javascript: void(0);" id="fechar-personalizar-resumo">Fechar</a>    
    </div>
    <div id="resumo-hidden-content">
        <ul class="hidden-portlets">
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-visao-geral"
                i="visao-geral"
                c="tl"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Resultados do mês</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-visao-geral"
                i="visao-geral"
                c="tl"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Resultados do mês</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-contas-pagar"
                i="contas-pagar"
                c="tc"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Contas a pagar</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-contas-pagar"
                i="contas-pagar"
                c="tc"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Contas a pagar</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-contas-receber"
                i="contas-receber"
                c="tr"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Contas a receber</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-contas-receber"
                i="contas-receber"
                c="tr"
                p="0"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Contas a receber</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-saldo-contas"
                i="saldo-contas"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Saldos das contas (confirmados)</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-saldo-contas"
                i="saldo-contas"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Saldos das contas (confirmados)</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-saldo-cartoes"
                i="saldo-cartoes"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Cartões de crédito</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-saldo-cartoes"
                i="saldo-cartoes"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Cartões de crédito</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-projecao-contas"
                i="projecao-contas"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Saldos projetados</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-projecao-contas"
                i="projecao-contas"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Saldos projetados</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-despesas-categorias"
                i="despesas-categorias"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Despesas p/ categorias</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-despesas-categorias"
                i="despesas-categorias"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Despesas p/ categorias</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-receitas-categorias"
                i="receitas-categorias"
                c="tr"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Receitas p/ categorias</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-receitas-categorias"
                i="receitas-categorias"
                c="tr"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Receitas p/ categorias</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-fluxo-caixa"
                i="fluxo-caixa"
                c="b"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Fluxo de caixa</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-fluxo-caixa"
                i="fluxo-caixa"
                c="b"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Fluxo de caixa</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-metas-despesa"
                i="metas-despesa"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de despesa</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-metas-despesa"
                i="metas-despesa"
                c="tl"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de despesa</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-metas-receita"
                i="metas-receita"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de receita</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-metas-receita"
                i="metas-receita"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de receita</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
            <li class="hidden-portlet enabled" 
                style='display: none;'                id="hidden-enabled-portlet-metas-economia"
                i="metas-economia"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de economia</span>
                    <span class="hidden-portlet-status"></span>
                </span>
            </li>
            <li class="hidden-portlet" 
                                id="hidden-portlet-metas-economia"
                i="metas-economia"
                c="tc"
                p="1"
                v="1">
                <span class="hidden-portlet-content">
                    <span class="hidden-portlet-title">Metas de economia</span>
                    <span class="hidden-portlet-status">Adicionado</span>
                </span>
            </li>
        </ul>
    </div>
</div>
<div id="resumo">
    <div id="top-grid">
        <div class="column top-left">
            <div class='portlet' id='portlet-visao-geral' i='visao-geral'><div class='portlet-header'><span>Resultados do mês</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-saldo-contas' i='saldo-contas'><div class='portlet-header'><span>Saldos das contas (confirmados)</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-saldo-cartoes' i='saldo-cartoes'><div class='portlet-header'><span>Cartões de crédito</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-projecao-contas' i='projecao-contas'><div class='portlet-header'><span>Saldos projetados</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-metas-despesa' i='metas-despesa'><div class='portlet-header'><span>Metas de despesa</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>        
        </div>
        <div class="column top-center">
            <div class='portlet' id='portlet-contas-pagar' i='contas-pagar'><div class='portlet-header'><span>Contas a pagar</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-despesas-categorias' i='despesas-categorias'><div class='portlet-header'><span>Despesas p/ categorias</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-metas-receita' i='metas-receita'><div class='portlet-header'><span>Metas de receita</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-metas-economia' i='metas-economia'><div class='portlet-header'><span>Metas de economia</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
        </div>
        <div class="column top-right">
            <div class='portlet' id='portlet-contas-receber' i='contas-receber'><div class='portlet-header'><span>Contas a receber</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div></div>
            <div class='portlet' id='portlet-receitas-categorias' i='receitas-categorias'><div class='portlet-header'><span>Receitas p/ categorias</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div>
            </div>
        </div>
    </div>
    <div id="bottom-grid">
        <div class="column bottom">
            <div class='portlet' id='portlet-fluxo-caixa' i='fluxo-caixa'><div class='portlet-header'><span>Fluxo de caixa</span><i class='icon-cog action-begin'></i><ul class='actions-menu'><li><span class='action-button portlet-toggle '><i class='icon-eye-open icon-large  icon-fixed-width'></i><span>Esconder/Exibir</span></span></li><li><span class='action-button portlet-refresh '><i class='icon-refresh icon-large  icon-fixed-width'></i><span>Atualizar</span></span></li><li><span class='action-button portlet-remove '><i class='icon-remove icon-large  icon-fixed-width'></i><span>Remover</span></span></li></ul></div><div class='portlet-content'></div>
            </div>
        </div>
    </div>
</div>
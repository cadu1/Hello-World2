
<div id="cabecalho_metas" class="btn-toolbar md-header agenda-header">
    
    <div class="btn-group">
        
        <select id="meta-visao" class="small-select" style="padding: 2px;">
            <option value="M" selected>Visão Mensal</option>
            <option value="T" >Visão Trimestral</option>
            <option value="S" >Visão Semestral</option>
            <option value="A" >Visão Anual</option>
        </select>
    </div>
    <div class="btn-group">
        <select id="select_regime" class="small-select" style="width:165px; padding: 2px;">
            <option value='CA' selected>Regime Caixa</option>
                        <option value='MI' >Regime Competência</option>
        </select>
    </div>    
    <div class="header-calendar">{"freq":1,"ini":"2014-05-01","fim":"2014-05-31"}</div>
        <div class="btn-group pull-right">
                
        
        <span class="btn btn-small qtitle" title="Exibir apenas categorias com metas definidas" qtitle-data-at="bottom center" qtitle-data-my="top center">
            <label style="margin: 0;font-size: 12px;">
                <input id="exibir_apenas_metas_definidas" type="checkbox"  style="margin:0;">
                Apenas definidas
            </label>
        </span>
        <button class="btn btn-small filter-trigger">
            <i class="icon-filter"></i>
            <span class="filter-counter">Filtros</span>
            <i></i>
        </button>
    </div>
    
    <div class="filter-manager">
    
    <div class="btn-toolbar filter-buttons">
        <span style="font-size: 12px;display: inline-block;vertical-align: middle;font-weight: bold;padding-right: 5px;">Filtrar por: </span>
        <div class="btn-group filter-button" filter-type="tipo">
            <button class="btn btn-small filter-label">Tipo</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                </li>
            </ul>
        </div>     
        <div class="btn-group filter-button" filter-type="categoria">
            <button class="btn btn-small filter-label">Categorias</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>            </ul>
        </div>
        
        <div class="btn-group filter-button" filter-type="situacaoproj">
            <button class="btn btn-small filter-label">Situação Projetada</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="confortavel">Confortável</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="alerta">Alerta</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="critica">Crítica</a>
                </li>
            </ul>
        </div> 
        
        <div class="btn-group filter-button" filter-type="situacaoconf">
            <button class="btn btn-small filter-label">Situação Confirmada</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="confortavel">Confortável</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="alerta">Alerta</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="critica">Crítica</a>
                </li>
            </ul>
        </div> 
        
        <div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div>        
    </div>    
    <div class="active-filters"></div>
</div>
</div>
<div id="metas_conteudo" ></div>
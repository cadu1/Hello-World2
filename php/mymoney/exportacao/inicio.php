<table id="tabela-exportacao">
    <tr>
        <td class="label-exportacao">
            Exportar para
        </td>
    </tr>
    <tr>
        <td class="data-exportacao">
            <input type="radio" name="destinoexpo" id="expoxls" checked value="xls"/>
            <label for="expoxls">xls</label>
            <input type="radio" name="destinoexpo" id="expoxlsx" value="xlsx"/>
            <label for="expoxlsx">xlsx</label>
        </td>
    </tr>
    <tr>
        <td class="label-exportacao">
            Período
        </td>
    </tr>
    <tr>
        <td class="data-exportacao">
                        <input type="text" id="inicio-expo" class="periodo-expo span2" value="01/05/2014"/>
            <span style="font-size: 12px; font-weight: bold;">até</span>
            <input type="text" id="fim-expo" class="periodo-expo span2" value="31/05/2014"/>
        </td>
    </tr>
    <tr>
        <td class="label-exportacao">
            Incluir<input type="checkbox" id="checkAll" checked style="margin-left: 5px">
        </td>
    </tr>
    <tr>
        <td class="data-exportacao" id="incluir">
                        <input type="checkbox" id="expocategoria" name="categoria" checked/>
            <label for="expocategoria">Categorias</label>
            <input type="checkbox" id="expoconta" name="conta" checked/>
            <label for="expoconta">Contas</label>
            <input type="checkbox" id="expocentro" name="centro" checked/>
            <label for="expocentro">Centros</label>
            <input type="checkbox" id="expocontato" name="contato" checked/>
            <label for="expocontato">Contatos</label>
            <input type="checkbox" id="expoformapgto" name="formapgto" checked/>
            <label for="expoformapgto">Formas de pagto.</label>
            <input type="checkbox" id="expoprojeto" name="projeto" checked/>
            <label for="expoprojeto">Projetos</label>
            <input type="checkbox" id="expondocumento" name="ndocumento" checked/>
            <label for="expondocumento">N. documento</label>
            <input type="checkbox" id="exponobservacao" name="observacao" checked/>
            <label for="exponobservacao">Observações</label>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: right;padding: 5px 5px 5px 0; border-top: 1px dotted #ccc;">
            <span id="statusexpo" style="font-size: 12px;"></span>
            <button class="btn" id="botao-exportar">
                <i class="icon-download-alt"></i>
                <span>Exportar</span>
            </button>
        </td>
    </tr>
</table>
<div id="download"></div>
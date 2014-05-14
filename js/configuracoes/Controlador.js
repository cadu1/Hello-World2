function ControladorConfiguracoes()
{
    var callback = arguments[arguments.length-1];
    var url = obtemUrlAjax("configuracoes");
    var args = arguments;
    var that = this;
    post(url,args,function(r)
    {
        if(typeof(callback) == "function") callback.call(that,r);
    });
}

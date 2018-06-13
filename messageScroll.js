DBFX.RegisterNamespace("DBFX.Web.Controls");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");

DBFX.Web.Controls.MessageScrollWidget= function () {
    var msw = DBFX.Web.Controls.Control("MessageScrollWidget");
    msw.VisualElement = document.createElement('DIV');


    msw.datas = ["1.学会html5 绝对的屌丝逆袭（案例）","2.tab页面切换效果（案例）","3.圆角水晶按钮制作（案例）"];


    msw.onload = function () {
        var divE = msw.VisualElement;
        divE.style.width = "400px";
        divE.style.height = '100px';
        divE.style.backgroundColor = '#53887A';
        divE.style.overflow = 'hidden';

        //con1
        msw.con01 = document.createElement('ul');
        msw.con01.style.padding = '0px';
        msw.con01.style.margin = '0px';
        //取消ul列表的点样式
        msw.con01.style.listStyle = 'none';
        divE.appendChild(msw.con01);
        msw.con02 = document.createElement('ul');
        msw.con02.style.listStyle = 'none';
        msw.con02.style.padding = '0px';
        msw.con02.style.margin = '0px';

        for (var i=0;i<msw.datas.length;i++){
            var liE = document.createElement('li');
            liE.style.height = '40px';
            // liE.style.margin = '0px';
            // liE.style.padding = '0px';
            msw.con01.appendChild(liE);
            var aE = document.createElement('a');
            //超链接样式
            aE.style.textDecoration = 'none';
            aE.style.color = "#333";
            aE.style.height = "40px";
            aE.style.display = "block";
            aE.style.overflow = "hidden";

            liE.appendChild(aE);
            aE.innerText = msw.datas[i];
        }

        msw.con02.innerHTML = msw.con01.innerHTML;
        divE.appendChild(msw.con02);


        var speed = 100;
        divE.scrollTop = 0;

        msw.scrollUp = function(){
            // console.log(divE.scrollTop);
            // console.log(msw.con01.scrollHeight);
            if(divE.scrollTop >= msw.con01.scrollHeight) {

                divE.scrollTop = 0;
            }else{

                divE.scrollTop ++;
            }
        }
        msw.myScroll = setInterval("msw.scrollUp()",speed);

        divE.onmouseover = function(){
            clearInterval(msw.myScroll);
        }
        divE.onmouseout = function(){
            msw.myScroll = setInterval("msw.scrollUp()",speed);
        }


        // divE.scrollLeft = 0;
    }
    msw.onload();


    return msw;
}
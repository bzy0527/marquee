DBFX.RegisterNamespace("DBFX.Web.Controls");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");



DBFX.Web.Controls.MessageScrollBox = function () {

    var msb = DBFX.Web.Controls.Control("MessageScrollBox");
    msb.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.MessageScrollBoxDesigner");
    msb.ClassDescriptor.Serializer = "DBFX.Serializer.MessageScrollBoxSerializer";

    msb.VisualElement = document.createElement('DIV');
    msb.VisualElement.className = "MessageScrollBox";
    msb.OnCreateHandle();
    msb.OnCreateHandle = function () {
        msb.VisualElement.innerHTML = "<DIV class='MessageScrollBox_Container'><marquee class='MessageScrollBox_ScrollArea'></marquee></DIV>";

        msb.marqueeE = msb.VisualElement.querySelector("marquee.MessageScrollBox_ScrollArea");
        msb.marqueeE.scrollDelay = 300;
        msb.marqueeE.onmouseover = function (ev) {
            this.stop();
        }

        msb.marqueeE.onmouseout = function (ev) {
            this.start();
        }
    }

    //滚动方向
    msb.scrollDir = 'left';
    Object.defineProperty(msb,'ScrollDir',{
       get:function () {
           return msb.scrollDir;
       },
        set:function (v) {
           msb.scrollDir = v;
           msb.marqueeE.direction = v;
            if(msb.scrollDir=='up' || msb.scrollDir == 'down'){
                msb.marqueeE.style.flexDirection = "column";

            }
            if(msb.scrollDir=='left' || msb.scrollDir == 'right'){
                msb.marqueeE.style.flexDirection = "row";

            }

        }
    });

    //滚动行为:scroll-环绕滚动（默认）;slide-滚动一次;alternate-来回滚动
    msb.scrollBehavior = 'scroll';
    Object.defineProperty(msb,'ScrollBehavior',{
        get:function () {
            return msb.scrollBehavior;
        },
        set:function (v) {
            msb.scrollBehavior = v;
            msb.marqueeE.behavior = v;
        }
    });

    //滚动速度
    msb.scrollSpeed = 6;
    Object.defineProperty(msb,'ScrollSpeed',{
        get:function () {
            return msb.scrollSpeed;
        },
        set:function (v) {
            msb.scrollSpeed = v;
            msb.marqueeE.scrollAmount = parseInt(v);
        }
    });

    //显示成员
    msb.displayMember = "Text";
    Object.defineProperty(msb, "DisplayMember", {
        get: function () {
            return msb.displayMember;
        },
        set: function (v) {
            msb.displayMember = v;
        }
    });


    //滚动次数
    //滚动数据源
    msb.datas = [''];
    Object.defineProperty(msb,'Datas',{
        get:function () {
            return msb.datas;
        },
        set:function (v) {
            msb.datas = v;
            msb.layoutView(v);
        }
    });

    //背景色
    msb.SetBackgroundColor = function (v) {
        msb.marqueeE.bgColor = v;
    }

    msb.SetFontSize = function (v) {
        msb.marqueeE.style.fontSize = v;
    }
    msb.SetFontFamily = function (v) {
        msb.marqueeE.style.fontFamily = v;
    }

    msb.SetFontStyle = function (v) {
        msb.marqueeE.style.fontStyle = v;
    }

    msb.SetWidth = function (v) {
        msb.VisualElement.style.width = v;
        // msb.marqueeE.width = parseInt(v);
    }
    msb.SetHeight = function (v) {
        msb.VisualElement.style.height = v;
        // msb.marqueeE.height = parseInt(v);
    }

    msb.SetBorderRadius = function (v) {
        msb.VisualElement.style.borderRadius = v;
    }
    
    //布局滚动元素
    msb.layoutView = function (datas) {

        //判断是否为数组
        if(datas instanceof Array){

            //清空滚动区域的所有元素
            msb.marqueeE.innerText = '';

            var scrollText = '';

            for(var i=0;i<datas.length;i++){
                var messageE = document.createElement('div');
                messageE.style.display = 'inline-block';
                // messageE.style.height = '40px';
                messageE.innerText = datas[i];
                scrollText += datas[i];
                scrollText += "&emsp;&emsp;";

                //FIXME:
                // var msg = new DBFX.Web.Controls.Message();
                // msg.Title = '标题';
                // msg.Subtitle = datas[i];
                // msb.marqueeE.appendChild(msg.VisualElement);


                var brE = document.createElement('br');
                var brE01 = document.createElement('br');

                var spanE = document.createElement('span');
                spanE.className = "MessageScrollBox_MessageOld";
                spanE.innerText = datas[i];

                if(msb.scrollDir=='up' || msb.scrollDir == 'down'){

                    msb.marqueeE.appendChild(messageE);
                    msb.marqueeE.appendChild(brE);
                    msb.marqueeE.appendChild(brE01);
                }

                if(msb.scrollDir=='left' || msb.scrollDir == 'right'){
                    msb.marqueeE.appendChild(spanE);

                }

            }

            //TODO:
            // if(msb.scrollDir=='left' || msb.scrollDir == 'right'){
            //     msb.marqueeE.innerHTML = scrollText;
            // }
        }
    }
    
    //TODO:以下方法9.20
    Object.defineProperty(msb,'ItemSource',{
        get:function () {
            return msb.itemSource;
        },
        set:function (v) {
            msb.itemSource = v;
            msb.createMsgs(v);
        }
    });

    //处理消息点击
    msb.handleMsgClick = function (e) {
        if (msb.Command != undefined && msb.Command != null) {
            msb.Command.Sender = msb;
            msb.Command.Execute();
        }
        if(msb.MessageClick != undefined && msb.MessageClick.GetType() == "Command"){
            msb.MessageClick.Sender = msb;
            msb.MessageClick.Execute();
        }

        if(msb.MessageClick != undefined && msb.MessageClick.GetType() == "function"){
            msb.MessageClick(e,msb);
        }
    }

    msb.MessageInfo = undefined;

    msb.createMsgs = function (datas) {
        if(!Array.isArray(datas)) return;
        //清空滚动区域的所有元素
        msb.marqueeE.innerText = '';

        for(var i=0;i<datas.length;i++){

            if(msb.scrollDir=='up' || msb.scrollDir == 'down'){
                var messageE = document.createElement('div');
                messageE.className = "MessageScrollBox_MessageUp";
                // messageE.style.height = '40px';
                messageE.innerText = datas[i][msb.displayMember];
                messageE.info = datas[i];
                // msb.MessageInfo = datas[i];
                messageE.onmousedown = function (ev) {
                    msb.MessageInfo = this.info;
                    msb.handleMsgClick(ev);
                }

                var brE = document.createElement('br');
                var brE01 = document.createElement('br');

                msb.marqueeE.appendChild(messageE);
                msb.marqueeE.appendChild(brE);
                msb.marqueeE.appendChild(brE01);
            }


            if(msb.scrollDir=='left' || msb.scrollDir == 'right'){
                var spanE = document.createElement('span');
                spanE.className = "MessageScrollBox_Message";
                spanE.innerText = datas[i][msb.displayMember];
                spanE.info = datas[i];
                spanE.onmousedown = function (ev) {
                    msb.MessageInfo = this.info;
                    msb.handleMsgClick(ev);
                }

                msb.marqueeE.appendChild(spanE);

            }
        }
    }

    msb.OnCreateHandle();
    return msb;

}
DBFX.Serializer.MessageScrollBoxSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        // DBFX.Serializer.DeSerialProperty("BgColor", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollDir", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollBehavior", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollSpeed", c, xe);
        DBFX.Serializer.DeSerialProperty("DisplayMember", c, xe);

        DBFX.Serializer.DeSerializeCommand("MessageClick", xe, c);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {
        // DBFX.Serializer.SerialProperty("BgColor", c.BgColor, xe);
        DBFX.Serializer.SerialProperty("ScrollDir", c.ScrollDir, xe);
        DBFX.Serializer.SerialProperty("ScrollBehavior", c.ScrollBehavior, xe);
        DBFX.Serializer.SerialProperty("ScrollSpeed", c.ScrollSpeed, xe);
        DBFX.Serializer.SerialProperty("DisplayMember", c.DisplayMember, xe);

        DBFX.Serializer.SerializeCommand("MessageClick", c.MessageClick, xe);

    }
}
DBFX.Design.ControlDesigners.MessageScrollBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/MessageScrollBoxDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;

            //设计器中绑定事件处理
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{EventName:"MessageClick",EventCode:undefined,Command:od.dataContext.MessageClick,Control:od.dataContext}];
        }, obdc);
    }

    //事件处理程序
    obdc.DataContextChanged = function (e) {
        obdc.DataBind(e);
        if(obdc.EventListBox != undefined){
            obdc.EventListBox.ItemSource = [{EventName:"MessageClick",EventCode:undefined,Command:obdc.dataContext.MessageClick,Control:obdc.dataContext}];
        }
    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "消息滚动控件";
    return obdc;
}

DBFX.Web.Controls.Message = function () {
    var ms = DBFX.Web.Controls.Control("Message");
    ms.VisualElement = document.createElement('DIV');

    ms.title = '标题';
    Object.defineProperty(ms,'Title',{
       get:function () {
           return ms.title;
       },
       set:function (v) {
           ms.title = v;
           ms.titleE.innerText = v;

       }
    });

    ms.subtitle = '副标题';
    Object.defineProperty(ms,'Subtitle',{
        get:function () {
            return ms.subtitle;
        },
        set:function (v) {
            ms.subtitle = v;
            ms.subTitleE.innerText = v;
        }
    });

    ms.imgURL = '';
    Object.defineProperty(ms,'ImgURL',{
        get:function () {
            return ms.imgURL;
        },
        set:function (v) {
            ms.imgURL = v;
            ms.pictureE.src = v;
        }
    });

    ms.onload = function () {
        var divE = ms.VisualElement;

        //标题
        ms.titleE = document.createElement('span');
        ms.titleE.style.wordBreak = 'keep-all';
        ms.titleE.style.display = 'inline-block';
        ms.titleE.style.width = '30px';
        ms.titleE.style.height = '50px';


        //副标题
        ms.subTitleE = document.createElement('span');
        ms.subTitleE.style.marginLeft = '30px';
        ms.subTitleE.style.width = '100px';
        ms.subTitleE.style.wordBreak = 'keep-all';

        //图片
        ms.pictureE = document.createElement('img');

        divE.appendChild(ms.titleE);
        divE.appendChild(ms.subTitleE);
        divE.appendChild(ms.pictureE);
    }

    ms.onload();
    return ms;
}
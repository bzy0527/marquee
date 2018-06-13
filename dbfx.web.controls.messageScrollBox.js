DBFX.RegisterNamespace("DBFX.Web.Controls");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");



DBFX.Web.Controls.MessageScrollBox = function () {

    var msb = DBFX.Web.Controls.Control("MessageScrollBox");
    msb.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.MessageScrollBoxDesigner");
    msb.ClassDescriptor.Serializer = "DBFX.Serializer.MessageScrollBoxSerializer";

    msb.VisualElement = document.createElement('DIV');
    msb.OnCreateHandle();

    //滚动方向
    msb.scrollDir = 'left';
    Object.defineProperty(msb,'ScrollDir',{
       get:function () {
           return msb.scrollDir;
       },
        set:function (v) {
           msb.scrollDir = v;
           msb.marqueeE.direction = v;

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


    //背景色
    // msb.bgColor = 'white';
    // Object.defineProperty(msb,'BgColor',{
    //     get:function () {
    //         return msb.bgColor;
    //     },
    //     set:function (v) {
    //         msb.bgColor = v;
    //         msb.marqueeE.bgColor = v;
    //     }
    // });


    //滚动次数
    //滚动数据源
    msb.datas = ['信息1:','信息2:','信息3:','信息4:'];
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
        msb.marqueeE.width = parseInt(v);
    }
    msb.SetHeight = function (v) {
        msb.VisualElement.style.height = v;
        msb.marqueeE.height = parseInt(v);
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

            for(var i=0;i<datas.length;i++){
                var messageE = document.createElement('div');
                messageE.style.display = 'inline-block';
                messageE.innerText = datas[i];
                msb.marqueeE.appendChild(messageE);

                //FIXME:
                // var msg = new DBFX.Web.Controls.Message();
                // msg.Title = '标题';
                // msg.Subtitle = datas[i];
                // msb.marqueeE.appendChild(msg.VisualElement);


                var brE = document.createElement('br');
                var blankspaceE = document.createElement('div');
                blankspaceE.style.display = 'inline-block';
                blankspaceE.style.width = '15px';
                blankspaceE.style.height = '100%';

                if(msb.scrollDir=='left' || msb.scrollDir == 'right'){
                    msb.marqueeE.appendChild(blankspaceE);
                }else {
                    msb.marqueeE.appendChild(brE);
                }
            }
        }
    }

    msb.onload = function () {
        var msbV = msb.VisualElement;
        msbV.style.width = '250px';
        msbV.style.height = '40px';
        // msbV.style.border = '1px solid red';

        var scrollArea = document.createElement('div');
        scrollArea.style.display = "flex";
        scrollArea.style.flexDirection = "column";
        scrollArea.style.justifyContent = "center";
        scrollArea.style.height = "100%";
        scrollArea.style.width = "100%";
        scrollArea.style.justifyContent = "center";
        msbV.appendChild(scrollArea);

        //滚动区域
        msb.marqueeE = document.createElement('marquee');
        msb.marqueeE.style.display = "flex";
        msb.marqueeE.style.flexDirection = "column";
        msb.marqueeE.style.justifyContent = "center";
        msb.marqueeE.style.height = "100%";
        msb.marqueeE.style.width = "100%";
        msb.marqueeE.style.justifyContent = "center";

        scrollArea.appendChild(msb.marqueeE);
        msb.marqueeE.scrollDelay = 300;
        //布局滚动信息
        msb.layoutView(msb.datas);


        msb.marqueeE.onmouseover = function (ev) {
            this.stop();
        }

        msb.marqueeE.onmouseout = function (ev) {
            this.start();
        }

    }
    msb.onload();
    return msb;

}
DBFX.Serializer.MessageScrollBoxSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        // DBFX.Serializer.DeSerialProperty("BgColor", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollDir", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollBehavior", c, xe);
        DBFX.Serializer.DeSerialProperty("ScrollSpeed", c, xe);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {
        // DBFX.Serializer.SerialProperty("BgColor", c.BgColor, xe);
        DBFX.Serializer.SerialProperty("ScrollDir", c.ScrollDir, xe);
        DBFX.Serializer.SerialProperty("ScrollBehavior", c.ScrollBehavior, xe);
        DBFX.Serializer.SerialProperty("ScrollSpeed", c.ScrollSpeed, xe);

    }
}
DBFX.Design.ControlDesigners.MessageScrollBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/MessageScrollBoxDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;
        }, obdc);
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
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function shelveLightEmissive(shelfName,lightName,type){
    if(type == "open"){
        rgb =  {r:255,g:255,b:0}
    }else {
        rgb =  {r:0,g:0,b:0}
    }
    shelvesLights[shelfName][lightName].material.emissive = rgb

}
const constShelvesData = ['衣架','货架4','货架6'];
const toolsData = ['电焊帽','电钻','电笔','万用表','五金工具','安全帽','电缆','电钻','绝缘剥线器','绝缘跳线','绝缘遮蔽罩'];
var app = new Vue({
    el:'#app',
    data:{
        transformModel :'translate',
        gridShow:false,
        gridData :constShelvesData,
        objType:'货架',
        shelves:{},
        shelvesData:[],
        lightData:[],
        shelvesIndex:{
            '衣架':0,
            '货架4':0,
            '货架6':0
        },//用于保存货架序号
        currentLight:[]
    },
    methods:{
        ChangeModel:function (model) {
            this.transformModel = model;
            transformControls.setMode(this.transformModel);
        },
        UpdateLight:function(){
            var selects = document.getElementById("select_shelf");
            var indexs = selects.selectedIndex;  //选中项的索引
            var lightData = [];
            for(key in shelvesLights[selects[indexs].value]){
                lightData.push(key);
            }
            lightData.sort();
            this.lightData = lightData
        },
        Add:function (type) {


            if(type=='shelves'){
                this.gridData  = constShelvesData;
                this.objType='货架';
                this.gridShow = true;
            }else if(type=='tools'){
                this.shelvesData = [];
                this.gridShow = true;
                //更新添加货物select
                for(key in this.shelves){
                    this.shelvesData.push(key);
                }
                this.objType='工具';
                this.gridData  = toolsData;
                this.$nextTick(function () {
                    this.UpdateLight();
                });

            }else if(type=='warehouse'){
                addModel('厂房','厂房','厂房', guid());
            }

        },
        AddObj:function(){
            var obj = document.getElementsByName("card__input");
            var check_val = [];
            obj.forEach(function (child) {
                check_val.push(child.checked);
            });
            this.gridShow = false;
            if (this.objType == '货架'){
                for(var i=0;i<check_val.length;i++){
                    if(check_val[i]){
                        uuid = guid();
                        this.shelvesIndex[this.gridData[i]] += 1;
                        var shelfName = this.gridData[i]+"_"+this.shelvesIndex[this.gridData[i]];
                        this.shelves[shelfName] = {
                            name:this.gridData[i],
                            type:'货架',
                            position:[0,0,0],
                            scale:1,
                            rotate:[],
                            children:[],
                            uuid:uuid
                        };
                        addModel(shelfName,this.gridData[i],this.objType,uuid);
                        // if(! (this.gridData[i] in modelPlaced)){
                        //     modelPlaced[this.gridData[i]] = {}
                        // }

                    }
                }
            }else{
                var selects = document.getElementById("select_shelf");
                var indexs = selects.selectedIndex;  //选中项的索引
                for(var i=0;i<check_val.length;i++){
                    if(check_val[i]){
                        uuid = guid();
                        children = {
                            type:'工器具',
                            name:this.gridData[i],
                            position:[0,0,0],
                            scale:1,
                            rotate:[],
                            uuid:uuid
                        };
                        this.shelves[selects[indexs].value].children.push(children);
                        addModel(this.gridData[i],this.gridData[i],this.objType,uuid,objectUuid[this.shelves[selects[indexs].value].uuid].position);

                        //指示灯
                        if(String(this.currentLight)!=String([])){
                            shelveLightEmissive(
                                this.currentLight[0],
                                this.currentLight[1],
                                "close"
                            )
                        }
                        tmpSelect = document.getElementById("select_light");
                        this.currentLight = [selects[indexs].value,tmpSelect[tmpSelect.selectedIndex].value];
                        shelveLightEmissive(
                            this.currentLight[0],
                            this.currentLight[1],
                            "open"
                        );
                        if(! (this.gridData[i] in modelPlaced) ){
                          modelPlaced[this.gridData[i]] = {
                              "shelves":selects[indexs].value,
                              "light":[],
                          }
                        }
                        lightIndex = this.currentLight[1].replaceAll('指示灯', '');
                        if(!modelPlaced[this.gridData[i]].light.includes(Number(lightIndex))){
                            modelPlaced[this.gridData[i]].light.push(Number(lightIndex))
                        }
                    }
                }
            }
            alert('添加成功');
        },
        Save:function () {
            for(key in this.shelves){
                this.shelves[key].position = objectUuid[this.shelves[key].uuid].position;
                this.shelves[key].rotate = objectUuid[this.shelves[key].uuid].rotation;
                this.shelves[key].scale = objectUuid[this.shelves[key].uuid].scale;
                for(var i=0;i<this.shelves[key].children.length;i++){
                    this.shelves[key].children[i].position = objectUuid[this.shelves[key].children[i].uuid].position;
                    this.shelves[key].children[i].rotate = objectUuid[this.shelves[key].children[i].uuid].rotation;
                    this.shelves[key].children[i].scale = objectUuid[this.shelves[key].children[i].uuid].scale;
                }
            }

            alert("保存成功");
            function ChangeStyle() {
                tmp = app.shelves;
                data = [];
                for(key in app.shelves){
                    tmpData = app.shelves[key];
                    tmpChild = [];
                    var tmpkeyDict = {};
                    tmpData.children.forEach(function(child){
                        if(!tmpkeyDict[child.name] ){
                            tmpkeyDict[child.name]={
                                "name":child.name,
                                "type": child.type,
                                "path": child.name+"/file",
                                "position":[],
                                "rotate":child.rotate,
                                "scale_xyz":child.scale
                            }
                        }
                        tmpkeyDict[child.name].position.push([
                            child.position.x - tmpData.position.x,
                            child.position.y - tmpData.position.y,
                            child.position.z - tmpData.position.z,
                        ])
                    });
                    childrenArr = [];
                    for(tmpKey in tmpkeyDict){
                        childrenArr.push(tmpkeyDict[tmpKey])
                    }
                    data.push({
                        "name": key,
                        "type": tmpData.type,
                        "format": 'obj',
                        "path":tmpData.name+"/file",
                        "position":  [tmpData.position.x,tmpData.position.y,tmpData.position.z],
                        "child":childrenArr,
                        "rotate":tmpData.rotate,
                        "scale_xyz":tmpData.scale
                    })
                }
                if(warehouse!=null){
                    data.push({
                        "name": "厂房",
                        "type": "厂房",
                        "format": "obj",
                        "path":"厂房/file",
                        "position": null,
                        "scale": 1,
                        "rotate": null,
                        "child": []
                    })
                }
               saveToDb(data);
            }
            ChangeStyle()
        },
        Close:function () {
            this.gridShow = false;
        }
    }
});
function saveToDb(positionData) {
    axios({
        url: 'http://123.56.238.156:9200/tool_position/webgl/_search',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data:{
            "_source": false,
            "query" : {
                "match_all" : {}
            }
        }
    }).then(res => {
        total= res['data']['hits']['total'] +1 ;
        axios({
            url: 'http://123.56.238.156:9200/tool_position/webgl/'+total,
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{'information':positionData}
        }).then(res => {
        });
        axios({
            url: 'http://123.56.238.156:9200/model_placed/webgl/'+total,
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            data:modelPlaced
        }).then(res => {
        });
    });
}
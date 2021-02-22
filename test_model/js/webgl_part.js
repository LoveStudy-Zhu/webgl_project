var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 60);
    camera.lookAt(new THREE.Vector3(0,5,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

function initGrid(){ //辅助网格
    var helper = new THREE.GridHelper( 1000, 100 ,0x0000ff, 0xff8080);
    // helper.setColor( 0x0000ff, 0x808080 );
    helper.position.y = 0;
    scene.add( helper );
}

//初始化dat.GUI简化试验流程
var gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

var light;
//环境光
function initLight() {
    addLight('AmbientLight',0x444444);
    // addLight('PointLight',0xffffff,[0,200,100],1.25);
    addLight('PointLight',0xffffff,[100,100,100],1);
    addLight('PointLight',0xffffff,[-100,100,100],1);
    // addLight('PointLight',0xffffff,[0,5,0]);
}
function addLight(type,color,position,intensity) {
    switch (type) {
        case 'PointLight':
            light = new THREE.PointLight(color);
            light.position.set(position[0],position[1],position[2]);
            if(intensity != undefined){
                light.intensity = intensity;
            }
            //告诉平行光需要开启阴影投射
            light.castShadow = true;
            break;
        case 'AmbientLight':
            light = new THREE.AmbientLight(color);
            break;
        case 'SpotLight ':break;
        case 'DirectinalLight ':break;
    }

    scene.add(light);
}

var shelvesModels = new Set([]);
var objectModels =new Set([]);

function showModel(name,type,position,scale,rotate){

    if (type == 'obj'){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('lib/model/');
        //加载mtl文件
        mtlLoader.load(name+'.mtl', function (material) {
            var objLoader = new THREE.OBJLoader();
            //设置当前加载的纹理
            objLoader.setMaterials(material);
            objLoader.setPath('lib/model/');
            objLoader.load(name+'.obj', function (object) {
                object.children.forEach(function (child) {
                    child.material.opacity = 1;
                    if (! (child.name in ['厂房','电灯'] ) ){
                        if (child.name.startsWith('货架')){
                            shelvesModels.add(child.name)
                        }else {
                            objectModels.add(child.name)
                        }
                    }
                })
                if(rotate != undefined){
                    switch (rotate[1]) {
                        case 'x':object.rotateX(rotate[0]);break;
                        case 'y':object.rotateY(rotate[0]);break;
                        case 'z':object.rotateZ(rotate[0]);break;
                    }

                }
                //将模型缩放并添加到场景当中
                if (position != undefined){
                    object.position.set(position[0],position[1],position[2])
                }

                if (scale != undefined){
                    object.scale.set(scale,scale,scale);
                }

                scene.add(object);
            })
        });
    }else if(type == 'fbx'){
        //加载模型
        var loader = new THREE.FBXLoader();
        loader.load('lib/model/' + name + ".fbx", function (object) {
            object.scale.set(0.1, 0.1, 0.1);
            object.children.forEach(function (child) {
                console.log(child)
            })
            scene.add(object);
        })
    }
}

var selectModel = null;
function initModel() {
    // var type = 'obj';
    //辅助工具
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);
    showModel("厂房/file","obj",position = undefined,scale = 1);
    showModel("开关/file","obj",position = [-20,10,40],scale = 1,rotate =[Math.PI,'x'])
    showModel("漏电保护器/file_close","obj",position = [-20,15,40],scale = 1);
    showModel("配电箱/file","obj",position = [-13.5,0,50],scale = 1);
    showModel("工业吸尘器/file","obj",position = [-19,0,40],scale = 1);
    //衣物货架
    {
        clothShelves = [0,0,1];
        showModel("衣架/file","obj", position = clothShelves, scale = 1);
        //绝缘鞋子
        {
            showModel("绝缘鞋子/file","obj", position = [clothShelves[0]+1,clothShelves[1]+1,clothShelves[2]+0],scale = 1)
            showModel("绝缘鞋子/file","obj", position = [clothShelves[0]-1,clothShelves[1]+1,clothShelves[2]+0],scale = 1)
            showModel("绝缘鞋子/file","obj", position = [clothShelves[0]+1,clothShelves[1]+2.1,clothShelves[2]+0],scale = 1)
            showModel("绝缘鞋子/file","obj", position = [clothShelves[0]-1,clothShelves[1]+2.1,clothShelves[2]+0],scale = 1)
        }
        //绝缘毯
        {
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+3,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+3.25,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+3.5,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+3.75,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+4.15,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+4.4,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+4.65,clothShelves[2]+0],scale = 1)
            showModel("绝缘毯/file","obj", position = [clothShelves[0]+0,clothShelves[1]+4.9,clothShelves[2]+0],scale = 1)
        }
        //绝缘手套
        {
            showModel("绝缘手套/file","obj", position = [clothShelves[0]-1,clothShelves[1]+5.35,clothShelves[2]+0],scale = 1)
            showModel("绝缘手套/file","obj", position = [clothShelves[0]+1,clothShelves[1]+5.35,clothShelves[2]+0],scale = 1)
            showModel("绝缘手套/file","obj", position = [clothShelves[0]-1,clothShelves[1]+6.45,clothShelves[2]+0],scale = 1)
            showModel("绝缘手套/file","obj", position = [clothShelves[0]+1,clothShelves[1]+6.45,clothShelves[2]+0],scale = 1)
        }
        //绝缘手套
        {
            showModel("安全帽/file","obj", position = [clothShelves[0]-1,clothShelves[1]+7.6,clothShelves[2]+0],scale = 1)
            showModel("安全帽/file","obj", position = [clothShelves[0]+1,clothShelves[1]+7.6,clothShelves[2]+0],scale = 1)
            showModel("安全帽/file","obj", position = [clothShelves[0]-1,clothShelves[1]+8.75,clothShelves[2]+0],scale = 1)
            showModel("安全帽/file","obj", position = [clothShelves[0]+1,clothShelves[1]+8.75,clothShelves[2]+0],scale = 1)
        }
        //绝缘衣
        {
            showModel("绝缘衣/file","obj", position = [clothShelves[0]-5.5,clothShelves[1]+7.25,clothShelves[2]+1],scale = 1)
            showModel("绝缘衣/file","obj", position = [clothShelves[0]+5.5,clothShelves[1]+7.25,clothShelves[2]+1],scale = 1)
        }
    }

    //货架4
    {
        Shelves4 = [-18,0,10,[Math.PI/2,'y']]
        showModel("货架4/file","obj",position = [Shelves4[0],Shelves4[1],Shelves4[2]],scale = 1,rotate=Shelves4[3]);
        //五金工具
        {
            showModel("五金工具/file","obj",position = [Shelves4[0],Shelves4[1]+2.25,Shelves4[2]],scale = 1,rotate=Shelves4[3]);
            showModel("五金工具/file","obj",position = [Shelves4[0],Shelves4[1]+5,Shelves4[2]],scale = 1,rotate=Shelves4[3]);
        }
        //万用表
        {
            showModel("万用表/file","obj",position = [Shelves4[0],Shelves4[1]+2.25,Shelves4[2]-5],scale = 1,rotate=Shelves4[3]);
            showModel("万用表/file","obj",position = [Shelves4[0],Shelves4[1]+2.25,Shelves4[2]+5],scale = 1,rotate=Shelves4[3]);
            showModel("万用表/file","obj",position = [Shelves4[0],Shelves4[1]+5,Shelves4[2]-5],scale = 1,rotate=Shelves4[3]);
            showModel("万用表/file","obj",position = [Shelves4[0],Shelves4[1]+5,Shelves4[2]+5],scale = 1,rotate=Shelves4[3]);
        }
        //带电接火3件套
        {
            showModel("带电接火三件套/file","obj",position = [Shelves4[0],Shelves4[1]+7.25,Shelves4[2]-2],scale = 1,rotate=Shelves4[3])
            showModel("带电接火三件套/file","obj",position = [Shelves4[0],Shelves4[1]+10,Shelves4[2]-2],scale = 1,rotate=Shelves4[3])
        }
    }

    //货架6
    {
        Shelves6 = [17,0,2.5];
        showModel("货架6/file","obj",position = [Shelves6[0],Shelves6[1],Shelves6[2]],scale = 1);
        //绝缘跳线 (跳线管)
        {
            showModel("绝缘跳线/file","obj",position = [Shelves6[0],Shelves6[1]+1,Shelves6[2]],scale = 1);
            showModel("绝缘跳线/file","obj",position = [Shelves6[0],Shelves6[1]+3.5,Shelves6[2]],scale = 1);
        }
        {
            showModel("电缆/file","obj",position = [Shelves6[0],Shelves6[1]+5.75,Shelves6[2]],scale = 1);
            showModel("电缆/file","obj",position = [Shelves6[0],Shelves6[1]+7.5,Shelves6[2]],scale = 1);
        }

    }

    //货架4
    {
        Shelves4_2 = [18, 0, 15, [Math.PI / 2, 'y']]
        showModel("货架4/file", "obj", position = [Shelves4_2[0], Shelves4_2[1], Shelves4_2[2]], scale = 1, rotate = Shelves4_2[3]);
        //绝缘遮蔽罩
        {
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0]-0.5,Shelves4_2[1]+2,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+2,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0]+0.5,Shelves4_2[1]+2,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0]-0.5,Shelves4_2[1]+4.75,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+4.75,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("绝缘遮蔽罩/file","obj",position = [Shelves4_2[0]+0.5,Shelves4_2[1]+4.75,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
        }
        //电钻
        {
            showModel("电钻/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+5.5,Shelves4_2[2]-5],scale = 1,rotate=Shelves4_2[3]);
            showModel("电钻/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+5.5,Shelves4_2[2]],scale = 1,rotate=Shelves4_2[3]);
            showModel("电钻/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+5.5,Shelves4_2[2]+5],scale = 1,rotate=Shelves4_2[3]);
        }
        //金属探测器
        {
            showModel("金属探测仪/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10,Shelves4_2[2]-1],scale = 1,rotate=Shelves4_2[3]);
            showModel("金属探测仪/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10,Shelves4_2[2]+1],scale = 1,rotate=Shelves4_2[3]);
            showModel("金属探测仪/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10,Shelves4_2[2]+3],scale = 1,rotate=Shelves4_2[3]);
        }
        //电笔
        {
            showModel("电笔/file","obj",position = [Shelves4_2[0]-0.5,Shelves4_2[1]+10.1,Shelves4_2[2]-5],scale = 1,rotate=Shelves4_2[3]);
            showModel("电笔/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10.1,Shelves4_2[2]-5],scale = 1,rotate=Shelves4_2[3]);
            showModel("电笔/file","obj",position = [Shelves4_2[0]+0.5,Shelves4_2[1]+10.1,Shelves4_2[2]-5],scale = 1,rotate=Shelves4_2[3]);
        }
        //灯泡
        {
            showModel("灯泡/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10.1,Shelves4_2[2]+5],scale = 1,rotate=Shelves4_2[3]);
            showModel("灯泡/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10.1,Shelves4_2[2]+6],scale = 1,rotate=Shelves4_2[3]);
            showModel("灯泡/file","obj",position = [Shelves4_2[0],Shelves4_2[1]+10.1,Shelves4_2[2]+4],scale = 1,rotate=Shelves4_2[3]);
        }

    }

    {
        Shelves4_3 = [18, 0, 30, [Math.PI / 2, 'y']]
        showModel("货架4/file", "obj", position = [Shelves4_2[0], Shelves4_3[1], Shelves4_3[2]], scale = 1, rotate = Shelves4_3[3]);
        //电焊帽
        {
            for(var i=-4;i<=4;i= i+2){
                showModel("电焊帽/file", "obj", position = [Shelves4_2[0], Shelves4_3[1]+2.15, Shelves4_3[2]+i], scale = 1, rotate = Shelves4_3[3]);
            }

        }
        //焊钳
        {
            for(var i=-6;i<=6;i= i+2){
                showModel("焊钳/file", "obj", position = [Shelves4_2[0], Shelves4_3[1]+4.65, Shelves4_3[2]+i], scale = 1, rotate = Shelves4_3[3]);
            }

        }

        //绝缘剥线器
        {
            for (var i = -4; i <= 4; i = i + 4) {
                showModel("绝缘剥线器/file", "obj", position = [Shelves4_2[0], Shelves4_3[1] + 7.5, Shelves4_3[2]+i], scale = 1, rotate = Shelves4_3[3]);
            }
        }
        //熔断器
        {
            for(var i=-5;i<=5;i= i+2.5){
                showModel("熔断器/file", "obj", position = [Shelves4_2[0], Shelves4_3[1]+10.25, Shelves4_3[2]+i], scale = 1, rotate = Shelves4_3[3]);
            }

        }

    }
    
    function ChangeProperty(material,property) {
        if(Array.isArray(material)){
            material.forEach(function (child) {
                child.transparent = property.transparent;
                child.opacity = property.opacity;
            })
        }else {
            material.transparent = property.transparent;
            material.opacity = property.opacity;
        }
    }
    //点击事件
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    function onMouseClick( event ) {

        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera( mouse, camera );

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects( scene.children, true);

        if (intersects.length != 0 && intersects[0].object.name != '厂房'){


            if (selectModel != null){
                // console.log(selectModel)
                ChangeProperty(selectModel.material, {transparent:false,opacity:1});
            }
            selectModel = intersects[0].object;
            ChangeProperty(selectModel.material, {transparent:true,opacity:0.5});

            // if (!intersects[0].object.name.startsWith('平面')){
            //     selectedObject = intersects[0].object;
            //     intersects[0].object.material.color.set( 0xff0000 );
            // }

        }
    }

    window.addEventListener( 'click', onMouseClick, false );

}

//初始化性能插件
var stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance  = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 200;
    //是否开启右键拖拽
    controls.enablePan = true;
}

function render() {
    if (selectModel &&( Array.from(shelvesModels).includes(selectModel.name) || Array.from(objectModels).includes(selectModel.name) )){
        var worldVector = selectModel.getWorldPosition(worldVector);
        var standardVector = worldVector.project(camera);
        var a = window.innerWidth/2;
        var b = window.innerHeight/2;
        var x = Math.round(standardVector.x * a + a);
        var y = Math.round(-standardVector.y *b +b);
        var div = document.getElementById('model_function_select')
        div.style.setProperty("--left", x + 'px');
        div.style.setProperty("--top", y + 'px');
    }
    renderer.render( scene, camera );
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    controls.update();

    requestAnimationFrame(animate);
}

function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();
    initGrid();
    animate();
    window.onresize = onWindowResize;
}
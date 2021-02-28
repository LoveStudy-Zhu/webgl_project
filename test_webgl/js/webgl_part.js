var scene, camera, renderer, controls, light;
var objects = [];
var objectUuid = {};
var shelvesLights = {};
var modelPlaced = {};
var warehouse = null;
// 场景
function initScene() {
    scene = new THREE.Scene();
}

// 相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 60);
    camera.lookAt(new THREE.Vector3(0,5,0));
}

// 渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);
}


// 初始化模型
function initContent() {
    var helper = new THREE.GridHelper(1200, 50, 0xCD3700, 0x4A4A4A);
    scene.add(helper);
    // var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    // var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x9370DB});
    // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // scene.add(cub);
    //加载OBJ格式的模型e



}
function addModel(name,path,type,uuid,position) {
    var returnModel =null;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('lib/model/');
    //加载mtl文件
    mtlLoader.load(path+'/file.mtl', function (material) {
        var objLoader = new THREE.OBJLoader();
        //设置当前加载的纹理
        objLoader.setMaterials(material);
        objLoader.setPath('lib/model/');
        objLoader.load(path+'/file.obj', function (object) {
            object.children.forEach(function (child) {
                child.material.opacity = 1;
                if(type=="货架" && child.name.startsWith("指示灯")){
                    if (!shelvesLights[name]){
                        shelvesLights[name] = {};
                    }
                    shelvesLights[name][child.name] = child
                }
            });
            if(type=='工具'){
                object.position.x = position.x;
                object.position.y = position.y;
                object.position.z = position.z;
            }
            scene.add(object);
            if(type != '厂房'){
                objects.push(object);
            }else {
                warehouse = object;
            }
            objectUuid[uuid] = object;
        });
    });
}

// 窗口变动触发的方法
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 初始化轨迹球控件
function initControls() {
    controls = new THREE.TrackballControls(camera, renderer.domElement);
}
var transformControls;
// 添加拖拽控件
function initDragControls() {
    // 添加平移控件
    transformControls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    // 过滤不是 Mesh 的物体,例如辅助网格
    // 初始化拖拽控件
    var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

    // 鼠标略过
    dragControls.addEventListener('hoveron', function (event) {
        transformControls.setMode(app.transformModel);
        transformControls.attach(event.object);
    });
    // 开始拖拽
    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });
}

function initLight() {
    addLight('AmbientLight',0x444444);
    addLight('PointLight',0xffffff,[0,500,100],1.25);
    // addLight('PointLight',0xffffff,[100,100,100],1);
    // addLight('PointLight',0xffffff,[-100,100,100],1);
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
// 初始化
function init() {
    initScene();
    initCamera();
    initRenderer();
    initContent();
    initLight();
    initControls();
    initDragControls();
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

init();
animate();

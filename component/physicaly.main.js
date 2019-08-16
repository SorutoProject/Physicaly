/*
    Physicaly
    A tool which let us it easy to understand physical phenomena.
    
    (C)2019 Soruto Project, MIT LICENSED.
*/

var $$ = function (e) {
    var el = document.querySelectorAll(e);
    if (el.length == 1) {
        return el[0];
    } else {
        return el;
    }
}

let physicaly = {
    "workspace": null,
    "xhr": function (path, callBackFn) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onreadystatechange = function () {
            // 本番用
            if (xhr.readyState === 4 && xhr.status === 200) {
                callBackFn(xhr.responseText);
            }
            // ローカルファイル用
            if (xhr.readyState === 4 && xhr.status === 0) {
                callBackFn(xhr.responseText);
            }
        };
        xhr.send(null);
    },
    "loadToolboxXml": function () {
        physicaly.xhr("./component/physicaly.toolbox.xml", function (res) {
            physicaly.workspace = Blockly.inject("blocklyDiv", {
                toolbox: res
            });
        });
    },
    "run": function () {
        Blockly.JavaScript.addReservedWords('code');
        var code = Blockly.JavaScript.workspaceToCode(physicaly.workspace);
        //console.log(code);
        eval(code);
    },
    "import": function (xml_text) {
        var xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, physicaly.workspace);
    },
    "export": function () {
        var xml = Blockly.Xml.workspaceToDom(physicaly.workspace);
        var xml_text = Blockly.Xml.domToText(xml);
        return xml_text;
    },
    "switchMode": function (mode) {
        if(document.body.clientWidth > 1000) return false;
        var contents = $$("#content > div");
        for (var i = 0; i < contents.length; i++) {
            contents[i].className = "hide";
        }

        $$("#content > #" + mode).className = "show";
    },
    "matter": {
        "init": function () {
            $$("#main").innerHTML = "";
            if (physicaly.matter.bodies.length !== 0 && Matter.World) {
                physicaly.matter.bodies = [];
            }
            /*Matter js オブジェクト群を定義*/
            Engine = Matter.Engine;
            World = Matter.World;
            Bodies = Matter.Bodies;
            Render = Matter.Render;
            Runner = Matter.Runner;

            //エンジン作成
            engine = Engine.create();
            world = engine.world;

            var render = Render.create({
                element: $$("#main"),
                engine: engine,
                options: {
                    wireframes: false,
                    width: 500,
                    height: 500
                }
            });

            Render.run(render);

        },
        "makeBody": function (type, x, y, width, height, isStatic, color) {
            if (Bodies) {
                var defineBody = Bodies[type](x, y, width, height, {
                    isStatic: isStatic,
                    render: {
                        fillStyle: color
                    }
                });

                physicaly.matter.bodies.push(defineBody);
            }
        },
        //図形は全部この中に保存しておく
        bodies: [],
        pushBodies: function () {
            if (physicaly.matter.bodies !== null) {
                World.add(world, physicaly.matter.bodies);
                runner = Runner.create();
                Runner.run(runner, engine);
            }
        }
    }
}

window.onload = function () {
    physicaly.loadToolboxXml();
    tippy("#playButton", {
        content: "実行する"
    });
    tippy("#switchMode", {
        content: "画面を切り替える"
    });
    tippy("#openFile", {
        content: "プロジェクトを開く"
    });
    tippy("#saveFile", {
        content: "プロジェクトを保存する"
    });
    $$("#switchMode").addEventListener("click", function () {
        if(document.body.clientWidth > 1000) return false;
        var blocklyClass = $$("#blocklyDiv").className;
        if (blocklyClass === "show") {
            $$("#blocklyDiv").className = "hide";
            $$("#matterjsDiv").className = "show";
        } else {
            $$("#blocklyDiv").className = "show";
            $$("#matterjsDiv").className = "hide";
        }
    });

    $$("#playButton").addEventListener("click", function () {
        physicaly.switchMode("matterjsDiv");
        physicaly.run();
    });

    $$("#openFile").addEventListener("click", function () {
        $$("#openFileInput").click();
    });

    $$("#openFileInput").addEventListener("change", function (e) {
        var files = e.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", function () {
            physicaly.import(reader.result);
        });
    });

    $$("#saveFile").addEventListener("click", function () {
        // ダウンロードしたいコンテンツ、MIMEType、ファイル名
        var content = physicaly.export();
        var mimeType = 'application/xml';
        var name = prompt("ダウンロードするファイルの名前を入力してください。\n拡張子は必要ありません。");
        
        if(name === null) return false;
        else name+= ".psl";//拡張子を付与
        // BOMは文字化け対策
        var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var blob = new Blob([bom, content], {
            type: mimeType
        });

        var a = document.createElement('a');
        a.download = name;
        a.target = '_blank';

        if (window.navigator.msSaveBlob) {
            // for IE
            window.navigator.msSaveBlob(blob, name)
        } else if (window.URL && window.URL.createObjectURL) {
            // for Firefox
            a.href = window.URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else if (window.webkitURL && window.webkitURL.createObject) {
            // for Chrome
            a.href = window.webkitURL.createObjectURL(blob);
            a.click();
        } else {
            // for Safari
            window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
        }
    })
}

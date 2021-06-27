// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDnQWu3iIQ1wtQaSqOSECb9zwN1l3KerCU",
    authDomain: "gsdemo-73ced.firebaseapp.com",
    projectId: "gsdemo-73ced",
    storageBucket: "gsdemo-73ced.appspot.com",
    messagingSenderId: "921699418572",
    appId: "1:921699418572:web:6bacd3ee477eb9b1ea9d69"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Firebaseの為に別途追加
const ref = firebase.database().ref();

// _______________________________________
//キャラクターの定義
const regoshi = '<img src="./imgs/1.regoshi.png">';
const haru = '<img src="./imgs/2.haru.png">';
const rui = '<img src="./imgs/3.rui.png">';
const juno = '<img src="./imgs/4.juno.png">';
const jack = '<img src="./imgs/5.jack.png">';
const gohin = '<img src="./imgs/6.gohin.png">';
const mayor = '<img src="./imgs/7.mayor.png">';
const ibuki = '<img src="./imgs/8.ibuki.png">';
const flee = '<img src="./imgs/9.flee.png">';
const pina = '<img src="./imgs/10.pina.png">';
const rokume = '<img src="./imgs/11.rokume.png">';
const lizu = '<img src="./imgs/12.lizu.png">';

// オブジェクトに戻して取得
let object = JSON.parse(localStorage.getItem("name"));

//送信イベント //Keyを押したら入力できる
$("#text").keydown(function enter(){
    if(window.event.keyCode == 13){
        const text = $("#text").val();
        const msg = {
            uname: object.yourname,
            text: text
        };
        if(text == ""){ //コメントが入力されていなかったらエラー
            alert("Please write something!");
            return false;   
        }else{
            ref.push(msg); //サーバーに送信処理
            const reflesh = $("#text").val(""); //テキストを送信したら消える
            $("#text").append(reflesh)
            $("#text").clear();
        }
    }
});

//送信イベント //sendボタンを押したら入力できる
$("#send").on("click",function(){
    const text = $("#text").val();
    const msg = {
        uname: object.yourname,
        text: text
    };
    if(text == ""){ //コメントが入力されていなかったらエラー
        alert("Please write something!");
        return false;   
    }else{
        ref.push(msg); //サーバーに送信処理
        const reflesh = $("#text").val(""); //テキストを送信したら消える
        $("#text").append(reflesh)
        $("#text").clear();
    }
});

//受信イベント
ref.on("child_added",function(data){
    const v = data.val(); //firebaseからオブジェクト変数を取得可能
    const k = data.key; //UniqueKEY: データベース参照
    if(v.role == "Dealer" || v.role == "Carnivore" || v.role == "Herbivore"){ //Entry画面で設定した5playersのfirebaseのデータは非表示
        return false;

    }else if(v.uname == object.yourname){ //自分のコメントを右側に配列
        const k = //コメント欄のhtml
        '<div id="mysentence_all"><div id="mysentence_wrap"><div id="mysentence">'+v.text+'</div></div></div>';
        $("#output").append(k);

    }else{ //自分以外のコメントを左側に配列
        const h = //コメント欄のhtml
        '<div id="name">'+v.uname+'</div><div id="sentence_wrap"><div id="sentence">'+v.text+'</div></div>';
        $("#output").append(h);

    }

    //自動スクロール機能を追加
    $('#output').animate({scrollTop: $('#output')[0].scrollHeight},"fast");
});

//自分の役割を表示
$("#importance").append(object.role)

//お題の配列
const question = ["自由の女神", "三菱商事", "狼", "信号機", "郵便ポスト", "北海道", "新垣結衣", "傘", "スイカ", "オムライス"]

//お題を表示
const z = Math.floor(Math.random()*question.length);
const question_now = question[z];
if(object.role == "Herbivore"){
    $("#question").append("???")
}else{
    $("#question").append(question_now)
}

//firebaseに登録されているキャラクターを表示
ref.on("child_added",function(data){
    const v = data.val(); //firebaseからオブジェクト変数を取得可能
    if(v.character == "regoshi"){
        $("#answer_a").append('<div>'+v.yourname+'</div><div>'+regoshi+'</div>'); 
    }if(v.character == "haru"){
        $("#answer_b").append('<div>'+v.yourname+'</div><div>'+haru+'</div>');
    }if(v.character == "rui"){
        $("#answer_c").append('<div>'+v.yourname+'</div><div>'+rui+'</div>');
    }if(v.character == "juno"){
        $("#answer_d").append('<div>'+v.yourname+'</div><div>'+juno+'</div>');
    }if(v.character == "jack"){
        $("#answer_e").append('<div>'+v.yourname+'</div><div>'+jack+'</div>');
    }if(v.character == "gohin"){
        $("#answer_f").append('<div>'+v.yourname+'</div><div>'+gohin+'</div>');
    }if(v.character == "mayor"){
        $("#answer_g").append('<div>'+v.yourname+'</div><div>'+mayor+'</div>');
    }if(v.character == "ibuki"){
        $("#answer_h").append('<div>'+v.yourname+'</div><div>'+ibuki+'</div>');
    }if(v.character == "flee"){
        $("#answer_i").append('<div>'+v.yourname+'</div><div>'+flee+'</div>');
    }if(v.character == "pina"){
        $("#answer_j").append('<div>'+v.yourname+'</div><div>'+pina+'</div>');
    }if(v.character == "rokume"){
        $("#answer_k").append('<div>'+v.yourname+'</div><div>'+rokume+'</div>');
    }if(v.character == "lizu"){
        $("#answer_l").append('<div>'+v.yourname+'</div><div>'+lizu+'</div>');
    }
});

//最終結果を取得
ref.on("child_added",function(data){
    const v = data.val(); //firebaseからオブジェクト変数を取得可能
    $("#getResult").on("click",function(){
        check_a = document.form2.answer_a_input.checked;
        check_b = document.form2.answer_b_input.checked;
        check_c = document.form2.answer_c_input.checked;
        check_d = document.form2.answer_d_input.checked;
        check_e = document.form2.answer_e_input.checked;
        check_f = document.form2.answer_f_input.checked;
        check_g = document.form2.answer_g_input.checked;
        check_h = document.form2.answer_h_input.checked;
        check_i = document.form2.answer_i_input.checked;
        check_j = document.form2.answer_j_input.checked;
        check_k = document.form2.answer_k_input.checked;
        check_l = document.form2.answer_l_input.checked;
        if(check_a == true && v.character == "regoshi"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_b == true && v.character == "haru"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_c == true && v.character == "rui"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_d == true && v.character == "juno"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_e == true && v.character == "jack"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_f == true && v.character == "gohin"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_g == true && v.character == "mayor"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_h == true && v.character == "ibuki"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_i == true && v.character == "flee"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_j == true && v.character == "pina"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_k == true && v.character == "rokume"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
        if(check_l == true && v.character == "lizu"){
            if(v.role == "Carnivore"){
                alert("正解!!");
            }else{
                alert("残念。不正解...");
            }
        }
    });
});



//to do 

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
//characterの定義
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

//roleの定義：1=Dealer, 2=Carnivore, 3,4,5=Herbivore
const player_role = ["Dealer", "Carnivore", "Herbivore", "Herbivore", "Herbivore"];

//JASONの設定
let object = {
    yourname : "",
    character : "",
    role : ""
}

//キャラクターが選択されているかを判別する関数
function checkImages(){
check_a = document.form1.image_a_input.checked;
check_b = document.form1.image_b_input.checked;
check_c = document.form1.image_c_input.checked;
check_d = document.form1.image_d_input.checked;
check_e = document.form1.image_e_input.checked;
check_f = document.form1.image_f_input.checked;
check_g = document.form1.image_g_input.checked;
check_h = document.form1.image_h_input.checked;
check_i = document.form1.image_i_input.checked;
check_j = document.form1.image_j_input.checked;
check_k = document.form1.image_k_input.checked;
check_l = document.form1.image_l_input.checked;
}

//キャラクターの選択をするとJSONに登録される
function onRadioButtonChange(){
    checkImages();
    if(check_a == true){
        object.character = "regoshi";        
    }
    else if(check_b == true){
        object.character = "haru";
    }
    else if(check_c == true){
        object.character = "rui";
    }
    else if(check_d == true){
        object.character = "juno";
    }
    else if(check_e == true){
        object.character = "jack";
    }
    else if(check_f == true){
        object.character = "gohin";
    }
    else if(check_g == true){
        object.character = "mayor";
    }
    else if(check_h == true){
        object.character = "ibuki";
    }
    else if(check_i == true){
        object.character = "flee";
    }
    else if(check_j == true){
        object.character = "pina";
    }
    else if(check_k == true){
        object.character = "rokume";
    }
    else if(check_l == true){
        object.character = "lizu";
    }
};

//名前とキャラクターを選択完了しデータベースに登録するアクション
$("#register").on("click",function(){
    checkImages();
    const value = $("#yourname").val();
    if(value == ""){ //名前が入力されていなかったらエラー
        alert("Please type your name!");
        return false;

    }else if(check_a == true || check_b == true || check_c == true || check_d == true || check_e == true || check_f == true || check_g == true || check_h == true || check_i == true || check_j == true || check_k == true || check_l == true){
        //各プレイヤーにroleを振分け
        const r = Math.floor(Math.random()*player_role.length);
        const role = player_role.splice(r,1);
        object.role = role[0];
        object.yourname = value;  
        ref.push(object); //サーバーに送信処理

        // 入力したname/character/roleをlocalStorageに記憶
        console.log(object); //確認用
        localStorage.setItem("name",JSON.stringify(object));

    }else{ //キャラクターが選択されていなかったらエラー
        alert("Please select your character!");
        return false;
    }

    //一つ登録設定したら入力されていた名前を削除
    document.getElementById("yourname").value = "";
});

//ゲームに進む際のアクション
function OnLinkClick(){
    target = document.getElementById("background");
        // ゲームが開始される瞬間にchat画面に*__注意書き__*が表示
        const msg = {
            uname: "",
            text: "***********************ゲーム開始!***********************"
        };
        ref.push(msg);
}

//Playerの参加人数
let array = []

//Playerの参加可能残り人数
let player = 5;

//firebaseにキャラクターが登録されたらregisterに表示
ref.on("child_added",function(data){
    const v = data.val(); //firebaseからオブジェクト変数を取得可能
    if(v.character == "regoshi"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+regoshi+'</div></li>').hide().fadeIn(500)
        $("#image_a").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "haru"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+haru+'</div></li>').hide().fadeIn(500)
        $("#image_b").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "rui"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+rui+'</div></li>').hide().fadeIn(500)
        $("#image_c").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "juno"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+juno+'</div></li>').hide().fadeIn(500)
        $("#image_d").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "jack"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+jack+'</div></li>').hide().fadeIn(500)
        $("#image_e").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "gohin"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+gohin+'</div></li>').hide().fadeIn(500)
        $("#image_f").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "mayor"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+mayor+'</div></li>').hide().fadeIn(500)
        $("#image_g").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "ibuki"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+ibuki+'</div></li>').hide().fadeIn(500)
        $("#image_h").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "flee"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+flee+'</div></li>').hide().fadeIn(500)
        $("#image_i").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "pina"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+pina+'</div></li>').hide().fadeIn(500)
        $("#image_j").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "rokume"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+rokume+'</div></li>').hide().fadeIn(500)
        $("#image_k").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }if(v.character == "lizu"){
        $("#waiting").append('<li class="waiting_space"><div>'+v.yourname+'</div><div>'+lizu+'</div></li>').hide().fadeIn(500)
        $("#image_l").fadeOut(500); //選択したキャラクターは使えなくする
        array.push("!");
        player--;
    }

    //残り参加人数の表示
    $("#count").html(player+" ");
    
    console.log(array.length); //確認用
    //5人揃ったらゲームスタート
    if(array.length == 5){
        $("#image_a").fadeOut(500);
        $("#image_b").fadeOut(500);
        $("#image_c").fadeOut(500);
        $("#image_d").fadeOut(500);
        $("#image_e").fadeOut(500);
        $("#image_f").fadeOut(500);
        $("#image_g").fadeOut(500);
        $("#image_h").fadeOut(500);
        $("#image_i").fadeOut(500);
        $("#image_j").fadeOut(500);
        $("#image_k").fadeOut(500);
        $("#image_l").fadeOut(500);
        $("#ppp").fadeOut(500);
        window.setTimeout(function(){ //
            $("#character_select").html('<a href="./beastars_main.html" id="background" onclick="OnLinkClick();"><img src="./imgs/background.jpg" id="background_image"><div id="ready">Click to start!</div></a>').hide().fadeIn(500)
        },510);
    }
});

// To do
//fiebaseのデータを全消去する

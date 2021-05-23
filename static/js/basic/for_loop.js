const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function change_all(){
    document.getElementById("code1").style.color = "black";
    document.getElementById("code2").style.color = "black";
    document.getElementById("code3").style.color = "black";
    document.getElementById("code4").style.color = "black";
    document.getElementById("code5").style.color = "black";
    document.getElementById("code6").style.color = "black";
}

async function change_all_exp(){
    document.getElementById("ex1").style.color = "#F4A460";
    document.getElementById("ex2").style.color = "#F4A460";
    document.getElementById("ex3").style.color = "#F4A460";
    document.getElementById("ex4").style.color = "#F4A460";
    document.getElementById("ex5").style.color = "#F4A460";
    document.getElementById("ex6").style.color = "#F4A460";
    document.getElementById("ex7").style.color = "#F4A460";
    document.getElementById("ex8").style.color = "#F4A460";
    document.getElementById("ex9").style.color = "#F4A460";
    document.getElementById("ex10").style.color = "#F4A460";
}

async function change_sel(gg){
    document.getElementById(gg).style.color = "blue";
    await sleep(1000);
    change_all();
}

async function for_loop(){
    var i,len = 10;
    var ans = 0;
    var s = "";
    var name = "";
    var num = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    change_all();
    document.getElementById("code1").style.color = "blue";
    s = "定义变量ans="+ans;
    document.getElementById("explain").innerHTML = s;
    await sleep(1000);

    for(i=1;i<=10;i++){

        change_all();
        document.getElementById("code2").style.color = "blue";
        s = "判断是否满足for循环条件";
        document.getElementById("explain").innerHTML = s;
        s = "i 的值为：" + i;
        document.getElementById("value-i").innerHTML = s;
        await sleep(1000);

        ans = ans+num[i-1];

        change_all();
        document.getElementById("code3").style.color = "blue";
        s = "执行ans=ans+"+num[i-1];
        document.getElementById("explain").innerHTML = s;
        s = "ans 的值为：" + ans;
        document.getElementById("value-ans").innerHTML = s;

        name = "code"+1;
        change_all_exp();
        if(i==1)
            document.getElementById("ex1").style.color = "black";
        else if(i==2)
            document.getElementById("ex2").style.color = "black";
        else if(i==3)
            document.getElementById("ex3").style.color = "black";
        else if(i==4)
            document.getElementById("ex4").style.color = "black";
        else if(i==5)
            document.getElementById("ex5").style.color = "black";
        else if(i==6)
            document.getElementById("ex6").style.color = "black";
        else if(i==7)
            document.getElementById("ex7").style.color = "black";
        else if(i==8)
            document.getElementById("ex8").style.color = "black";
        else if(i==9)
            document.getElementById("ex9").style.color = "black";
        else if(i==10)
            document.getElementById("ex10").style.color = "black";

        await sleep(1000);

        change_all();
        document.getElementById("code4").style.color = "blue";
        s = "输出ans=" + ans;
        document.getElementById("explain").innerHTML = s;
        await sleep(1000);
    }

    change_all();
    document.getElementById("code2").style.color = "blue";
    s = "判断是否满足for循环条件";
    document.getElementById("explain").innerHTML = s;
    s = "i 的值为：" + i;
    document.getElementById("value-i").innerHTML = s;
    await sleep(1000);

    change_all();
    document.getElementById("code6").style.color = "blue";
    s = "输出ans=" + ans;
    document.getElementById("explain").innerHTML = s;
    await sleep(1000);

    change_all();
    document.getElementById("explain").innerHTML = "结束";
    await sleep(1000);
}

function stop_for_loop(){
    location.reload();
}
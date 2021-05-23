const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var count = 0;
var Graph = new Object();
Graph.Squares = new Array();
var now_div = null;
var st_div = null;
var ed_div = null;
var n;
var m;
var stx;
var sty;
var edx;
var edy;
var maze = new Array();
var book = new Array();
var next_t=[[-1,0],[0,1],[1,0],[0,-1]];
var find_ed=0;

var step=0;
var square_step = new Array();
var code_step = new Array();
var explain_step = new Array();

async function change_all(){
    document.getElementById("code1").style.color = "black";
    document.getElementById("code2").style.color = "black";
    document.getElementById("code3").style.color = "black";
    document.getElementById("code4").style.color = "black";
    document.getElementById("code5").style.color = "black";
    document.getElementById("code6").style.color = "black";
    document.getElementById("code7").style.color = "black";
    document.getElementById("code8").style.color = "black";
    document.getElementById("code9").style.color = "black";
    document.getElementById("code10").style.color = "black";
    document.getElementById("code11").style.color = "black";
    document.getElementById("code12").style.color = "black";
}

function _add_square(square){
	var V = new Object();
	V.element = square;
	V.Adj = new Array();
	Graph.Squares.push(V);
}

Graph.add_square = _add_square;

function get_graph_square(div){
    var i;
	for(i=0; i < Graph.Squares.length; i++)
	{
		if (Graph.Squares[i].element.id == div.id)
		{
			return Graph.Squares[i];
		}
	}
}

function change_wall(div){
    var i;
    for(i=0;i<Graph.Squares.length;i++){
        if(Graph.Squares[i].element.id==div.id){
            if(Graph.Squares[i].element.flag==0){
                Graph.Squares[i].element.flag=1;
                Graph.Squares[i].element.style.backgroundColor = "black";
            }else if(Graph.Squares[i].element.flag==1){
                if(ed_div==null){
                    Graph.Squares[i].element.flag=2;
                    Graph.Squares[i].element.style.backgroundColor = "red";
                    ed_div = div;
                }else if(st_div==null){
                    Graph.Squares[i].element.flag=3;
                    Graph.Squares[i].element.style.backgroundColor = "blue";
                    st_div = div;
                }else{
                    Graph.Squares[i].element.flag=0;
                    Graph.Squares[i].element.style.backgroundColor = "white";
                }
            }else if(Graph.Squares[i].element.flag==2){
                if(st_div==null){
                    Graph.Squares[i].element.flag=3;
                    Graph.Squares[i].element.style.backgroundColor = "blue";
                    st_div = div;
                    if(ed_div==div){
                        ed_div=null;
                    }
                }else{
                    Graph.Squares[i].element.flag=0;
                    Graph.Squares[i].element.style.backgroundColor = "white";
                    if(ed_div==div){
                        ed_div=null;
                    }
                }
            }else{
                if(st_div==div){
                    st_div=null;
                }
                Graph.Squares[i].element.flag=0;
                Graph.Squares[i].element.style.backgroundColor = "white";
            }
            break;
        }
    }
}

function change_st_ed(){
    now_div = this;
    if(now_div != null){
        change_wall(now_div);
    }
    now_div = null;
}

async function make_maze(){
    m = document.getElementById("source1").value;
    n = document.getElementById("source2").value;
    var i;
    var j;
    for(i = 1; i <= n; i++){
        for(j = 1; j <= m; j++){

            count = count + 1;

            var x = 100 + 40 * (j-1);   //横坐标
            var y = 80 + 40 * (i-1);   //纵坐标

            var div = document.createElement("div");


            div.style.zIndex = "2";
            div.style.position = "absolute";
            div.id = count;


            div.style.backgroundColor = "white";
            div.style.border = "2px solid #404040";
            div.style.color = "black";
            div.style.transitionProperty = "background-color";
            div.style.transitionDuration = "1s";

            div.style.height = "40px";
            div.style.width = "40px";

            div.style.marginLeft = x + "px";
            div.style.marginTop = y + "px";
            div.flag = 0;

            div.addEventListener("click",change_st_ed);

            document.getElementById("canvas").appendChild(div);

            Graph.add_square(div);

        }
    }
    for(i=1;i<=n;i++){
        var x = 55;
        var y = 80 + 40 * (i - 1);
        var div = document.createElement("div");
	    var div_text = document.createElement("p");
	    count = count + 1
	    div.style.zIndex = "2";
	    div.style.position = "absolute";
	    div.id = count;
	    div_text.innerHTML = i - 1;
	    div_text.style.position = "relative";
	    div_text.style.marginLeft = "13px";
	    div_text.style.marginTop = "5px";
	    div.style.backgroundColor = "#F4A460";
	    div.style.border = "2px solid #F4A460";
	    div.style.color = "black";
	    div.style.transitionProperty = "black";
	    div.style.transitionDuration = "1s";
	    div.style.height = "40px";
	    div.style.width = "40px";
	    div.style.marginLeft = x + "px";
	    div.style.marginTop = y + "px";
	    div.appendChild(div_text);
	    document.getElementById("canvas").appendChild(div);
    }
    for(i=1;i<=m;i++){
        var x = 100 + 40 * (i-1);
        var y = 35;
        var div = document.createElement("div");
	    var div_text = document.createElement("p");
	    count = count + 1
	    div.style.zIndex = "2";
	    div.style.position = "absolute";
	    div.id = count;
	    div_text.innerHTML = i - 1;
	    div_text.style.position = "relative";
	    div_text.style.marginLeft = "13px";
	    div_text.style.marginTop = "5px";
	    div.style.backgroundColor = "#F4A460";
	    div.style.border = "2px solid #F4A460";
	    div.style.color = "black";
	    div.style.transitionProperty = "black";
	    div.style.transitionDuration = "1s";
	    div.style.height = "40px";
	    div.style.width = "40px";
	    div.style.marginLeft = x + "px";
	    div.style.marginTop = y + "px";
	    div.appendChild(div_text);
	    document.getElementById("canvas").appendChild(div);
    }
}

function add_square_step(loc, val_0, val_1){
    square_step[loc] = new Array();
    square_step[loc][0] = val_0;
    square_step[loc][1] = val_1;
}

function add_code_step(loc, val_0, val_1){
    code_step[loc] = new Array();
    code_step[loc][0] = val_0;
    code_step[loc][1] = val_1;
}

function add_explain_step(loc,val){
    explain_step[loc] = val;
}

async function DFS_visit(x,y){

    if(find_ed==1){
        return;
    }

    var ss = "(" + x + "," + y + ")";
    add_square_step(step,x*m+y+1,-1);
    add_code_step(step,3,1);
    add_explain_step(step,"判断当前"+ss+"坐标是否在范围内");
    step = step + 1;
    if(x<0 || y<0 || x>=n || y>=m) return;

    add_square_step(step,x*m+y+1,-1);
    add_code_step(step,4,1);
    add_explain_step(step,"判断当前"+ss+"坐标是否已经走过或是否为墙壁");
    step = step + 1;
    if(book[x][y]==1 || maze[x][y]==1) return;

    add_square_step(step,x*m+y+1,1);
    add_code_step(step,10,-1);
    add_explain_step(step,"当前坐标块可以走");
    step = step + 1;

    add_square_step(step,x*m+y+1,-1);
    add_code_step(step,5,1);
    add_explain_step(step,"判断当前"+ss+"坐标是否为终点");
    step = step + 1;

    if(x==edx && y==edy){
        find_ed=1;

        add_square_step(step,x*m+y+1,-1);
        add_code_step(step,6,1);
        add_explain_step(step,"输出finish！");
        step = step + 1;
        add_square_step(step,x*m+y+1,-1);
        add_code_step(step,7,1);
        add_explain_step(step,"结束程序");
        step = step + 1;

        return;
    }

    var i;

    book[x][y]=1;



    for(i=0;i<4;i++){
        DFS_visit(x+next_t[i][0],y+next_t[i][1]);
    }

    if(find_ed==1) return;

    book[x][y]=0;

    add_square_step(step,x*m+y+1,0);
    add_code_step(step,10,-1);
    add_explain_step(step,"返回上一层函数");
    step = step + 1;


    return;
}

async function show(){
    var i;
    var j;
    for(i=0;i<step;i++){

        for(j=0;j<Graph.Squares.length;j++){
            if(Graph.Squares[j].element.id==square_step[i][0]){
                if(square_step[i][1]!=-1){
                    if(square_step[i][1]==1){
                        Graph.Squares[j].element.style.backgroundColor = "green";
                    }else{
                        Graph.Squares[j].element.style.backgroundColor = "white";
                    }
                }

                if(code_step[i][1]!=-1){
                    var code_id = "code"+code_step[i][0];
                    change_all();
                    document.getElementById(code_id).style.color = "blue";
                }

                if(explain_step[i]!=""){
                    document.getElementById('explain').innerHTML = explain_step[i];
                }

                await sleep(800);
            }
        }

    }
}


function DFS(){
    if(st_div != null && ed_div != null){
        var i;
        var j;
        var loc = 0;
        find_ed = 0;
        for(i=0;i<n;i++){
            maze[i] = new Array();
            book[i] = new Array();
            for(j=0;j<m;j++){
                maze[i][j] = Graph.Squares[loc].element.flag;
                book[i][j] = 0;
                loc = loc + 1
                if(maze[i][j]==3){
                    stx = i;
                    sty = j;
                }
                if(maze[i][j]==2){
                    edx = i;
                    edy = j;
                }
            }
        }
        DFS_visit(stx,sty);
        show();
    }else{
        alert("请补全起点终点！");
    }
}

function CleanCanvas(){
	location.reload();
}
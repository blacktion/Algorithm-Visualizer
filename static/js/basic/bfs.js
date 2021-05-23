window.addEventListener("load", foo);

function foo(){
	document.getElementById("canvas").addEventListener("dblclick", create_vertex);
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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
}

var count = 0;

var ss="";

var Graph = new Object();
Graph.Vertices = new Array();
Graph.Edges = new Array();

function _add_vertex(vertex){
	var V = new Object();
	V.element = vertex;
	V.Adj = new Array();
	Graph.Vertices.push(V);
}


function _add_edge(origin,endpoint,line){
	edge = new Object();
	edge.origin = origin;
	edge.endpoint = endpoint;
	edge.line = line;
	Graph.Edges.push(edge);

	s = get_graph_vertex(origin);
	d = get_graph_vertex(endpoint);

	if (check_duplicates_in_Adj(s,d))
	{
		if(document.getElementById("Directed").checked){
			s.Adj.push(d);
		}

		else if(document.getElementById("Undirected").checked){
			s.Adj.push(d);
			d.Adj.push(s);
		}
	}

	else
	{
		alert("边已经存在了, 不能创建多条！");
		line.parentNode.removeChild(line);
	}

}


function check_duplicates_in_Adj(u,v){
	var i;
	var j;
	for(i=0; i < Graph.Vertices.length; i++)
	{
		for(j=0; j < Graph.Vertices.length; j++)
		{
			if (Graph.Vertices[i] == u && Graph.Vertices[i].Adj[j] == v)
			{
				return false;
			}
		}
	}
	return true;
}


function get_graph_vertex(div){
	var i;
	for(i=0; i < Graph.Vertices.length; i++)
	{
		if (Graph.Vertices[i].element.id == div.id)
		{
			return Graph.Vertices[i];
		}
	}
}

function _show_edges(){
	var i;
	for(i=0; i < this.Edges.length; i++)
	{
		alert(this.Edges[i].line.id);
	}
}

function _show_vertices(){
	var i;
	var j;
	var s = "";
	for(i=0; i < this.Vertices.length; i++)
	{
		s = s + this.Vertices[i].element.id + " : ";
		for(j=0; j< this.Vertices[i].Adj.length; j++)
		{
			s = s + this.Vertices[i].Adj[j].element.id + "--";
		}
		s = s + "\n";
	}
	alert(s);
}


Graph.add_vertex = _add_vertex;
Graph.add_edge = _add_edge;
Graph.show_vertices = _show_vertices;
Graph.show_edges = _show_edges;

//样式部分

var start_x = null;
var start_y = null;
var start_div = null;

var end_x = null;
var end_y = null;
var end_div = null;

function create_vertex(e){
	x = parseInt(e.clientX);
	x = x - 237;
	y = parseInt(e.clientY);
	y = y - 97;


	var div = document.createElement("div");
	var div_text = document.createElement("p");

	count = count + 1

	div.style.zIndex = "2";
	div.style.position = "absolute";
	div.id = count;
	div_text.innerHTML = count;
	div_text.style.position = "relative";
	div_text.style.marginLeft = "15px";
	div_text.style.marginTop = "10px";
	div.style.backgroundColor = "white";
	div.style.border = "2px solid #404040";
	div.style.borderRadius = "50%";
	div.style.color = "black";
	div.style.transitionProperty = "background-color";
	div.style.transitionDuration = "1s";

	div.style.height = "40px";
	div.style.width = "40px";

	div.style.marginLeft = x + "px";
	div.style.marginTop = y + "px";

	div.appendChild(div_text);

	div.addEventListener("mousedown", get_origin_coordinates);
	div.addEventListener("mouseup", get_destination_coordinates);

	document.getElementById("canvas").appendChild(div);

	Graph.add_vertex(div);
}

function get_origin_coordinates(){
	start_x = parseInt(this.style.marginLeft) + 20;
	start_y = parseInt(this.style.marginTop) + 20;
	start_div = this;
}

function get_destination_coordinates(){
	end_x = parseInt(this.style.marginLeft) + 20;
	end_y = parseInt(this.style.marginTop) + 20;
	end_div = this;

	if(start_x != null && start_y != null && end_x != null && end_y != null)
	{
		createLine(start_div,end_div, start_x, start_y, end_x, end_y);
	}

	start_x = null;
	start_y = null;
	end_x = null;
	end_y = null;
	start_div = null;
	end_div = null;
}

function createLine(start_div, end_div, x1, y1, x2, y2){

	var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	var transform = 'rotate('+angle+'deg)';

	var line = document.createElement("div");

	if(document.getElementById("Directed").checked){
		line.className = "directedLine";
	}

	else{
		line.className = "undirectedLine";
	}

	line.id = "edge_" + start_div.id + "_" + end_div.id;

	line.style.position = "absolute";
	line.style.transform = transform;
	line.style.width = length;
	line.style.marginLeft = x1;
	line.style.marginTop = y1;


	document.getElementById("canvas").appendChild(line);

	Graph.add_edge(start_div,end_div,line);
}

//bfs部分
var Queue = new Object();
Queue._data= new Array();
Queue.front = 0;
Queue.rear = 0;

function _enqueue(vertex){
	this._data.push(vertex);
	this.rear = this.rear + 1;
}

function _dequeue(){
	dequeued = this._data[this.front];
	this._data[this.front] = null;
	this.front = this.front + 1;
	return dequeued;
}

function _is_empty(){
	return this.front == this.rear;
}


Queue.enqueue = _enqueue;
Queue.dequeue = _dequeue;
Queue.is_empty = _is_empty;
Queue.disp = _disp;


async function BFS(){

	var BFS_counter = 0;
	var s;

	s = get_source_vertex(document.getElementById("source").value)
	s.element.style.backgroundColor = "#1aff8d";


    change_all();
    document.getElementById("code1").style.color = "blue";
    ss = "建立队列que"
    document.getElementById("explain").innerHTML = ss;
    await sleep(1000);
	Queue.enqueue(s);

	while(!Queue.is_empty())
	{
		u = Queue.dequeue();
		change_all();
        document.getElementById("code3").style.color = "blue";
        ss = "取now_node("+u.element.id+"结点)为队列头元素";
        document.getElementById("explain").innerHTML = ss;
        await sleep(1000);

		var j;

		change_all();
        document.getElementById("code4").style.color = "blue";
        ss = "进入for循环，判断是否满足循环条件"
        document.getElementById("explain").innerHTML = ss;
        await sleep(1000);

		for(j=0; j < u.Adj.length; j++)
		{

			v = u.Adj[j];
			if(v.element.style.backgroundColor == "white")
			{
				BFS_counter = BFS_counter + 1;
				Queue.enqueue(v);

				color_edge(u,v,BFS_counter);	//To color the edge just discovered

				change_all();
                document.getElementById("code5").style.color = "blue";
                ss = "将"+v.element.id+"结点压入到队列尾";
                document.getElementById("explain").innerHTML = ss;
                await sleep(1000);

				//v.element.style.transitionDelay = BFS_counter + "s";
				v.element.style.backgroundColor = "#1aff8d";

				change_all();
                document.getElementById("code6").style.color = "blue";
                ss = "输出显示结点的值"+v.element.id;
                document.getElementById("explain").innerHTML = ss;
                await sleep(1000);
			}
		}
		change_all();
        document.getElementById("code8").style.color = "blue";
        ss = "将队列头("+u.element.id+"结点)弹出队列";
        document.getElementById("explain").innerHTML = ss;
        await sleep(1000);
	}
	change_all();
    ss = "结束"
    document.getElementById("explain").innerHTML = ss;
    await sleep(1000);
}


async function color_edge(source,endpoint,count)
{
	var i;
	for(i=0; i < Graph.Edges.length; i++)
	{
		if((Graph.Edges[i].origin.id == source.element.id && Graph.Edges[i].endpoint.id == endpoint.element.id) || (Graph.Edges[i].origin.id == endpoint.element.id && Graph.Edges[i].endpoint.id == source.element.id))
		{
			//Graph.Edges[i].line.style.transitionDelay = count + "s";
			Graph.Edges[i].line.style.backgroundColor = "white";
			Graph.Edges[i].line.style.color = "white";

		}
	}
}


function get_source_vertex(name){
	var i;
	for(i=0; i < Graph.Vertices.length; i++)
	{
		if(Graph.Vertices[i].element.id == name)
		{
			return Graph.Vertices[i];
		}
	}

	return Graph.Vertices[0];
}


function Restart(){
	var i;
	for(i=0; i < Graph.Vertices.length; i++)
	{

		Graph.Vertices[i].element.style.transitionDelay = "0s";
		Graph.Vertices[i].element.style.backgroundColor = "white";
	}

	for(i=0; i < Graph.Edges.length; i++)
	{
		Graph.Edges[i].line.style.transitionDelay = "0s";
		Graph.Edges[i].line.style.backgroundColor = "black";
		Graph.Edges[i].line.style.color = "black";
	}
}

function CleanCanvas(){
	location.reload();
}
from dataclasses import dataclass
from flask import Flask, request, url_for, redirect, render_template, session, g


app = Flask(__name__)
app.config['SECRET_KEY'] = '20200903'


@dataclass
class User():
    id: int
    username: str
    password: str


users = [
    User(id=1, username="root", password="rootroot"),
]


@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        user = [u for u in users if u.id == session['user_id']][0]
        g.user = user


# 设定主页
@app.route("/")
def index():
    return render_template("index.html")


# 跳转主页
@app.route("/", methods=['GET', 'POST'])
def go_index():

    return render_template('index.html')


# 跳转算法概览页
@app.route("/algorithm", methods=['GET', 'POST'])
def go_algo():

    return render_template("algo_index.html")


# 跳转for循环页
@app.route("/algorithm/for_loop", methods=['GET', 'POST'])
def for_loop():

    return render_template("for_loop.html")


# 跳转dfs页
@app.route("/algorithm/dfs", methods=['GET', 'POST'])
def dfs():

    return render_template("dfs.html")


# 跳转bfs页
@app.route("/algorithm/bfs", methods=['GET', 'POST'])
def bfs():

    return render_template("bfs.html")


# 登陆页面
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 登录操作
        session.pop('user_id', None)
        username = request.form.get("username", None)
        password = request.form.get("password", None)
        user = [u for u in users if u.username == username]
        if len(user) > 0:
            user = user[0]
        if user and user.password == password:
            session['user_id'] = user.id
            return redirect(url_for('self_index'))

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect(url_for('index'))


@app.route("/self_index")
def self_index():

    return render_template("self_index.html")


# web 服务器
if __name__ == '__main__':

    app.run()





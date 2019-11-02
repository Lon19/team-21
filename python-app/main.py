from flask import Flask, render_template      

app = Flask(__name__)
app.debug = True

@app.route("/")
def home():
    return render_template("home.html")
    
@app.route('/', methods=['GET'])
def dropdown():
    colours = ['Red', 'Blue', 'Black', 'Orange']
    return render_template('home.html', colours=colours)

if __name__ == "__main__":
    app.run()

@app.route("/salvador")
def salvador():
    return "Hello, Salvador"
    
if __name__ == "__main__":
    app.run(debug=True)
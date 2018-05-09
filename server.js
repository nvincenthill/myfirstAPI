//import file system

let fs = require("fs");

//import local data (synchronous) and convert to JSON

let data = fs.readFileSync("words.json");
let words = JSON.parse(data);

let express = require("express");

let app = express();

let server = app.listen(3000, listening);

function listening() {
  console.log("listening......");
}

app.use(express.static("website"));

app.get("/add/:word/:score?", addWord);

app.get("/all", sendAll);

function addWord(request, response) {
  let data = request.params;
  let word = data.word;
  let score = data.score;
  let reply;

  if (!score) {
    reply = {
      status: "failed"
    };

    response.send(reply);
  } else {
    //assign key value pair
    words[word] = Number(score);

    let data = JSON.stringify(words, null, 2);
    fs.writeFile("words.json", data, finished);

    function finished(err) {
      console.log(finished);

      //create reply
      reply = {
        word: word,
        score: score,
        status: "success"
      };
      response.send(reply);
    }
  }
}

function sendAll(request, response) {
  response.send(words);
}

app.get("/search/:word/", searchWord);

function searchWord(request, response) {
  let word = request.params.word;
  let reply;

  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word]
    };
  } else {
    reply = {
      status: "not found",
      word: word
    };
  }

  response.send(reply);
}

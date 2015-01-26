'use strict';

var _ = require('lodash');
var Generate = require('./generate.model');
var NYTAPI = require('../nyt/nytapi');
var User = require('../user/user.model')
var nytAPI = new NYTAPI();
var AlchemyAPI = require('../alchemy/alchemyapi');
var alchemyapi = new AlchemyAPI();

function randNum(num)
{
  return Math.floor(Math.random() * num);
}

function randomSort(arr)
{
  var currentIndex = arr.length;
  var temporaryValue, randomIndex;

  while(0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
}


// function nameReplace(text, people, friends)
// {
//   var peopleIndex = [];

//   var textArr = text.split(" ");

//   for(var i = 0; i < textArr.length; i++)
//   {
//     for(var x = 0; x < people.length; x++)
//     {
//       for(var y= 0; y < people[x].length; y++)
//       {
//         if(textArr[i] == people[x][y])
//         {
//           if(checkers[textArr[i].toLowerCase()])
//           {
//             if(textArr[i+1]){i++;}
//             else{return;}
//           }
//           else
//           {
//             textArr[i] = y > 0 ? friends[friends[x].length - 1] : friends[0];
//             if(textArr[i+1]){i++;}
//             else{return;}
//           }
//         }
//       }
//     }
//   }

//   text = textArr.join(" ");
// }

// Get list of generates
exports.index = function(req, res) {
  Generate.find(function (err, generates) {
    if(err) { return handleError(res, err); }
    return res.json(200, generates);
  });
};

// Get a single generate
exports.show = function(req, res) {
  // Generate.findById(req.params.id, function (err, generate) {
  //   if(err) { return handleError(res, err); }
  //   if(!generate) { return res.send(404); }
  //   return res.json(generate);
  // });

  //var newyorksearchterms = "q=" + req.params.type + "&page=" + randNum(100) + "&api-key=";
  function newyorksearchterms(num)
  {
    return "q=" + req.params.type + "&type_of_material=news&page=" + num + "&api-key=";
  }

  function generation() 
  {
    nytAPI.search(newyorksearchterms(randNum(100)), function(content)
    {
        //console.log("content!, ", content);
        //res.json(200, content.response.docs[0]);
        // alchemyapi.text('url', content.response.docs[0].web_url, {}, function(cleanText)
        // {
        //var tempRand = randNum(10);
        var tempArr = [0,1,2,3,4,5,6,7,8,9];
        randomSort(tempArr);
        var tempDoc = content.response.docs[tempArr.shift()];

          while(tempDoc.word_count < 500)
          {
            if(!tempArr[0]){return generation();}
            tempDoc = content.response.docs[tempArr.shift()];
            
            //return generation();
          }



        var articleHeadLine = tempDoc.headline.main;
        console.log("doc info!", tempDoc);

        alchemyapi.entities('url', tempDoc.web_url, {showSourceText: 1}, function(alchemyResponse)
        {
          //console.log("response!, ", alchemyResponse);
          var article = {text: alchemyResponse.text, headline: articleHeadLine, nyurl: tempDoc.web_url};
          article.real = article.text;
          //console.log("ARTCILE LENGTH", article.text.length);

          if(article.text.length < 1500)
          {
            return generation();
          }

          var entities = alchemyResponse.entities;
          //res.json(200, response);
          User.findById(req.params.id, function(err, user){
            //console.log("user!, ", user);
            //var friends = {list: user.facebook.taggable_friends};
            var friends = [];

            for(var i = 0; i < user.facebook.taggable_friends.data.length; i++)
            {
              friends[i] = user.facebook.taggable_friends.data[i].name;
            }

            randomSort(friends);

            //console.log("user", user);
            article.name = user.name;
            friends.unshift(user.name);
            //console.log("facebook", user.facebook);

            var people = {};

            var checkers = {
              president: true,
              'mr.': true,
              'mrs.': true,
              'ms.': true,
              miss: true,
              sir: true,
              'dr.': true,
              doctor: true
              }            

            for(var key in entities)
            {
              //console.log(key, entities[key]);
              if(entities[key].type == "Person" && friends[0])
              {
                if(!Object.keys(people).length)
                {
                  var titlereg = new RegExp(entities[key].text, "g");
                  article.headline = article.headline.replace(titlereg, friends[0]);
                }
                people[entities[key].text] = friends.shift();
              }
            }

            article.headline = article.headline.replace()

            //var personFL = [];
            //var peopleFL = [];

            for(var person in people)
            {
              var check = person.split(" ")[0].toLowerCase();
              if(checkers[check])
              {
                //person.replace(/)
                var reg = new RegExp(check + "+\\s?", "g");
                var modPerson = person.replace(reg, "");
                var regTwo = new RegExp(modPerson, "g");
                article.text = article.text.replace(regTwo, people[person]);
              }
              else
              {
                var reg = new RegExp(person, "g");

                article.text = article.text.replace(reg, people[person]);
              }
            }

            for(var person in people)
            {
              var personFL = person.split(" ");
              var peopleFL = people[person].split(" ");
              //console.log("person " + personFL);
              //console.log("people " + peopleFL);

              if(checkers[personFL[0].toLowerCase()])
              {
                var middleOrLast = personFL[personFL.length - 1];

                if(personFL.length > 2)
                {
                  var reg = new RegExp(personFL[1], "g");
                  article.text = article.text.replace(reg, peopleFL[0]);
                  
                  //var middleOrLast = personFL[personFL.length - 1];
                  var count = 2;  

                  middleOrLast = "";
                  while(count < personFL.length)
                  {
                    middleOrLast += personFL[count].length > 2 ? personFL[count] + "|" : "";
                    count++;
                  }
                  middleOrLast = middleOrLast.substr(0,middleOrLast.length-1);
                }

                else
                {
                  var reg = new RegExp(personFL[0], "g");
                  article.text = article.text.replace(reg, peopleFL[0]);
                }

                reg = new RegExp(middleOrLast, "g");
                article.text = article.text.replace(reg, peopleFL[peopleFL.length - 1]);
              }

              else
              {
                var reg = new RegExp(personFL[0], "g");
                article.text = article.text.replace(reg, peopleFL[0]);
                
                var middleOrLast = personFL[personFL.length - 1];
                var count = 1;
                
                if(personFL.length > 2)
                {
                  middleOrLast = "";
                  while(count < personFL.length)
                  {
                    middleOrLast += personFL[count].length > 2 ? personFL[count] + "|" : "";
                    count++;
                  }
                  middleOrLast = middleOrLast.substr(0,middleOrLast.length-1);
                }

                reg = new RegExp(middleOrLast, "g");
                article.text = article.text.replace(reg, peopleFL[peopleFL.length - 1]);
              }
            }

            article.text = "\n" + article.text;

            var textArr = [];

            var articleTextLength = article.text.length;

            var wordcount = 0;

            while(articleTextLength > 1000)
            {
              textArr.push(article.text.substring(wordcount, wordcount+1000));
              wordcount += 1000;
              articleTextLength -= 1000;
              console.log(textArr[textArr.length - 1]);
            }

            textArr.push(article.text.substr(wordcount, article.text.length));

            article.text = textArr;

            res.json(200, article);
          })
        })
    });
  };

  generation();
}

// Creates a new generate in the DB.
exports.create = function(req, res) {
  Generate.create(req.body, function(err, generate) {
    if(err) { return handleError(res, err); }
    return res.json(201, generate);
  });
};

// Updates an existing generate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Generate.findById(req.params.id, function (err, generate) {
    if (err) { return handleError(res, err); }
    if(!generate) { return res.send(404); }
    var updated = _.merge(generate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, generate);
    });
  });
};

// Deletes a generate from the DB.
exports.destroy = function(req, res) {
  Generate.findById(req.params.id, function (err, generate) {
    if(err) { return handleError(res, err); }
    if(!generate) { return res.send(404); }
    generate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
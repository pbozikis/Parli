const turbo = require('./turbo');
const {googletrans, langs} = require("./googletrans");
const gtts  = require("gtts");
const lessons = require("./lessons2.json");

function shuffle(array) {
    let curId = array.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        [array[curId], array[randId]] = [array[randId], array[curId]];
    }
    return array;   
}

/**
 * 
 * @param {int} max 
 * @param {int} min 
 * @returns random number
 */
function rand(max, min=0)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 
 * @param {*} arr 
 * @returns Selects a random array item
 */
function choose(arr)
{
    return arr[rand(0, arr.length)];
}

/**
 * 
 * @param {*} req 
 * @returns Parsed cookie
 */
function parseCookie(req)
{
    if(req.cookie === undefined)
        return;
    const temp = req.cookie.split("&");
    req.cookie = {};
    for(let v of temp)
    {
        let cow = v.split(";")[0].split('=');
        req.cookie[cow[0]] = cow[1];
    }
}

/**
 * Function that translates lesson data and prepares it to be sent to client
 * @param {http.incomingMessage} req 
 * @param {http.serverResponse} res 
 */
function generateLesson(req, res)
{
    //Catch invalid lessons!!!
    // let lesson = lessons[req.get.lid]; //get current lesson from the get request param
    // const difficulty = require("./users.json")[req.get.cookie.token]?.difficulty[Number(req.get.lid)] || 0;
    // const basics = shuffle(lesson.Simple).slice(0, 4);
    // const meds = shuffle(lesson.Medium).slice(0, 8);
    // const hards = shuffle(lesson.Complex).slice(0, 8);//difficulty);
    // lesson = basics.concat(meds, hards);
    let lesson = generatePhrases(req.get.lid);
    let difficulty = 8;
    console.table(lesson);

    //Translate the lesson to the target language
    googletrans(lesson, req.get.lang).then(translated => {
        const thingos = [];
        const prns = translated.pronunciation.split('\n'); //Get pronunciation array
        for(let i = 0; i < lesson.length; i++)
        {
            thingos.push({original: lesson[i], translated: translated.textArray[i], pronunciation: prns[i], type: choose(['t2s', 's2t', 'aud'])}); //aud
        }
        res.end(JSON.stringify(thingos));//res.render("./lesson.html", {questions: decodeURI(JSON.stringify(thingos)), lang: req.params.lang, language: langs[req.params.lang]})
        })
    .catch(err => {
        console.log("err");
        res.end("err");
    });
}

/**
 * 
 * @param {*} lid lesson id
 * @returns English phrases ready to be translated
 */
function generatePhrases(lid)
{
    //Get lesson questions
    const {basic, medium, complex} = lessons.Lessons[lid];
    //choose random
    let templates = shuffle(basic).slice(0, basic.length-2).concat(shuffle(medium).slice(0, medium.length-3), shuffle(complex).slice(0, 2));
    let results = [];
    for(let x of templates) //for each templated question do this
    {
        //Replace (..|..) with the randomly selected phrase
        x = x.replace(/\((.+?)\)/g, (a, m) => choose(m.split("|")));
        //Match templating thing: <thing>
        const matches = [...x.matchAll(/<(.+?)>/g)];
        if(matches.length == 0)
        {
            results.push(x);
            continue;
        }
        // console.log(matches);
        //iterate through each match twice for now?
        for(let d = 0; d < 2; d++)
        {
            let current = x;
            for(let i = 0; i < matches.length; i++)
            {
                //Check if there's a condition ie <person:gender=m>
                let [obj, cond] = matches[i][1].split(':');
                const [nobj, sub] = obj.split('.');
                // for(let  of arr)

                let selection = lessons[obj];
                if(sub)
                {
                    selection = lessons[nobj];
                }
                if(cond)
                {
                    const filters = cond.split('=');
                    selection = selection.filter(y => y[filters[0]].indexOf(filters[1]) > -1);
                }
                console.log("Selection", selection);
                current = current.replace(matches[i][0], choose(selection)[sub || "word"]);
            }
            results.push(current);
        }
    };
    // console.log(results);
   return results;
}


/**
 * Function to render dynamically all the lessons for a specific language
 * @param {http.incomingMessage} req 
 * @param {http.serverResponse} res 
 */
function getLessons(req, res)
{
    res.render("./lessons.html", {lessons: Object.keys(lessons.Lessons).map(
        (x)=> `<div onclick='document.location = "/learn/${req.params.lang}/lesson?lid=${x}"' class='lesson'>
            <h3>${x}</h3>
            <div class='slider'>
            </div>
        </div>`
    ).join(''), lang: req.params.lang, language: langs[req.params.lang]})
}

function login(req, res)
{
    const deets = require("./users.json");
    const {user, pass} = req.post;
    let cheese = {};
    if(deets[user]?.password === pass)
    {
        cheese.status = "Success";
        cheese.token  = user;
    } else{
        cheese.status = "Error";
        cheese.message= "Incorrect login details";
    }
    res.end(JSON.stringify(cheese));
}
//a aunt error
//Main route Tree creation
const mainRoute = turbo.route("/")
    .chain(parseCookie)
    .get((req, res) => res.render("./main.html", {languages: Object.values(langs).join(",")}))
    .branch(
        turbo.route("/learn")
            .get((req, res) => res.render("./learn.html", {langs: Object.keys(langs).join(","), languages: Object.values(langs).join(",")}))
            .branch(
                turbo.route("/<lang>").chain(req => console.log("Hello")).get(getLessons)
                .branch(turbo.route("/lesson").get((req, res) => res.render("lessontest.html", {lang: req.params.lang, language: langs[req.params.lang], lid: req.get.lid, preferred: "de"})))
            ),
        turbo.route("/generateLesson").get(generateLesson),
        turbo.route("/u")
        // .chain(parsePost)
        .get((req, res) => res.end("Your user profile"))
        .branch(
            turbo.route("/login").get((req, res) => res.render("./form.html", {action: "Login"}))
            .post(login),
            turbo.route("/register").get((req, res)=>res.render("./form.html", {action: "Register"}))
            .post((req, res) => res.end(req.post))
        ),
        turbo.route("/updateAudio").get((req, res) => {
            try{
                new gtts(decodeURIComponent(req.get.text), req.get.lang).save("./static/temp.mp3", ()=>res.end("hello"));
            }catch(e)
            {
                if(e.message != "Language not supported")
                    res.end("An Unknown error occureth");
                else
                    new gtts("Language not supported", 'en').save("./static/temp.mp3", () => res.end());
            }
        }
        )
    )
turbo.static("/static");
turbo.router(mainRoute).listen(5000);//, "192.168.0.8");

// const url = `https://translation.googleapis.com/language/translate/v2?key=${apikey}&source=${source}&target=${target}&q=${text}`;

// googletrans(["Hello", "Goodbye", "How are you?", "I am your father", "I am your brother", "I am your sister", "I am your mother", "I am your grandma", "I am your grandpa",
// "You are my father", "You are my mother", "You are my sister", "You are my brother","You are my grandma", "You are my grandpa",
// "I have a brother", "I have a sister", "I have a mother", "I have a father", "I have a grandma", "I have a grandpa"], "el").then(x => {
//     console.log(x);
// }).catch(console.log);
// let rat = ["I want lamb with alcohol please",
// "I want lamb with lemonade please",
// "A table for two, please",
// "I would like one plate of lamb and a plate of salad for my aunt",
// "I would like one plate of fish and a plate of fish for my uncle"];
// googletrans(rat[2], "ml").then(console.log).catch(console.log);
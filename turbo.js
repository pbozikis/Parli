//Turbo version 1.5 (forgot to keep track)
const http = require('http');
const fs   = require('fs');

function where(obj)
{
    for(let key in obj)
    {
        let rat = key.match(/<(.+?)>/);
        if(rat !== null)
        return rat[1]
    }   
    return undefined
}
//^\/(.+?[\/$]){2}

//Use this in v2 for better route checking
//^(\/.*?){3}(\/|$)
//\/[^/]+ better

/**
 * Turbo
 */
module.exports = (function(){
    let routeTree = {};
    let staticfolder = "";
    const listen = (port, hostname="127.0.0.1") => {http.createServer((req, res)=>{

        console.log(req.method+" "+req.url);

        if(/.+?\..+/.test(req.url)){
            const reginald = new RegExp(`${staticfolder}/.+`); //TODO: fix this, maybe can do a directory nav attack
            const match = req.url.match(reginald);
            try {res.end(fs.readFileSync("."+match[0])) }catch {console.log(req.url + " could not be opened."); res.end("No")}
            return;
        }
        let parts = (req.url == '/'? req.url : '/' +req.url).match(/\/\w*/g);

        res.render = (path, injects = {}) => {
            let html = fs.readFileSync(path).toString();
            //Needs to be able to get nested objects. lodash?
            html = html.replace(/<<(.+?)>>/g, (match, val) => injects[val] || "");
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }

        res.redirect = (location) => res.writeHead(302, {location: location});

        req.params = {};
        
        let rat = req.url.split('?');
        if(rat.length > 1)
        {
            req.url = rat[0];
            req.get = {};
            let vars = rat[1].split('&');

            for(let v of vars)
            {
                let t = v.split('=');
                req.get[t[0]] = t[1].replace('%20', ' ');
            }
        }


        let r = routeTree;
        let branch = undefined;
        for(p = 0; p < parts.length; p++)
        {
            branch = parts[p];
            let t = null;
            // console.log(r[branch]);
            if(r[branch])
            {
                for(let i = 0; i < r[branch].middleware.length; i++){
                    const rep = r[branch].middleware[i](req, res);
                    switch(rep)
                    {
                        case 404:
                            console.log("No routes for "+req.url+" found");
                            res.end("Error 404: Page not found");
                            break;
                    }
                }
                if(p < parts.length - 1)
                    r = r[branch].branches;
                else break;
            } else if(t = where(r)){
                req.params[t] = branch.replace('/', '');
                branch = `/<${t}>`;
                // p--;
                if(p < parts.length - 1)
                    r = r[branch].branches;
            }
        }
        if(req.method === "GET" && (r[branch]?.get))
            r[branch].get(req, res);
        else if(req.method === "POST" && r[branch]?.post)
            {
                let body = "";
                req.on("data", chunk => body += chunk);
                req.on("end", () => {
                    req.post = JSON.parse(body);
                    // req.post = body;
                    r[branch].post(req, res);
                });
            }
        else{
                console.log("No routes for "+req.url+" found");
                res.end("404: Page not found. This is a Turbo notification, you should probably fix your app");

        }

    }).listen(port, hostname, () =>
    {
        console.log(`Listening on http://${hostname}:${port}`);
    });
    }

    const router = (tree) =>  {routeTree = tree.route; return {listen}}

    const static = (path) => staticfolder = path;

    const route = (path) =>
    {
        let route = {};
        route[path] = {branches: {}, middleware: [], get: null, post: null};

        const get = (callback) =>{
            route[path].get = callback;
            return {branch, post, route};
        }

        const post = (callback) =>{
            route[path].post = callback;
            return {branch, get, route};
        }

        const branch = (...branches) =>{
            for(let x of branches)
                route[path].branches = Object.assign(route[path].branches, x.route);
            return {branch, route};
        }

        const chain = (callback) =>{
            route[path].middleware.push(callback);
            return {chain, get, post};
        }
        return {chain, get, post, branch};
    }
    return {route, router, static};
})();
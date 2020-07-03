// package request url returning html object
const promisse = require("request-promise");

//package to request url
const axios = require("axios");

//package to returns the formatted html
const cheerio = require("cheerio");

/* 
  Export node module for external access
  @param app - instance express app
  @return object functions
*/
module.exports = (app) => {
  /* 
    Set options from request url 
    @param url - String
    @return object
  */
  const options = (url) => ({
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    },
  });

  /* 
    Return lists of files in github directory
    @param req - http request
    @param res - http response
    @return void
  */
  const get = async (req, res) => {
    // get url request query params
    url = req.query.url;

    //call promisse request from url
    const opt = options(url);

    //delete latest records of same url
    await app.db("github").del({ address: url });

    /* 
      Save request data in database - Sqlite3
      @param data - json
      @return void
    */
    const save = (data) => {
      app
        .db("github")
        .insert(data)
        .then(() => {})
        .catch((err) => console.log("Erro: " + err));
    };

    /* 
      Arrange response database in groups
      @param items - Json
      @param key - String
      return array
    */
    const groupBy = (items, key) =>
      items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
      );

    /* 
      Get last saved url records
      @param url - String
      @return json
    */
    const getFilesDatabase = (url) => {
      app
        .db("github")
        .select("address", "file", "length", "lines", "ext")
        .where({ address: url })
        .orderBy("ext")
        .then((data) => {
          let array = groupBy(data, "ext");
          res.json(array);
        })
        .catch((err) => res.status(500).send("Erro: " + err));
    };

    // Request promisse with sethings and process certains parameters
    promisse(opt).then(($) => {
      $(".Details-content--hidden-not-important").each(() => {
        $(".js-navigation-item").each((i, item) => {
          const link = $(item).find(".js-navigation-open").attr("href").trim();
          if (link != "" && !link.includes("tree")) {
            const file = link.replace("/blob", "");
            axios
              .get("https://raw.githubusercontent.com" + file)
              .then((res) => {
                const html = res.data;
                const pagebytes = html.length;
                const kbytes = pagebytes / 1024;
                const lines = html.split("\n").length;
                const arrayFile = file.split(".");
                const ext =
                  arrayFile.length > 1 ? arrayFile[arrayFile.length - 1] : "";
                const data = {
                  address: url,
                  file: file,
                  length: kbytes,
                  lines: lines,
                  ext: ext,
                };
                save(data);
              })
              .catch((err) => {
                return err;
              });
          }
        });
      });
      // Request promisse with sethings and process certains parameters - End

      // Call getFilesDatabase returning list files
      setTimeout(() => {
        getFilesDatabase(url);
      }, 2000);
    });
  };

  /* 
    Test github connection
    @param url - String
    @param callback function
    @return boolean
  */
  const connectGithub = (url, callback) => {
    axios
      .get(url)
      .then((response) => {
        const result = response.status == 200 ? true : false;
        callback(result);
      })
      .catch((err) => {
        return err;
      });
  };

  return { get, connectGithub };
};

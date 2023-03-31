import * as dotenv from "dotenv";

import express from "express";
import { fetchJson, postJson } from "../helpers/fetchWrapper.js";

dotenv.config();

const formUpload = express.Router();

// Shows form to upload new plant
// OVERZICHTSPAGINA ROUTE
formUpload.get("/", (request, response) => {
  const baseUrl = `${process.env.API_URL}/stekjes`;

  fetchJson(baseUrl).then((data) => {
    response.render("index", data);
  });
});


// Takes care of sending the form
formUpload.post("/", (request, response) => {
  console.log(request.body);
  const baseUrl = `${process.env.API_URL}/stekjes`;
  postJson(baseUrl, request.body).then((data) => {
    if (data.success) {
      response.redirect("/"); // plant meegeven, message meegeven
      //  Toon opnieuw het formulier (met waarden) als het niet gelukt is
    } else {
      response.render("plantForm", error); // Fail, message meegeven
    }
    // })
    // De waarden uit het formulier (niet de API)
    console.log(JSON.stringify(data));
  });
});

export default formUpload
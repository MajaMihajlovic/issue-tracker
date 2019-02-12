import { Widget, startAppLoop, Url, History } from "cx/ui";
import { Timing, Debug } from "cx/util";
import "./CSS";
import Routes from "./routes";
import { store } from "./store";
import "whatwg-fetch";
import "./index.scss";
import "cx-theme-aquamarine";

var stop;

if (module.hot) {
  // accept itself
  module.hot.accept();

  // remember data on dispose
  module.hot.dispose(function (data) {
    data.state = store.getData();
    if (stop) stop();
  });

  //apply data on hot replace
  if (module.hot.data) store.load(module.hot.data);
}

Url.setBaseFromScript("app.js");
History.connect(
  store,
  "url"
);
Widget.resetCounter();
Timing.enable("app-loop");
Debug.enable("app-data");

let u = localStorage.getItem('user');
if (u) {
  let user = JSON.parse(u);
  store.set('user', {
    id: user.id,
    username: user.username,
    photo: user.photo,
    fullName: user.fullName,
    email: user.email
  });
}

stop = startAppLoop(document.getElementById("app"), store, Routes);

import { Url, History } from "cx/ui";



let restApiUrl = "http://localhost:8080/api/";

export async function checkOk(r, requestType = "normal") {
  if (r.status == 401) {
    switch (requestType) {
      case "auth":
        break;

      case "normal":
      default:
        refresh();
        break;
    }
  }

  if (r.status >= 400) {
    let data = null;
    try {
      data = await r.json();
    } catch (e) { }

    if (data) {
      //  throw getErrorWithDetails(data);
    }

    let errorMsg = r.headers.get("error");
    if (errorMsg) throw new Error(errorMsg);

    throw new Error("Error");
  }

  if (!r.ok) throw Error("Error");

  return r;
}
export function resolveAPIUrl(path, query) {
  let p = restApiUrl + path;
  let qs = "";
  if (typeof query == "object" && query) qs = "?" + urlEncode(query);
  return p + qs;
}

const defaultOptions = {};



export function GET(url, hints) {
  return doFetch(
    url,
    {
      ...defaultOptions,
      headers: {
        Accept: "application/json"
      }
    },
    hints
  ).then(x => x.json());
}
export async function doFetch(path, opt = {}, hints = {}) {
  let options = {
    method: 'GET',
    ...opt
  };

  try {
    let response = await fetch(resolveAPIUrl(path, opt && opt.query), options);

    return response;
  }
  catch (e) {
    if (!e.response) {
      e.message = "Unable to connect to the server. Please check your Internet connection and try again.";
    }
    throw e;
  }
}


export function POST(url, data, hints) {
  return doFetch(url, {
    ...defaultOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data, null, 2)
  }, hints)
    .then(x => x.json());
}

export async function login(data, store) {
  var user = await doFetch('user/login', {
    ...defaultOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data, null, 2)
  })
    .then(async x => {
      return await x.json();
    })
    .catch(err => {
      console.log("error")
      throw new Error('Failed to login. Please check if you entered valid username and password.');
    });
  console.log("user=" + user);
  if (user != null) {
    sessionStorage.setItem("user", user);
    user.displayName = user.username;
    store.set("user", user);
    var returnUrl = store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/"));
  }
}

export function PUT(url, data, hints) {
  return doFetch(
    url,
    {
      ...defaultOptions,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(data, null, 2)
    },
    hints
  ).then(x => x.json());
}

export function DELETE(url, hints) {
  return doFetch(
    url,
    {
      ...defaultOptions,
      method: "DELETE",
      headers: {}
    },
    hints
  );
}
export function urlEncode(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}
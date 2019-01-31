import { Controller, History, Url } from "cx/ui";
import { login, GET } from "../../api/methods";
import { showErrorToast } from "../../components/toasts"
import { enableMsgBoxAlerts } from "cx/widgets";
enableMsgBoxAlerts();
export default class extends Controller {

  async onInit() {
    super.init();
    var result = await GET('project');
    var projectNames = [];
    if (result != null) {
      result.forEach(element => {
        projectNames.push({
          id: element.id,
          text: element.name
        });
      })
    }
    this.store.set('$report.selectedProjectName', projectNames[0].text);
    this.store.set('$report.selectedProjectId', projectNames[0].id);
    this.store.set('$report.projects', projectNames);

    this.store.set("widgets", [
      {
        type: "issues-by-type-grid"
      },
      {
        type: "issues-by-type-chart"
      },
      {
        type: "burndown-chart"
      },
      {
        type: "throughtput-chart"
      }
    ]);
  }
  signIn() {
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/sign/in"));
  }

  async login(e) {
    e.preventDefault();
    var userInfo = {
      username: this.store.get("login.username"),
      password: this.store.get("login.password")
    };

    try {
      var user = await login(userInfo, this.store);
      console.log(user)
      this.store.set('user', user);
      sessionStorage.setItem('user', JSON.stringify(user));
      if (this.store.get('login.rememberMe'))
        localStorage.setItem('user', JSON.stringify(user));
      History.pushState({}, null, Url.resolve("~/"));
      this.store.delete('login');
    }
    catch (e) {
      showErrorToast(e);
      this.store.set("login.loading", false);
    }
  }
}

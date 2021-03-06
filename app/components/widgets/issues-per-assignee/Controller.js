import { Controller } from "cx/ui";
import { GET } from "../../../api/methods";
export default class extends Controller {

    onInit() {
        this.addTrigger("reportSelectedProjectId", ["selectedProjectId"], () => this.getChartData(), true);
    }

    async getChartData() {
        let id = this.store.get("selectedProjectId");
        var result = await GET("issue/issuePerAssignee/" + id);
        this.store.set('issuePerAssignee', result);
    }
}
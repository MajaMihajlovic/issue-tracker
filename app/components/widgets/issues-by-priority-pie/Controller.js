import { Controller } from "cx/ui";
import { GET } from "../../../api/methods";
export default class extends Controller {
    onInit() {

        this.addTrigger("reportSelectedProjectId", ["selectedProjectId"], () => this.getChartData());
    }

    async getChartData() {
        let id = this.store.get("selectedProjectId");
        var result = await GET("issue/byPriority/" + id);
        var formatResult = [];
        if (result != null) {
            result.forEach(element => {
                formatResult.push({
                    id: id,
                    name: element.type,
                    value: element.count
                });
            })
        }
        console.log(formatResult)
        this.store.set('points', formatResult);
    }
}
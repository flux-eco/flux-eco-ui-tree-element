import {FluxEcoUiTreeElement} from "../Domain/FluxEcoUiTreeElement.mjs";

export class TreeElementService {

    /**
     * @var {FluxUiTreeElementNodeElementCallbacks}
     */
    #nodeElementCallbacks;

    /**
     * @private
     */
    constructor(nodeElementCallbacks) {
        this.#nodeElementCallbacks = nodeElementCallbacks;
    }

    /**
     * @param {TreeNodeElementCallbacks} nodeElementCallbacks
     * @return {Promise<TreeElementService>}
     */
    static async new(nodeElementCallbacks) {
        return new TreeElementService(nodeElementCallbacks);
    }

    /**
     * @param {Object} parentElement
     * @param {TreeState} treeState
     * @return {Promise<void>}
     */
    async render(parentElement, treeState) {
        const element = await FluxEcoUiTreeElement.new(treeState.id.path, treeState.nodes, this.#nodeElementCallbacks);
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
        parentElement.appendChild(element);
    }
}
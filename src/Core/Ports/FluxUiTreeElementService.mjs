import {FluxUITreeElement} from "../Domain/FluxUiTreeElement.mjs";

export class FluxUiTreeElementService {

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
     * @param {FluxUiTreeElementNodeElementCallbacks} nodeElementCallbacks
     * @return {Promise<FluxUiTreeElementService>}
     */
    static async new(nodeElementCallbacks) {
        return new FluxUiTreeElementService(nodeElementCallbacks);
    }

    /**
     * @param {Object} parentElement
     * @param {TreeState} treeState
     * @return {Promise<void>}
     */
    async render(parentElement, treeState) {
        const element = await FluxUITreeElement.new(treeState.id.path, treeState.nodes, this.#nodeElementCallbacks);
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
        parentElement.appendChild(element);
    }
}
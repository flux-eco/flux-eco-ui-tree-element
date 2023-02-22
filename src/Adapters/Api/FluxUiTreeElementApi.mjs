/**
 * @typedef {Id}
 * @property {string} value
 * @property {string} path
 */

/**
 * @typedef TreeState
 * @property {Id} id - id of the tree
 * @property {object} nodeDataSchema
 * @property {NodeState} rootNode
 * @property {NodeState[]} nodes
 */

/**
 * @typedef NodeState
 * @property {Id} treeId - The tree ID object of the node
 * @property {null|Id} parentId - The parent ID object of the node - null in case of rootNodeEntity
 * @property {Id} id - The id as ID object of the node.
 * @property {NodeStateStatus} status - The status of the node, e.g. whether it is expanded or deleted.
 * @property {null|Object} data - The data of the node, conforming to the schema declared at tree level - null in case of rootNodeEntity
 * @property {NodeState[]} children - array of child nodes
 */


import {TreeElementService} from "../../Core/Ports/TreeElementService.mjs";
import {TreeNodeElementCallbacks} from "../../Core/Ports/TreeNodeElementCallbacks.mjs";

/**
 * Creates and manages states of tree data
 *
 * @type FluxUiTreeStateApi
 */
export class FluxUiTreeElementApi {
    name = "flux-eco-ui-tree-element";
    #service;

    constructor(service) {
        this.#service = service;
    }

    /**
     * @param {function|null} onClicked
     * @return {Promise<FluxUiTreeElementApi>}
     */
    static async new(onClicked) {
        return new FluxUiTreeElementApi(await TreeElementService.new(await TreeNodeElementCallbacks.new(onClicked)));
    }

    /**
     * @param {Object} parentElement
     * @param {TreeState} treeState
     */
    async render(parentElement, treeState) {
        this.#service.render(parentElement, treeState);
    }
}
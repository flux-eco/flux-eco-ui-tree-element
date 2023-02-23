import {FluxEcoUiTreeElementState} from "./ValueObjects/FluxEcoUiTreeElementState.mjs";
import {expandableNodeLineCss} from "../../../styles/expandableNodeLineCss.mjs";

/**
 * @typedef NodeState
 * @property {Id} treeId - The tree ID object of the node
 * @property {null|Id} parentId - The parent ID object of the node - null in case of rootNodeEntity
 * @property {Id} id - The id as ID object of the node.
 * @property {NodeStateStatus} status - The status of the node, e.g. whether it is expanded or deleted.
 * @property {null|Object} data - The data of the node, conforming to the schema declared at tree level - null in case of rootNodeEntity
 * @property {Object.<string, Object>} apiActionPayloads - The actions with payload that can be performed on the api.
 * @property {NodeState[]} children - array of child nodeEntityMap
 */
export class FluxEcoUiTreeElement extends HTMLElement {
    /**
     * @var {FluxEcoUiTreeElementState}
     */
    #fluxEcoUiTreeElementState;
    /**
     * @var {FluxUiTreeElementNodeElementCallbacks}
     */
    #nodeElementCallbacks;
    #shadow;

    /**
     * @private
     * @param {string} treeId
     * @param {NodeState[]} nodes
     * @param {TreeNodeElementCallbacks} nodeElementCallbacks
     */
    constructor(treeId, nodes, nodeElementCallbacks) {
        super();
        this.id = treeId;
        this.nodes = nodes;
        this.#nodeElementCallbacks = nodeElementCallbacks;
        this.#shadow = this.attachShadow({mode: 'open'});
        this.#fluxEcoUiTreeElementState = FluxEcoUiTreeElementState.new();

        const styleElement = document.createElement("style");
        styleElement.textContent = expandableNodeLineCss;
        document.head.appendChild(styleElement)
    }

    /**
     * @param {string} treeId
     * @param nodes
     * @param {{onClicked}} nodeElementCallbacks
     * @return {Promise<FluxEcoUiTreeElement>}
     */
    static async new(treeId, nodes, nodeElementCallbacks) {
        return new FluxEcoUiTreeElement(treeId, nodes, nodeElementCallbacks);
    }

    async connectedCallback() {
        const rootNode = document.createElement("ul");
        for (const node of this.nodes) {
            if (node.parentId === null) {
                const nodeElement = await this.renderNode(node);
                rootNode.appendChild(nodeElement)
            }
        }

        this.#shadow.appendChild(rootNode);

        const styleElement = document.createElement('style');
        styleElement.textContent = expandableNodeLineCss;
        this.#shadow.appendChild(styleElement);
    }


    /**
     * Renders a node and its children recursively.
     *
     * @param {NodeState} node - The node to render
     * @returns {HTMLElement} The rendered node element.
     */
    async renderNode(node) {
        // create a node element
        const nodeElement = document.createElement('li');
        const nodeLine = document.createElement('span');
        nodeLine.className = "nodeLine";

        const nodeLabel = document.createElement('span');

        nodeLabel.className = "nodeLabel";
        if (node.children.length) {
            if (node.status.expanded === false) {
                nodeLabel.classList.add("collapsed");
            }
            if (node.status.expanded === true) {
                nodeLabel.classList.add("expanded");
            }
        }

        nodeLabel.innerText = node.data.label;
        nodeLine.appendChild(nodeLabel);
        nodeElement.appendChild(nodeLine);

        // add a click event listener to expand/collapse the node
        nodeLine.addEventListener('click', async () => {
            this.#nodeElementCallbacks.onClicked(node);
        });

        // recursively render child nodes
        if (node.status.expanded) {
            const nodeChildren = document.createElement("ul");
            for (const child of node.children) {
                const childElement = await this.renderNode(child);
                nodeChildren.appendChild(childElement);
            }
            nodeElement.appendChild(nodeChildren);
        }


        return nodeElement;
    }
}

customElements.define('flux-eco-ui-tree', FluxEcoUiTreeElement);

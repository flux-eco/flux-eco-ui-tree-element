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
     * @var {FluxUiTreeElementNodeElementCallbacks}
     */
    #nodeElementCallbacks;
    #shadow;

    /**
     * @private
     * @param {NodeState[]} nodes
     * @param {TreeNodeElementCallbacks} nodeElementCallbacks
     */
    constructor(treeId, nodes, nodeElementCallbacks) {
        super();
        this.id = treeId;
        this.nodes = nodes;
        this.#nodeElementCallbacks = nodeElementCallbacks;
        this.#shadow = this.attachShadow({mode: 'closed'});
    }

    /**
     * @param {{onClicked}} nodeElementCallbacks
     * @param nodes
     * @return {Promise<FluxEcoUiTreeElement>}
     */
    static async new(treeId, nodes, nodeElementCallbacks) {
        return new FluxEcoUiTreeElement(treeId, nodes, nodeElementCallbacks);
    }

    async connectedCallback() {
        const rootNode = document.createElement("ul");
        for (const node of this.nodes) {
            if (node.parentId === null) {
                const nodeElement = this.renderNode(node);
                rootNode.appendChild(nodeElement)
            }
        }

        this.#shadow.appendChild(rootNode);
    }

    /**
     * Renders a node and its children recursively.
     *
     * @param {NodeState} node - The node to render.
     * @returns {HTMLElement} The rendered node element.
     */
    renderNode(node) {
        // create a node element
        const nodeElement = document.createElement('li');
        const nodeLine = document.createElement('span');

        const nodeLabel = document.createElement('span');
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
                const childElement = this.renderNode(child);
                nodeChildren.appendChild(childElement);
            }
            nodeElement.appendChild(nodeChildren);
        }


        return nodeElement;
    }
}

customElements.define('flux-eco-ui-tree', FluxEcoUiTreeElement);

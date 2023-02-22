import {FluxEcoUiTreeElementState} from "./ValueObjects/FluxEcoUiTreeElementState.mjs";

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
     * @param {FluxEcoUiNodeLineElement|null} fluxEcoUiNodeLineElement
     */
    constructor(treeId, nodes, nodeElementCallbacks, fluxEcoUiNodeLineElement) {
        super();
        this.id = treeId;
        this.nodes = nodes;
        this.#nodeElementCallbacks = nodeElementCallbacks;
        this.#shadow = this.attachShadow({mode: 'open'});
        this.#fluxEcoUiTreeElementState = FluxEcoUiTreeElementState.new(fluxEcoUiNodeLineElement);

        const link = document.createElement("link");
        link.id = "style";
        link.rel = "stylesheet";
        link.type="text/css"
        link.href = "/Customizing/flux-eco-ui/styles/style.css";
         document.head.appendChild(link)
    }

    /**
     * @param {string} treeId
     * @param nodes
     * @param {{onClicked}} nodeElementCallbacks
     * @param {FluxEcoUiTreeElement} fluxEcoUiNodeLineElement
     * @return {Promise<FluxEcoUiTreeElement>}
     */
    static async new(treeId, nodes, nodeElementCallbacks, fluxEcoUiNodeLineElement) {
        return new FluxEcoUiTreeElement(treeId, nodes, nodeElementCallbacks, fluxEcoUiNodeLineElement);
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

        // Get the link element that loads the font in the light DOM
        const fontLink = await document.getElementById('style');
console.log(fontLink);


        // Create a style element in the shadow root to load the font
        const fontStyles = document.createElement('style');
        fontStyles.textContent = `
                                  @font-face {
                                    font-family: 'il-icons';
                                    src: url(Customizing/global/skin/skin_medi_ilias_7/fonts/Iconfont/il-icons.woff) format('woff');
                                  }
                                  :host {
                                    font-family: 'il-icons';
                                  }
                                   .collapsed:before {
                                        font-family: 'il-icons';
                                        content: '\\e606';
                                    }
                                `;
        this.#shadow.appendChild(fontStyles);
    }


/**
 * Renders a node and its children recursively.
 *
 * @param {NodeState} node - The node to render.@font-face {
  font-family: 'il-icons';
  src: url('fonts/Iconfont/il-icons.woff') format('woff'), url('fonts/Iconfont/il-icons.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
 * @returns {HTMLElement} The rendered node element.
 */
renderNode(node)
{
    // create a node element
    const nodeElement = document.createElement('li');
    const nodeLine = document.createElement('span');


    const nodeLabel = document.createElement('span');
    nodeLabel.className = "collapsed"
    if (this.#fluxEcoUiTreeElementState.fluxEcoUiNodeLineElement !== null) {
        nodeLabel.innerText = this.#fluxEcoUiTreeElementState.fluxEcoUiNodeLineElement.render(node.data)
    } else {
        nodeLabel.innerText = node.data.label;
    }

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

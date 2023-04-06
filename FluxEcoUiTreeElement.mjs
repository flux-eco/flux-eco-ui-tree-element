/** @typedef {import("./types/FluxEcoUiTreeElementConfig.mjs")} FluxEcoUiTreeElementConfig */

export class FluxEcoUiTreeElement extends HTMLElement {
    /**
     * @type {string|null}
     */
    #id = null;
    /**
     * @type {FluxEcoUiTreeElementSettings}
     */
    #settings;
    /**
     * @type {FluxEcoUiTreeElementAttributes|null}
     */
    #attributes;
    /**
     * @type {HTMLElement}
     */
    #contentContainer;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @type {array}
     */
    #subscribers;

    /**
     * @param {FluxEcoUiTreeElementConfig} validatedConfig
     */
    constructor(validatedConfig) {
        super();
        this.#subscribers = [];
        if (validatedConfig.hasOwnProperty("id")) {
            this.#id = validatedConfig.id;
        }
        this.#settings = validatedConfig.settings;
        if (validatedConfig.hasOwnProperty("initialState")) {
            this.#attributes = validatedConfig.initialState;
        }

        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#shadow.appendChild(FluxEcoUiTreeElement.linkStyleSheet);
    }

    /**
     * @param validatedAttributes
     * @returns {string}
     */
    #createId(validatedAttributes) {
        if (validatedAttributes.hasOwnProperty("id")) {
            return validatedAttributes.id;
        }
        return FluxEcoUiTreeElement.tagName;
    }

    static get linkStyleSheet() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./${FluxEcoUiTreeElement.tagName}/assets/stylesheet.css`;
        return link;
    }

    static get tagName() {
        return 'flux-eco-ui-tree-element'
    }

    /**
     * @param {FluxEcoUiTreeElementConfig} validatedConfig
     * @returns {FluxEcoUiTreeElement}
     */
    static new(validatedConfig) {
        return new FluxEcoUiTreeElement(validatedConfig);
    }

    connectedCallback() {
        if (this.#id === null) {
            this.#id = [this.parentElement.id, FluxEcoUiTreeElement.tagName].join("/");
        }
        this.setAttribute("id", this.#id);
        this.#contentContainer = this.#createContentContainerElement(this.#id)
        this.#shadow.appendChild(this.#contentContainer);
        if (this.#attributes) {
            this.#applyAttributesChanged(this.#attributes)
        }
    }

    /**
     * @returns {HTMLElement}
     */
    #createContentContainerElement(id) {
        const contentContainerId = [id, 'content'].join("/");
        const contentContainer = document.createElement("div");
        contentContainer.id = contentContainerId;
        return contentContainer;
    }

    changeAttributes(newAttributes) {
        console.log(newAttributes);
        //todo validate
        this.#applyAttributesChanged(newAttributes);
    }

    /**
     * Subscribes to the event triggered when a node is clicked.
     *
     * @param {function} subscriber - A function to be called when the event is triggered.
     * The function should include an argument containing the data of the clicked node.
     * Example: function(nodeAttributes) { console.log('Node clicked:', nodeAttributes); }
     */
    subscribeToNodeClickedEvent(subscriber) {
        console.log(subscriber);
        this.#subscribers.push(subscriber);
    }

    #applyAttributesChanged(validatedAttributes) {
        const rootNode = validatedAttributes.rootNode;
        if (rootNode === undefined || rootNode === null) {
            return;
        }
        this.#contentContainer.innerHTML = "";
        const rootNodeElement = document.createElement("ul");
        const children = rootNode.children;
        Object.entries(children).forEach(([key, node]) => {
            const nodeElement = this.renderNode(node);
            rootNodeElement.appendChild(nodeElement)
        });
        this.#contentContainer.appendChild(rootNodeElement);
    }


    /**
     * Renders a node and its children recursively.
     *
     * @param {NodeState} node - The node to render
     * @returns {HTMLElement} The rendered node element.
     */
    renderNode(node) {
        // create a node element
        const nodeElement = document.createElement('li');
        const nodeLine = document.createElement('span');
        nodeLine.className = "nodeLine";
        const nodeLabel = document.createElement('span');
        nodeLabel.className = "nodeLabel";
        const children = node.children;
        Object.entries(children ?? {}).forEach(([key, childNode]) => {
            if (node.status.expanded === false) {
                nodeLabel.classList.add("collapsed");
            }
            if (node.status.expanded === true) {
                nodeLabel.classList.add("expanded");
            }
        });

        nodeLabel.innerText = node.data.label;
        nodeLine.appendChild(nodeLabel);
        nodeElement.appendChild(nodeLine);

        // add a click event listener to expand/collapse the node
        nodeLine.addEventListener('click', async () => {
            if (node.status.expanded === true) {
                node.status = {
                    expanded: false
                };
            } else {
                node.status = {
                    expanded: true
                };
            }

            const newNode = {
                treeId: node.treeId,
                id: node.id,
                parentId: node.parentId,
                status: node.status,
                data: node.data,
                children: node.children
            }
            const newAttributes = this.#attributes;
            newAttributes.nodes[node.id] = newNode;
            this.changeAttributes(newAttributes);

            if(this.#subscribers.length > 0) {
                // Notify all subscribers
                for (const subscriber of this.#subscribers) {
                    subscriber(newNode);
                }
            }

            return;
        });

        // recursively render child nodes
        if (children !== null && children !== undefined) {
            if (node.status.expanded) {
                const nodeChildrenElement = document.createElement("ul");
                Object.entries(children).forEach(([key, childNode]) => {
                    const childElement = this.renderNode(childNode);
                    nodeChildrenElement.appendChild(childElement);
                });
                nodeElement.appendChild(nodeChildrenElement);
            }
        }

        return nodeElement;
    }
}

customElements.define(FluxEcoUiTreeElement.tagName, FluxEcoUiTreeElement);

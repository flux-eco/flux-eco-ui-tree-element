import {FluxEcoUiTreeElement} from "../Domain/FluxEcoUiTreeElement.mjs";

export class TreeNodeElementCallbacks {

    /**
     * {function|null}
     */
    #onClicked;

    /**
     * @private
     */
    constructor(onClicked) {
        this.#onClicked = onClicked;
    }

    /**
     * @param {function|null} onClicked
     * @return {Promise<TreeNodeElementCallbacks>}
     */
    static async new(onClicked) {
        return new TreeNodeElementCallbacks(onClicked);
    }

    /**
     * @param {NodeState} nodeState
     */
    onClicked(nodeState) {
        if (this.#onClicked) {
            this.#onClicked(nodeState);
        }
    }
}
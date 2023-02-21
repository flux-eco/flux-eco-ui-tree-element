import {FluxUITreeElement} from "../Domain/FluxUiTreeElement.mjs";

export class FluxUiTreeElementNodeElementCallbacks {

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
     * @return {Promise<FluxUiTreeElementNodeElementCallbacks>}
     */
    static async new(onClicked) {
        return new FluxUiTreeElementNodeElementCallbacks(onClicked);
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
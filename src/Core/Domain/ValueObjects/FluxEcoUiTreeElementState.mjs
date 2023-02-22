/**
 * @typedef FluxEcoUiNodeLineElement
 * @property {function(data)} render
 */

/**
 * This object holds some configurations for rendering the tree element.
 * It is specific for tree id and may change each time a tree is rendered
 *
 * @type FluxEcoUiTreeElementState
 * @property {FluxEcoUiNodeLineElement} fluxEcoUiNodeLineElement
 */
export class FluxEcoUiTreeElementState {
    /**
     * Creates a new FluxEcoUiTreeElementState object.
     * @param {FluxEcoUiNodeLineElement} fluxEcoUiNodeLineElement
     */
    static new(fluxEcoUiNodeLineElement = null) {
        return {
            fluxEcoUiNodeLineElement
        };
    }
}
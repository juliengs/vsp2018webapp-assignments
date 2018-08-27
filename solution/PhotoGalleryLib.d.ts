declare const PhotoGalleryLib: {
    /**
     * Add a listener for size class changes.
     * The callback function is called once immediately and whenever the size class changes.
     * One of the strings "small", "medium", or "large" will be passed as an argument to the callback function when the
     * screen size is changed.
     * Note that the callback function will only be called when the screen size changes from one size class to another
     * (for example "small" to "medium"). It will not be called repeatedly while the screen size is being changed within
     * a particular size class like large.
     * @param callback Function that receives the size class as parameter
     */
    onSizeClassChange: (callback: (size: "small" | "medium" | "large") => void) => void;
    /**
     * Generate a grid of images with the urls as srcs.
     * A 1x8 grid is made for small screen sizes, a 2x4 grid is made for medium screen sizes, and a 4x2 grid is made for
     * large screen sizes.
     * @param imageUrls List of exactly 8 image src urls
     * @param size Size of the grid
     * @returns The generated grid table
     */
    generateGrid: (imageUrls: string[], size: "small" | "medium" | "large") => HTMLTableElement;
    /**
     * Creates the presentation modal, and adds it to the body.
     */
    createModal: () => void;
    /**
     * Register click handlers for the close, previous, and next buttons in the modal.
     * @param closeBtnCb Function to be called on button click
     * @param previousBtnCb Function to be called on button click
     * @param nextBtnCb Function to be called on button click
     */
    initModal: (closeBtnCb: (event: MouseEvent) => void, previousBtnCb: (event: MouseEvent) => void, nextBtnCb: (event: MouseEvent) => void) => void;
    /**
     * Closes the modal (hides it).
     */
    closePresentationModal: () => void;
    /**
     * Opens the modal (makes it visible).
     */
    openPresentationModal: () => void;
    /**
     * Sets the src attribute of the image in the presentation modal to the given image URL.
     * @param src Url for the image src
     */
    setModalImgSrc: (src: string) => void;
    /**
     * Register click handlers for close, previous, and next buttons in the modal.
     * @param callback Function that receives the image index as parameter
     */
    addImageClickHandlers: (callback: (index: number) => void) => void;
};

const PhotoGalleryLib = {
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
    onSizeClassChange: (callback: (size: "small" | "medium" | "large") => void): void => {
        if (typeof callback !== 'function') {
            throw new TypeError('Callback parameter has to be called and of type function.');
        }

        const getViewportSizeName = (width: number): "small" | "medium" | "large" => {
            if (width <= 600) {
                return 'small';
            } else if (width <= 800) {
                return 'medium';
            } else {
                return 'large';
            }
        }

        let currentViewportSize = getViewportSizeName(window.innerWidth);
        callback(currentViewportSize);

        window.onresize = () => {
            const newViewportSize = getViewportSizeName(window.innerWidth);
            if (newViewportSize != currentViewportSize) {
                currentViewportSize = newViewportSize;
                callback(currentViewportSize);
            }
        };
    },

    /**
     * Generate a grid of images with the urls as srcs.
     * A 1x8 grid is made for small screen sizes, a 2x4 grid is made for medium screen sizes, and a 4x2 grid is made for
     * large screen sizes.
     * @param imageUrls List of exactly 8 image src urls
     * @param size Size of the grid
     * @returns The generated grid table
     */
    generateGrid: (imageUrls: string[], size: "small" | "medium" | "large"): HTMLTableElement => {
        if (imageUrls.length !== 8) {
            throw new RangeError('The list of image urls has to contain exactly 8 elements.');
        }

        const VIEWPORT_LARGE_TABLE = `
            <tr>
                <td><img></td>
                <td><img></td>
                <td><img></td>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
                <td><img></td>
                <td><img></td>
                <td><img></td>
            </tr>
        `;

        const VIEWPORT_MEDIUM_TABLE = `
            <tr>
                <td><img></td>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
                <td><img></td>
            </tr>
        `;

        const VIEWPORT_SMALL_TABLE = `
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
            <tr>
                <td><img></td>
            </tr>
        `;

        const imagesGrid = document.createElement('table');
        imagesGrid.id = 'imagesGrid';
        if (size == 'large') {
            imagesGrid.innerHTML = VIEWPORT_LARGE_TABLE;
        } else if (size == 'medium') {
            imagesGrid.innerHTML = VIEWPORT_MEDIUM_TABLE;
        } else {
            imagesGrid.innerHTML = VIEWPORT_SMALL_TABLE;
        }
        imagesGrid.querySelectorAll('img').forEach((imageTag, i) => {
            imageTag.src = imageUrls[i];
        });
        return imagesGrid;
    },

    /**
     * Creates the presentation modal, and adds it to the body.
     */
    createModal: (): void => {
        const modal = document.createElement('div');
        modal.id = 'presentationModal';

        modal.innerHTML = `
            <img id="modalImage" />
            <button id="closeButton">X</button>
            <button id="previousButton">Previous</button>
            <button id="nextButton">Next</button>
        `;

        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'grey',
            display: 'none',
        });

        Object.assign((modal.querySelector('#modalImage') as HTMLDivElement).style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            maxHeight: '100%',
            maxWidth: '100%',
        });

        Object.assign((modal.querySelector('#closeButton') as HTMLButtonElement).style, {
            position: 'fixed',
            top: '0',
            right: '0',
            fontFamily: 'sans serif',
            height: '40',
            width: '40',
            backgroundColor: 'white',
        });

        Object.assign((modal.querySelector('#previousButton') as HTMLButtonElement).style, {
            position: 'fixed',
            left: '0',
            bottom: '0',
            height: '40',
        });

        Object.assign((modal.querySelector('#nextButton') as HTMLButtonElement).style, {
            position: 'fixed',
            right: '0',
            bottom: '0',
            height: '40',
        });

        (document.querySelector('body') as HTMLBodyElement).appendChild(modal);
    },

    /**
     * Register click handlers for the close, previous, and next buttons in the modal.
     * @param closeBtnCb Function to be called on button click
     * @param previousBtnCb Function to be called on button click
     * @param nextBtnCb Function to be called on button click
     */
    initModal: (closeBtnCb: (event: MouseEvent) => void, previousBtnCb: (event: MouseEvent) => void, nextBtnCb: (event: MouseEvent) => void): void => {
        (document.querySelector('#closeButton') as HTMLButtonElement).addEventListener('click', closeBtnCb);
        (document.querySelector('#previousButton') as HTMLButtonElement).addEventListener('click', previousBtnCb);
        (document.querySelector('#nextButton') as HTMLButtonElement).addEventListener('click', nextBtnCb);
    },

    /**
     * Closes the modal (hides it).
     */
    closePresentationModal: (): void => {
        (document.querySelector('#presentationModal') as HTMLDivElement).style.display = 'none';
    },

    /**
     * Opens the modal (makes it visible).
     */
    openPresentationModal: (): void => {
        (document.querySelector('#presentationModal') as HTMLDivElement).style.display = 'block';
    },

    /**
     * Sets the src attribute of the image in the presentation modal to the given image URL.
     * @param src Url for the image src
     */
    setModalImgSrc: (src: string): void => {
        (document.querySelector('#modalImage') as HTMLImageElement).src = src;
    },

    /**
     * Register click handlers for close, previous, and next buttons in the modal.
     * @param callback Function that receives the image index as parameter
     */
    addImageClickHandlers: (callback: (index: number) => void): void => {
        document.querySelectorAll('#imagesGrid img').forEach((image, i) => {
            const index = i;
            image.addEventListener('click', () => {
                callback(index);
            });
        });
    },
};

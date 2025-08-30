// class DragAndDrop {
//     constructor() {

//         this.currentElement = null;
//         this.offset = { x: 0, y: 0 };
        
//         document.addEventListener('pointerdown', this.onPointerDown.bind(this));
//         document.addEventListener('pointermove', this.onPointerMove.bind(this));
//         document.addEventListener('pointerup', this.onPointerUp.bind(this));
//     }

//     onPointerDown(e) {
//         const element = e.target.closest('[data-js-dnd]');
//         if (!element) return;

//         this.currentElement = element;
//         const rect = element.getBoundingClientRect();
        
//         this.offset.x = e.clientX - rect.left;
//         this.offset.y = e.clientY - rect.top;
        
//         element.style.position = 'absolute';
//         element.style.zIndex = '1000';
//         element.style.cursor = 'grabbing';
        
//         e.preventDefault();
//     }

//     onPointerMove(e) {
//         if (!this.currentElement) return;
        
//         this.currentElement.style.left = (e.clientX - this.offset.x) + 'px';
//         this.currentElement.style.top = (e.clientY - this.offset.y) + 'px';
//     }

//     onPointerUp() {
//         if (!this.currentElement) return;
        
//         this.currentElement.style.cursor = 'grab';
//         this.currentElement.style.zIndex = '';
//         this.currentElement = null;

//     }

    

// }

// new DragAndDrop();

const elementsToRemove = document.querySelectorAll('.dog', '.food-list')

class DragAndDrop {
    constructor() {
        this.currentElement = null;
        this.offset = { x: 0, y: 0 };
        this.currentDomElement = null
        this.currentElementText = null
        
        document.addEventListener('pointerdown', this.onPointerDown.bind(this));
        document.addEventListener('pointermove', this.onPointerMove.bind(this));
        document.addEventListener('pointerup', this.onPointerUp.bind(this));
    }

    onPointerDown(e) {
        const element = e.target.closest('[data-js-dnd]');

        this.currentDomElement = element;
        this.currentElementText = element.querySelector('.food-list__name')

        if (!element) return;

        this.currentElement = element;
        const rect = element.getBoundingClientRect();
        
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        
        element.style.position = 'absolute';
        element.style.zIndex = '1000';
        element.style.cursor = 'grabbing';
        
        e.preventDefault();
    }

    onPointerMove(e) {
        if (!this.currentElement) return;
        
        this.currentElement.style.left = (e.clientX - this.offset.x) + 'px';
        this.currentElement.style.top = (e.clientY - this.offset.y) + 'px';
    }

    onPointerUp() {
        if (!this.currentElement) return;
        
        this.currentElement.style.cursor = 'grab';
        this.currentElement.style.zIndex = '';
        this.currentElement = null;

        console.log(this.currentDomElement)

        // Проверяем, находится ли элемент над собакой
        this.checkIfOverDog(this.currentDomElement);
        
        // Проверяем все элементы после перетаскивания
        this.checkAllItemsInDog();

    }

    checkIfOverDog(element) {
        const dogElement = document.querySelector('.dog');

        if (!dogElement) return false;

        const dogRect = dogElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        // Проверяем, находится ли элемент на собаке (по кордам)
        const isOverDog = (
            elementRect.left >= dogRect.left &&
            elementRect.right <= dogRect.right &&
            elementRect.top >= dogRect.top &&
            elementRect.bottom <= dogRect.bottom
        );

        if (isOverDog) this.currentDomElement.remove()
        
        return isOverDog;
    }

    checkAllItemsInDog() {
        const foodItems = document.querySelectorAll('.food-list__item');
        const dogElement = document.querySelector('.dog');
        
        if (!dogElement) return false;

        const dogRect = dogElement.getBoundingClientRect();
        let allInDog = true;

        foodItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            
            const isInDog = (
                itemRect.left >= dogRect.left &&
                itemRect.right <= dogRect.right &&
                itemRect.top >= dogRect.top &&
                itemRect.bottom <= dogRect.bottom
            );

            if (!isInDog) allInDog = false;
        });

        // Если все элементы в зоне собаки
        if (allInDog) {
            this.onAllItemsInDog();
        }

        return allInDog;
    }

    onAllItemsInDog() {
        console.log('Все три элемента в зоне собаки! 🎉🐕');
        
                // elementsToRemove.forEach(element => {
                //     element.remove()
                // })
        
        const outroElement = document.querySelector(".outro")
        const songSource = document.querySelector("audio")
        const videoElement = document.querySelector(".video")

        outroElement.classList.add('outro-ready')

        songSource.src = "./assets/song.mp3"
        songSource.volume = 0.2

        setTimeout(() => {
            videoElement.innerHTML = `<source class="video__source" src="./assets/dancing_dogLoop.mp4" type="video/mp4">`
        }, 7300)
        

        


    }
}

new DragAndDrop();







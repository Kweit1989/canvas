document.addEventListener('DOMContentLoaded', function () {
    function updateCanvasMask() {
        const container = document.querySelector('.container');
        const windows = document.querySelectorAll('.windows-block');

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Заливка фона — чёрная (непрозрачная область)
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        // Вырезаем дырки под окна
        ctx.globalCompositeOperation = 'destination-out';
        windows.forEach(win => {
            const winRect = win.getBoundingClientRect();
            const x = winRect.left - rect.left;
            const y = winRect.top - rect.top;
            const w = winRect.width;
            const h = winRect.height;

            ctx.clearRect(x, y, w, h); // делаем прозрачную дыру
        });

        // Преобразуем в dataURL и применяем как маску
        const dataURL = canvas.toDataURL();
        container.style.webkitMaskImage = `url(${dataURL})`;
        container.style.maskImage = `url(${dataURL})`;
        container.style.webkitMaskRepeat = 'no-repeat';
        container.style.maskRepeat = 'no-repeat';
    }

    window.addEventListener('load', updateCanvasMask);
    window.addEventListener('resize', updateCanvasMask);
});

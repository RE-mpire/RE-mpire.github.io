function splitTextToSpans(element) {
    const text = element.textContent;
    element.textContent = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        span.dataset.content = char;
        element.appendChild(span);
    });
}

function randomChar(chars = '.:') {
    return chars[Math.floor(Math.random() * chars.length)];
}

const textBlock = document.querySelector('.text-block');
const p = textBlock.querySelector('.scramble');
splitTextToSpans(p);

const chars = Array.from(p.querySelectorAll('.char'));
const scrambleTimeouts = new WeakMap();

textBlock.onpointermove = (e) => {
    chars.forEach((char) => {
        if (!char.dataset.content.trim()) return;

        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && char.textContent === char.dataset.content) {
            char.textContent = randomChar();
            char.classList.add('scrambled');

            clearTimeout(scrambleTimeouts.get(char));
            const timeout = setTimeout(() => {
                char.textContent = char.dataset.content;
                char.classList.remove('scrambled');
            }, Math.max(120, 120 -dist / 10 + Math.random() * 120));
            scrambleTimeouts.set(char, timeout);
        }
    });
};

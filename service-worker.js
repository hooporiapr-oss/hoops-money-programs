<script>
if ('serviceWorker' in navigator) {
window.addEventListener('load', function () {
navigator.serviceWorker.register('/service-worker.js')
.catch(function (err) {
console.log('SW registration failed', err);
});
});
}
</script>

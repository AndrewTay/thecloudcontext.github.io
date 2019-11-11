<!-- register service worker -->
        <script>
          if ('serviceWorker' in navigator)
          {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
            .then(function() { console.log("Service Worker Registered, Cheers to PWA Fire!"); });
          }
          );
          }
        </script>
 <!-- end of service worker -->
